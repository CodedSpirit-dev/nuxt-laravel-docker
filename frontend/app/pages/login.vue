<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref<string | null>(null)
const auth = useAuthStore()

async function submit () {
  if (loading.value) return
  errorMsg.value = null
  loading.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    await auth.me()
    await navigateTo('/')
  } catch (err: any) {
    // nunca re-lances desde un handler
    errorMsg.value = err?.data?.message || err?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>You are on the login page</h1>

    <ULink to="/">
      <UIcon name="i-lucide-arrow-big-left" />
      Go to the index
    </ULink>
  </div>

  <form @submit.prevent="submit">
    <input v-model="email" type="email" placeholder="email" required />
    <input v-model="password" type="password" placeholder="password" required />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Signing in…' : 'Login' }}
    </button>

    <p v-if="errorMsg" role="alert">{{ errorMsg }}</p>
  </form>
</template>
