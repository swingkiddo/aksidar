#!/usr/bin/env python3
"""
Универсальная сегментация бутылок (OpenCV)
V5: Авто-детект типа бутылки + Улучшенная фильтрация "кармана" под ручкой
"""

import cv2
import numpy as np
from pathlib import Path

def auto_calibrate_hsv(img: np.ndarray) -> tuple:
    h, w = img.shape[:2]
    # Берем верхнюю часть для калибровки по крышке
    top_region = img[: int(h * 0.25), :]
    hsv = cv2.cvtColor(top_region, cv2.COLOR_BGR2HSV)

    # Ищем насыщенные цвета (крышка)
    sat_mask = (hsv[:, :, 1] > 100) & (hsv[:, :, 2] > 50)
    candidate_pixels = hsv[sat_mask]

    if len(candidate_pixels) > 50:
        median_hue = int(np.median(candidate_pixels[:, 0]))
        lower = max(0, median_hue - 15)
        upper = min(180, median_hue + 15)
    else:
        # Дефолтный синий
        lower, upper = 90, 130

    return (
        np.array([lower, 80, 40], dtype=np.uint8),
        np.array([upper, 255, 255], dtype=np.uint8),
    )

def get_bottle_mask(img: np.ndarray) -> tuple:
    """Улучшенная общая маска. Порог 245 для сохранения прозрачных носиков."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Используем чуть более агрессивный порог и морфологию для тонких деталей
    _, thresh = cv2.threshold(gray, 245, 255, cv2.THRESH_BINARY_INV)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(gray)

    if contours:
        main_cnt = max(contours, key=cv2.contourArea)
        cv2.drawContours(mask, [main_cnt], -1, 255, -1)
        return mask, main_cnt
    return mask, None

def process_image(img_path: Path, output_dir: Path) -> bool:
    try:
        img = cv2.imread(str(img_path))
        if img is None: return False
        h, w = img.shape[:2]

        # 1. Общий силуэт бутылки
        full_mask, main_cnt = get_bottle_mask(img)
        if main_cnt is None: return False
        bx, by, bw, bh = cv2.boundingRect(main_cnt)

        # 2. Локальный анализ верхней зоны (ROI)
        # Ограничиваем зону поиска ручки (30% от высоты бутылки)
        roi_y2 = by + int(bh * 0.30)
        roi_img = img[by:roi_y2, bx:bx+bw]

        # Калибруем HSV именно по этой зоне
        hsv_range = auto_calibrate_hsv(roi_img)
        hsv_roi = cv2.cvtColor(roi_img, cv2.COLOR_BGR2HSV)
        blue_mask_roi = cv2.inRange(hsv_roi, hsv_range[0], hsv_range[1])

        # Морфология для маски ручки (закрываем мелкие дырочки в пластике)
        blue_mask_roi = cv2.morphologyEx(blue_mask_roi, cv2.MORPH_CLOSE, np.ones((3,3)))

        # Проверяем, есть ли синяя ручка в этой зоне
        # (Игнорируем синюю жидкость внизу, так как мы смотрим только в ROI)
        is_handle_present = np.sum(blue_mask_roi > 0) > 400

        hole_mask_roi = np.zeros(roi_img.shape[:2], dtype=np.uint8)

        if is_handle_present:
            # 3. Поиск белого фона "внутри" или "около" синих элементов
            gray_roi = cv2.cvtColor(roi_img, cv2.COLOR_BGR2GRAY)

            # Понижаем порог до 230, чтобы поймать белый фон в голубоватых тенях
            _, white_mask = cv2.threshold(gray_roi, 230, 255, cv2.THRESH_BINARY)

            # Убираем синие части ручки из маски белого
            # Используем минимальную дилатацию, чтобы не "съесть" края фона
            pure_white = cv2.subtract(white_mask, cv2.dilate(blue_mask_roi, np.ones((2,2))))

            h_cnts, _ = cv2.findContours(pure_white, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            for hc in h_cnts:
                # ПРОВЕРКА: Дырка должна быть рядом с синим (ручкой/крышкой)
                temp_m = np.zeros_like(pure_white)
                cv2.drawContours(temp_m, [hc], -1, 255, -1)

                # Если расширенное белое пятно касается синей ручки
                contact_zone = cv2.dilate(temp_m, np.ones((5,5)))
                if np.any(cv2.bitwise_and(contact_zone, blue_mask_roi)):
                    hx, hy, hw_cnt, hh_cnt = cv2.boundingRect(hc)
                    area = cv2.contourArea(hc)

                    # Условия: не касается краев кадра и не слишком низко (не лезет в плечи)
                    if hx > 2 and (hx + hw_cnt) < (bw - 2):
                        if (hy + hh_cnt) < (roi_y2 - by - 5):
                            if area > 120:
                                cv2.drawContours(hole_mask_roi, [hc], -1, 255, -1)

        # 4. Финальная сборка и сохранение
        full_hole_mask = np.zeros((h, w), dtype=np.uint8)
        full_hole_mask[by:roi_y2, bx:bx+bw] = hole_mask_roi

        final_alpha = cv2.subtract(full_mask, full_hole_mask)
        # Сглаживаем края для естественности
        final_alpha = cv2.GaussianBlur(final_alpha, (3, 3), 0)

        b, g, r = cv2.split(img)
        result = cv2.merge([b, g, r, final_alpha])

        output_path = output_dir / f"{img_path.stem}.png"
        cv2.imwrite(str(output_path), result)

        # Дебаг-маска для контроля
        # cv2.imwrite(str(output_dir / f"debug_{img_path.stem}.png"), full_hole_mask)

        return True

    except Exception as e:
        print(f"Error {img_path.name}: {e}")
        return False

def main():
    # Пути под ваш проект
    base = Path("/home/pdpvs/projects/side/aksidar_3/public/images")
    output = base / "processed_v5"
    output.mkdir(exist_ok=True)

    # Собираем все файлы (и маленькие, и с ручками)
    extensions = ['*.jpg', '*.jpeg', '*.png']
    files = []
    for ext in extensions:
        files.extend(base.glob(ext))

    for p in files:
        if "masked" not in p.name: # Чтобы не обрабатывать уже готовые
            if process_image(p, output):
                print(f"Processed: {p.name}")

if __name__ == "__main__":
    main()
