<script setup lang="ts">
import GameBoard from '@/components/game-components/GameBoard.vue';
import { ref } from 'vue';

const startGame = ref(true);

const handleStopGameEvent = () => (startGame.value = false);
</script>

<template>
  <GameBoard
    v-if="startGame"
    @stop-game="handleStopGameEvent"
  />
</template>
