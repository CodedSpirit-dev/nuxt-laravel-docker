<!-- components/Navbar.vue -->
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        to: '/',
        label: 'Dashboard',
        icon: 'i-lucide-layout-dashboard',
        disabled: route.path === '/',
        active: route.path === '/'
    },
  {
    to: '/home',
    label: 'Home',
    icon: 'i-lucide-home',
    disabled: route.path === '/home',
    active: route.path === '/home'
  },
  {
    to: '/blog',
    label: 'Blog',
    icon: 'i-lucide-notebook-tabs',
    disabled: route.path === '/blog',
    active: route.path === '/blog'
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: 'i-lucide-message-square-more',
    disabled: route.path === '/contact',
    active: route.path === '/contact'
  },
  {
    to: '/about',
    label: 'About',
    icon: 'i-lucide-info',
    disabled: route.path === '/about',
    active: route.path === '/about'
  }
])
</script>

<template>
  <UNavigationMenu 
    color="neutral" 
    :items="items" 
    class="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50"
  />
</template>