<script lang="ts" setup>
import { ref, reactive } from "vue";
import { CellsGrid } from "@/constants/CellsGrid";
import GameBoardCell from './GameBoardCell.vue';
import { useGameStateStore } from "@/stores/gameState";
import { UseRoundResult } from "@/composables/UseRoundResult";
import { UseWhoStarts } from "@/composables/UseWhoStarts";

const { currentActivePlayer, currentTurn } = UseWhoStarts();
const store = useGameStateStore();
const playerScore = ref<number>(0);
const chatGptScore = ref<number>(0);
const turn = ref<number | null >(null);
const cellsGrid = reactive<Cell[]>(CellsGrid);
const currentPlayer = ref<string | undefined>(undefined);
const startGame = ref<boolean>(false);



const handleStartBtnClick = () => {
  startGame.value = true;
  turn.value = currentTurn;
  currentPlayer.value = currentActivePlayer;
};

const handleCellPickEvent = (cell: Cell) => {
  cell.occupied = true;
  const pickedCells = turn.value === 1 ? store.gptPickedCells : store.userPickedCells;
  const { roundResult } = UseRoundResult(currentPlayer.value, pickedCells);
  console.log(roundResult);
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
      v-if="!startGame"
      class="start-game-div"
    >
      <button @click="handleStartBtnClick">
        START
      </button>
    </div>
    <div
      v-else
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

.start-game-div {
  min-width:486px;
  height:486px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  button {
    font-size: 62px;
    padding: 10px 15px;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    outline: none;
    color: white;
    border-radius: 10px;
    transition: all 200ms;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: #293341;
      transform: scale(1.06);
    }
  }
}

</style>