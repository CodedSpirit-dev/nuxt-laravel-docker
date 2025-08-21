<template>
  <div>
    <h1>You are on the home page</h1>
  </div>

  <div>
    <ULink to="/">
      <UIcon name = 'i-lucide-arrow-big-left' />
      Go to the index
    </ULink>
  </div>
</template>

<script>
import { ULink } from '#components';

export default {
  name: 'HomePage',
};
</script>
