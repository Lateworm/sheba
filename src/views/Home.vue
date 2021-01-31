<template>
  <div class="home">
    <LocalDataDemos msg="A Demo in Vue 3 with TypeScript"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LocalDataDemos from '@/components/LocalDataDemos.vue'; // @ is an alias to /src

  export default defineComponent({
    name: 'Home',
    components: {
      LocalDataDemos,
    },
  });
</script>
