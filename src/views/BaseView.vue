<script setup lang="ts">
import StartScreen from '@/components/StartScreen.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <StartScreen
    @start-game="() => router.push({ path: 'play' })"
  />
</template>
