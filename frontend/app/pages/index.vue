<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import HomePage from '~/features/home/ui/HomePage.vue';
import { UTable } from '#components';

const items = ref<NavigationMenuItem[]>([
  {
    to: '/home',
    label: 'Home',
    icon: 'i-lucide-home',
  },
  {
    to: '/blog',
    label: 'Blog',
    icon: 'i-lucide-notebook-tabs',
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: 'i-lucide-message-square-more',
  },
  {
    to: '/about',
    label: 'About',
    icon: 'i-lucide-info',
  },
]);


const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])
</script>

<template>
  <h1>You are on the index page</h1>
  <UNavigationMenu color="neutral" :items="items" class="w-full" />
<UTable :data="data" class="flex-1 m-10"  />

</template>
