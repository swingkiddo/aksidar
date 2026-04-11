import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="inline-flex items-center text-sm text-green-mid hover:text-green-deep transition-colors mb-8">
          ← На главную
        </Link>

        <h1 className="font-display text-4xl font-bold text-green-deep mb-4">
          Условия использования
        </h1>
        <p className="text-ink/50 mb-12">Последнее обновление: Январь 2026</p>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">1. Общие условия</h2>
            <p className="mb-4">
              Настоящие Условия использования регулируют порядок использования сайта darkosmetik.ru (далее — «Сайт») и определяют права и обязанности пользователей и ООО «Дар Косметик» (далее — «Компания»).
            </p>
            <p>
              Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с каким-либо положением, пожалуйста, прекратите использование Сайта.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">2. Информация на Сайте</h2>
            <p className="mb-4">
              Вся информация на Сайте носит ознакомительный характер и не является публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации.
            </p>
            <p>
              Компания вправе в любое время изменять информацию на Сайте без предварительного уведомления.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">3. Интеллектуальная собственность</h2>
            <p>
              Все материалы, размещённые на Сайте, включая тексты, изображения, логотипы, дизайн и программный код, являются объектами исключительных прав Компании и защищены законодательством об интеллектуальной собственности.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">4. Оформление заказов</h2>
            <p className="mb-4">
              Отправка запроса через формы на Сайте не является заключением договора купли-продажи. Компания рассматривает запрос и направляет коммерческое предложение.
            </p>
            <p>
              Минимальные объёмы заказа, цены и условия поставки определяются индивидуально для каждого клиента и фиксируются в договоре поставки.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">5. Ответственность</h2>
            <p>
              Компания не несёт ответственности за любые убытки, возникшие в результате использования или невозможности использования Сайта, а также за достоверность информации, предоставленной пользователями через формы обратной связи.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-green-deep mb-4">6. Контактная информация</h2>
            <p>
              По вопросам, связанным с использованием Сайта:<br />
              Email: <a href="mailto:info@darkosmetik.ru" className="text-green-mid hover:underline">info@darkosmetik.ru</a><br />
              Телефон: <a href="tel:+78001234567" className="text-green-mid hover:underline">8 (800) 123-45-67</a><br />
              Адрес: г. Москва, ул. Производственная, 15
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
