<script lang="ts" setup>
import { ref } from 'vue';
import { useGameStateStore } from '@/stores/gameState';

const store = useGameStateStore();
const activateUserSymbol = ref<boolean>(false);
const activateGptSymbol = ref<boolean>(false);
const props = defineProps({
  occupied : { type: Boolean, required: true },
  player: { type: String, required: false, default: '' },
  cellId: { type: String, required: true }
});

const emit = defineEmits(['cell-picked']);

const pickCell = () => {
  if (!props.occupied && props.player !== "") {
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
    :class="{'active' : occupied}"
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
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  img {
    width: 80px;
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
</style>