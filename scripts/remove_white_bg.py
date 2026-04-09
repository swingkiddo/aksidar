#!/usr/bin/env python3
"""Fast white background removal using numpy."""

from pathlib import Path
from PIL import Image
import numpy as np


def process_image(img_path: Path, output_dir: Path, threshold: int = 245):
    try:
        # Load image
        img = Image.open(img_path)
        if img.mode != "RGBA":
            img = img.convert("RGBA")

        # Convert to numpy for fast processing
        arr = np.array(img)

        # Create mask for white pixels (all RGB > threshold)
        white_mask = (
            (arr[:, :, 0] > threshold)
            & (arr[:, :, 1] > threshold)
            & (arr[:, :, 2] > threshold)
        )

        # Set alpha to 0 for white pixels
        arr[white_mask, 3] = 0

        # Convert back to PIL and save
        new_img = Image.fromarray(arr, "RGBA")
        output_path = output_dir / f"{img_path.stem}_transparent.png"
        new_img.save(output_path, "PNG", optimize=True)

        print(f"✓ {img_path.name}")
        return True

    except Exception as e:
        print(f"✗ {img_path.name}: {e}")
        return False


def main():
    base = Path("/home/pdpvs/projects/side/aksidar_3/public/images")
    output = base / "processed"
    output.mkdir(exist_ok=True)

    # All jpg files
    files = sorted(base.glob("*.jpg"))

    print(f"Processing {len(files)} images...\n")

    for i, f in enumerate(files, 1):
        process_image(f, output)
        if i % 10 == 0:
            print(f"--- {i}/{len(files)} ---")

    print(f"\nDone! {len(files)} images processed.")
    print(f"Output: {output}/")


if __name__ == "__main__":
    main()
