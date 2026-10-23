# Практическая работа №31. Vue Router: навигация, параметры, query

## Структура

```
src/
  components/
  pages/
    HomePage.vue          - главная с навигацией
    ProductListPage.vue   - список товаров, фильтр через query (?filter=electronics)
    ProductDetailPage.vue - страница товара, параметр пути :id передаётся через props
    LoginPage.vue         - вход (пароль demo)
    ProtectedPage.vue     - защищённая страница /dashboard
  router/
    index.js              - маршруты и глобальный guard beforeEach
  App.vue                 - <RouterView />
  main.js                 - подключение роутера
```

## Что проверить

1. `/products` - кнопки фильтра меняют адрес на `/products?filter=...`
2. Клик по товару - переход на `/products/1`, `/products/2` ...
3. `/dashboard` без входа - перекидывает на `/login`
4. Вход с паролем `demo` - открывается панель управления
5. После входа `/login` - перекидывает на `/dashboard`
6. «Выйти» - токен удаляется, снова страница входа

## Запуск

```
npm install
npm run dev
```
