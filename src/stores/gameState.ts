import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGameStateStore = defineStore('playerInfo', () => {
  const userPickedCells = ref<string[]>([]);
  const gptPickedCells = ref<string[]>([]);
  const activeTurn = ref<string | null>(null);

  const updateGameState = (player: string, cellId: string) => {
    if (player === 'gpt') {
      gptPickedCells.value.push(cellId);
    }
    userPickedCells.value.push(cellId);
  };

  const resetGameState = () => {
    userPickedCells.value = [];
    gptPickedCells.value = [];
  };

  const setActiveTurn = (player: string) => {
    activeTurn.value = player;
  };

  const resetActiveTurn = () => {
    activeTurn.value = null;
  };

  return { userPickedCells, gptPickedCells, updateGameState, resetGameState, activeTurn, setActiveTurn, resetActiveTurn };
});
