import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductListPage from '../pages/ProductListPage.vue'
import ProductDetailPage from '../pages/ProductDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ProtectedPage from '../pages/ProtectedPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  {
    path: '/products',
    name: 'Products',
    component: ProductListPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    // передаём params как props
    // из адреса id приходит строкой ("1"), а в компоненте он Number,
    // поэтому сразу переводим его в число через Number()
    props: (route) => ({ id: Number(route.params.id) }),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ProtectedPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Простой глобальный guard (защита маршрутов)
// срабатывает перед каждым переходом: to - куда идём, from - откуда
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token') === 'demo'

  // страница только для авторизованных, а пользователь не вошёл - отправляем на вход
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
    return
  }

  // страница входа только для гостей - если уже вошёл, отправляем в панель
  if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  // во всех остальных случаях пропускаем
  next()
})

export default router
