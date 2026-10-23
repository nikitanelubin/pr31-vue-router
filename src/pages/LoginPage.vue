<template>
  <div class="page center">
    <h2>Вход</h2>
    <!-- .prevent отменяет перезагрузку страницы при отправке формы -->
    <form @submit.prevent="login">
      <input v-model="password" type="password" placeholder="Пароль (введите 'demo')" />
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" style="color: red; margin-top: 0.5rem;">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const error = ref(null)
const router = useRouter()

const login = () => {
  error.value = null
  if (password.value === 'demo') {
    // запоминаем "токен" в браузере, его потом проверяет guard в router/index.js
    localStorage.setItem('token', 'demo')
    router.push({ name: 'Dashboard' })
  } else {
    error.value = 'Неверный пароль. Попробуйте "demo"'
  }
}
</script>

<style scoped>
.center { text-align: center; }
input { padding: 0.5rem; margin-right: 0.5rem; }
button { padding: 0.5rem 1rem; }
</style>
