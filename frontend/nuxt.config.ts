// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    experimental: {
      nativeSqlite: true
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  alias: {
    '@': '<rootDir>/src',
    '@pages': '<rootDir>/src/pages',
    '@features': '<rootDir>/src/features',
    '@widgets': '<rootDir>/src/widgets',
    '@entities': '<rootDir>/src/entities',
    '@shared': '<rootDir>/src/shared',
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
})