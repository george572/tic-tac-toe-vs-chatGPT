import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGameStateStore = defineStore('playerInfo', () => {
  const userPickedCells = ref<string[]>([]);
  const gptPickedCells = ref<string[]>([]);

  const updateGameState = (player: string, cellId: string) => {
    if (player === 'gpt') {
      gptPickedCells.value.push(cellId);
    } else {
      userPickedCells.value.push(cellId);
    }
  };

  const resetGameState = () => {
    userPickedCells.value = [];
    gptPickedCells.value = [];
  };

  return { userPickedCells, gptPickedCells, updateGameState, resetGameState };
});
