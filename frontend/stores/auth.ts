import { defineStore } from "#imports";

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null as any, loggedIn: false }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      const { public: { apiBase } } = useRuntimeConfig()

      // 1) CSRF cookie
      await $fetch('/sanctum/csrf-cookie', {
        baseURL: apiBase,
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })

      // 2) Leer cookie y enviar X-XSRF-TOKEN
      const raw = useCookie('XSRF-TOKEN').value
      const xsrf = raw ? decodeURIComponent(raw) : ''

      // 3) Login
      const resp = await $fetch('/login', {
        method: 'POST',
        baseURL: apiBase,
        credentials: 'include',
        body: credentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': xsrf,
        },
      })

      this.user = (resp as any).user
      this.loggedIn = true
    },

   async me() {
      const { public: { apiBase } } = useRuntimeConfig()
      const me = await $fetch('/api/user', {
        baseURL: apiBase,
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      this.user = me
      this.loggedIn = true
      return me
    },

    async logout() {
      const { public: { apiBase } } = useRuntimeConfig()
      await $fetch('/logout', {
        method: 'POST',
        baseURL: apiBase,
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      this.user = null
      this.loggedIn = false
    },
  },
})
