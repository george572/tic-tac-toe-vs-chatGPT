<script setup lang="ts">
import GameBoard from '@/components/game-components/GameBoard.vue';
import { ref } from 'vue';

const startGame = ref(true);

</script>

<template>
  <GameBoard
    v-if="startGame"
  />
</template>
