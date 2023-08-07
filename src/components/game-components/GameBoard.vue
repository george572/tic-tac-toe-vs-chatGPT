<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { CellsGrid } from "@/constants/CellsGrid";
import { winCombinations } from "@/constants/WinCombinations";
import GameBoardCell from './GameBoardCell.vue';
import { useGameStateStore } from "@/stores/gameState";

const store = useGameStateStore();
const playerScore = ref<number>(0);
const chatGptScore = ref<number>(0);
const turn = ref<number | null >(null);
const cellsGrid = reactive<Cell[]>(CellsGrid);
const countDownText = ref<number | null | string>(null);
const currentPlayer = ref<string | undefined>(undefined);

const checkWinCondition = (player: string | undefined, pickedCells: string[]) => {
  if (player) {
  if (winCombinations.some(item => JSON.stringify(item) === JSON.stringify(pickedCells))) {
    if ( player === 'user') {
      return console.log('user wins');
    } else {
      return console.log('gpt wins');
    }
  }
  } 
};

onMounted(() => {
  determineWhoStarts();
});

const determineWhoStarts = () => {
  const players = ['user', 'gpt'];
  let  startingPlayer = null;
  let countDown = 1;

  const intervalCountdown = setInterval(() => {
    countDown--;
    countDownText.value = countDown;
    if (countDown === 0) {
      startingPlayer = players[Math.floor(Math.random()*players.length)];
      countDownText.value = startingPlayer + ' starts';
      turn.value = players.indexOf(startingPlayer);
      currentPlayer.value = startingPlayer;
      setTimeout(() => {
        countDownText.value = null;
      }, 1000);
      clearInterval(intervalCountdown);
    }
  }, 600);
};

const handleCellPickEvent = (cell: Cell) => {
  cell.occupied = true;
  const pickedCells = turn.value === 1 ? store.gptPickedCells : store.userPickedCells;
  checkWinCondition(currentPlayer.value, pickedCells);
  changeTurn();
};

const changeTurn = () => {
  if ( turn.value === 1) {
    turn.value = 0;
    currentPlayer.value = 'user';
  } else {
    turn.value = 1;
    currentPlayer.value = 'gpt';
  }
};
</script>

<template>
  <div class="game-board-wrapper">
    <div class="player-info">
      <h2>YOU</h2>
      <span>Score : {{ playerScore }}</span>
    </div>
    <div
      class="game-board-grid"
      :class="{'gpt-turn' : turn === 1, 'player-turn' : turn === 0}"
    >
      <GameBoardCell
        v-for="cell in cellsGrid"
        :key="cell.id"
        :occupied="cell.occupied"
        :player="currentPlayer"
        :cell-id="cell.id"
        @cell-picked="handleCellPickEvent(cell)"
      />
    </div>
    <div class="player-info">
      <h2>GPT</h2>
      <span>Score : {{ chatGptScore }}</span>
    </div>
  </div>
  <div
    v-if="countDownText"
    class="countdown"
  >
    {{ countDownText }}
  </div>
</template>

<style scoped lang="scss">
.game-board-wrapper {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  max-height: 350px;
  h2 {
    font-size: 80px;
    padding-bottom: 20px;
  }
}

.game-board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
  box-shadow: 0 0 40px rgba(212, 212, 212, 0.5),
              0 0 70px rgba(212, 212, 212, 0.5),
              0 0 100px rgba(212, 212, 212, 0.5),
              0 0 160px rgba(212, 212, 212, 0.5);
  transition: all 200ms;

}

.gpt-turn {
  box-shadow: 40px 0 40px rgba(212, 212, 212, 0.5),
              70px 0 70px rgba(212, 212, 212, 0.5),
              100px 0 100px rgba(212, 212, 212, 0.5),
              160px 0 160px rgba(212, 212, 212, 0.5);
  color: white;

}
.player-turn {
  box-shadow: -40px 0 40px rgba(212, 212, 212, 0.5),
              -70px 0 70px rgba(212, 212, 212, 0.5),
              -100px 0 100px rgba(212, 212, 212, 0.5),
              -160px 0 160px rgba(212, 212, 212, 0.5);
  color: white;
}

.countdown {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 30px;
  font-size: 70px;
  top: 50px;
  text-align: center;
}


</style>