<script lang="ts" setup>
import { CellsGrid } from "@/shared/CellsGrid";
import { ref } from "vue";
import GameBoardCell from './GameBoardCell.vue';

const playerScore = ref<number>(0);
const chatGptScore = ref<number>(0);
const turn = ref<number | null >(null);
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
        v-for="cell in CellsGrid"
        :key="cell.id"
      />
    </div>
    <div class="player-info">
      <h2>GPT</h2>
      <span>Score : {{ chatGptScore }}</span>
    </div>
    <button @click="() => turn === 1 ? turn = 0 : turn = 1 " />
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


</style>