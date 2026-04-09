import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="inline-flex items-center text-sm text-green-mid hover:text-green-deep transition-colors mb-8">
          ← На главную
        </Link>

        <h1 className="font-display text-4xl font-bold text-green-deep mb-4">
          Политика конфиденциальности
        </h1>
        <p className="text-ink/50 mb-12">Последнее обновление: Январь 2026</p>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">1. Общие положения</h2>
            <p className="mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта darkosmetik.ru (далее — «Сайт»), принадлежащего ООО «Дар Косметик» (далее — «Компания»).
            </p>
            <p>
              Компания обеспечивает защиту обрабатываемых персональных данных от несанкционированного доступа и разглашения в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">2. Сбор и использование данных</h2>
            <p className="mb-4">Мы собираем следующие персональные данные:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Имя и фамилия</li>
              <li>Название компании</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Сообщения и запросы, отправленные через формы на Сайте</li>
            </ul>
            <p>
              Данные используются исключительно для обработки запросов, отправки коммерческих предложений и улучшения качества обслуживания.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">3. Защита данных</h2>
            <p>
              Компания принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования и распространения.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">4. Передача данных третьим лицам</h2>
            <p>
              Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">5. Права пользователей</h2>
            <p className="mb-4">Пользователь имеет право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получить информацию о хранящихся персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">6. Контактная информация</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:<br />
              Email: <a href="mailto:info@darkosmetik.ru" className="text-green-mid hover:underline">info@darkosmetik.ru</a><br />
              Телефон: <a href="tel:+78001234567" className="text-green-mid hover:underline">8 (800) 123-45-67</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
