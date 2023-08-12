<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { CellsGrid } from "@/utils/constants/CellsGrid";
import { useGameStateStore } from "@/stores/gameState";
import { UseRoundResult } from "@/composables/UseRoundResult";
import { UseWhoStarts } from "@/composables/UseWhoStarts";
import GameBoardCell from './GameBoardCell.vue';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/utils/functions/localStorage";

const store = useGameStateStore();
const { determineWhoStarts } = UseWhoStarts();

const roundResultText = ref<string>("");
const gameStartText = ref<string>("");
const gameScores = ref<ScoreCounter>({
  user: {
    wins: 0,
    ties: 0,
    loses: 0
  },
  gpt: {
    wins: 0,
    ties: 0,
    loses: 0
  }
});
const turn = ref<number | null >(null);
const cellsGridClone = ref<Cell[]>(JSON.parse(JSON.stringify(CellsGrid)));
const currentPlayer = ref<string | undefined>(undefined);
const startGame = ref<boolean>(false);
const roundFinished = ref<boolean>(false);
const winningCellsArray = ref<string[] | null>(null);
const previousGameRecordExists = ref<boolean>(false);

onMounted(() => {
  getDataFromLocalStorage();
});

const getDataFromLocalStorage = () => {
  const userData = getLocalStorage('user');
  const gptData = getLocalStorage('gpt');
  if (userData && gptData) {
    previousGameRecordExists.value = true;
    gameScores.value.user = userData;
    gameScores.value.gpt = gptData;
  }
};

const handleStartGame = () => {
  const lastRoundWinner = getLocalStorage('lastRoundWinner');
  if ( lastRoundWinner ) {
    if ( lastRoundWinner === 'user') {
      currentPlayer.value = 'gpt';
      turn.value = 1;
      gameStartText.value = 'GPT starts'; 
    } else {
      currentPlayer.value = 'user';
      gameStartText.value = 'USER starts'; 
      turn.value = 0;
    }
  } else {
    const r = determineWhoStarts();
    turn.value = r.currentTurn;
    currentPlayer.value = r.currentActivePlayer;
    gameStartText.value = currentPlayer.value.toUpperCase() + ' starts'; 
  }
  startGame.value = true;
  roundFinished.value = false;
  roundResultText.value = "";
};

const handleCellPickEvent = (cell: Cell) => {
  gameStartText.value = "";
  cell.occupied = true;
  const pickedCells = turn.value === 1 ? store.gptPickedCells : store.userPickedCells;
  const { roundResult, winningCells } = UseRoundResult(currentPlayer.value, pickedCells, cellsGridClone.value);
  if (roundResult) {
    setLocalStorage('lastRoundWinner', currentPlayer.value);
    store.resetGameState();
    roundFinished.value = true;
    winningCellsArray.value = winningCells;
    roundResultText.value = roundResult;
    if ( roundResult === 'Tie') {
      gameScores.value.user.ties += 1;
      gameScores.value.gpt.ties += 1;
      return;
    }
    if ( roundResult !== 'Tie' ) {
      if ( currentPlayer.value === 'user' ) {
        gameScores.value.user.wins += 1;
        gameScores.value.gpt.loses += 1;
        return;
      } 
      if ( currentPlayer.value === 'gpt' ) {
        gameScores.value.gpt.wins += 1;
        gameScores.value.user.loses += 1;
        return;
      }
    }
  } 
  changeTurn();
};

const restartGame = () => {
  cellsGridClone.value = [];
  winningCellsArray.value = [];
  setTimeout(() => {
    cellsGridClone.value = JSON.parse(JSON.stringify(CellsGrid));
  }, 0.1);
  handleStartGame();
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

const resetGameData = () => {
  removeLocalStorage('gpt');
  removeLocalStorage('user');
  window.location.reload();
};

watch(gameScores.value, () => {
  setLocalStorage('user', gameScores.value.user);
  setLocalStorage('gpt', gameScores.value.gpt);
  previousGameRecordExists.value = true;
});
</script>

<template>
  <div class="game-board-wrapper">
    <div class="player-info">
      <h2>YOU</h2>
      <span>Wins : {{ gameScores.user.wins }}</span>
      <span>Ties : {{ gameScores.user.ties }}</span>
      <span>Loses : {{ gameScores.user.loses }}</span>
    </div>
    <div
      v-if="!startGame"
      class="start-game-div"
    >
      <button
        v-if="!roundFinished"
        @click="handleStartGame"
      >
        START
      </button>
    </div>
    <div
      v-else
      class="game-board-grid"
      :class="{'gpt-turn' : turn === 1, 'player-turn' : turn === 0}"
    >
      <GameBoardCell
        v-for="cell in cellsGridClone"
        :key="cell.id"
        :winning-cells="winningCellsArray"
        :occupied="cell.occupied"
        :player="currentPlayer"
        :cell-id="cell.id"
        :allow-cell-pick="!roundFinished"
        @cell-picked="handleCellPickEvent(cell)"
      />
      <button
        v-if="roundFinished"
        class="restart-btn"
        @click="restartGame"
      >
        RESTART
      </button>
    </div>
    <div class="player-info">
      <h2>GPT</h2>
      <span>Wins : {{ gameScores.gpt.wins }}</span>
      <span>Ties : {{ gameScores.gpt.ties }}</span>
      <span>Loses : {{ gameScores.gpt.loses }}</span>
    </div>
    <div class="game-text">
      <div v-if="roundFinished">
        {{ roundResultText }}
      </div>
      <div v-if="startGame">
        {{ gameStartText }}
      </div>
    </div>
    <button
      v-if="previousGameRecordExists"
      class="reset-data-btn"
      @click="resetGameData"
    >
      RESET GAME DATA
    </button>
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
  span {
    margin: 3px 0;
    text-align: left;
  }
}

.game-board-grid {
  min-width:486px;
  min-height:486px;
  position: relative;
  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(3, 1fr);
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

.game-text {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 30px;
  font-size: 30px;
  top: 80px;
  text-align: center;
}

.start-game-div {
  min-width:486px;
  min-height:486px;
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

.restart-btn {
  position: absolute;
  bottom: -80px;
  right: 0;
  font-size: 30px;
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

.reset-data-btn {
  @extend .restart-btn;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
}
</style>