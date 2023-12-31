<script lang="ts" setup>
import { ref } from 'vue';
import { useGameStateStore } from '@/stores/gameState';


const props = defineProps({
  occupied : { type: Boolean, required: true },
  player: { type: String, required: false, default: '' },
  cellId: { type: String, required: true },
  allowCellPick: { type: Boolean, required: true },
  winningCells: { type : Array as () => string[] | null, required: false, default: null }
});

const emit = defineEmits(['cell-picked']);

const store = useGameStateStore();
const activateUserSymbol = ref<boolean>(false);
const activateGptSymbol = ref<boolean>(false);

const pickCell = () => {
  if (!props.occupied && props.player !== "" && props.allowCellPick) {
    store.updateGameState(props.player, props.cellId);
    emitPickCellEvent();
  }
};

const emitPickCellEvent = () => {
  emit('cell-picked');
  if ( props.player === 'user') {
    activateUserSymbol.value = true;
    activateGptSymbol.value = false;
  } else {
    activateGptSymbol.value = true;
    activateUserSymbol.value = false;
  }
};

</script>

<template>
  <div
    class="cell inactive"
    :class="{'active' : occupied, 'winning-cell': winningCells && winningCells.includes(cellId)}"
    @click="pickCell()"
  >
    <img
      v-if="activateUserSymbol"
      src="/src/assets/images/circle.svg"
      alt=""
    >
    <img
      v-else-if="activateGptSymbol"
      src="/src/assets/images/x.svg"
      alt=""
    >
    <div v-else />
  </div>
</template>

<style lang="scss" scoped>
.cell {
  width: 160px;
  height: 160px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  overflow: hidden;
  img {
    width: 80px;
  }
  &:nth-child(2) {
    border-top-left-radius: 10px;
  }
  &:nth-child(4) {
    border-top-right-radius: 10px;
  }
  &:nth-child(8) {
    border-bottom-left-radius: 10px;
  }
  &:nth-child(10) {
    border-bottom-right-radius: 10px;
  }
  @media only screen and (max-width: 760px) {
    width: 100%;
    height: auto;
  }
}
.inactive {
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
}

.active {
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: default;
  }
}

.winning-cell {
  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>