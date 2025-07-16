<template>
  <div class="tree-mode-toggle" @click="treeModeStore.toggleMode">
    <div class="tree-mode-toggle__label" :title="`Переключить в режим ${nextLabel}`">
      Режим {{ currentLabel }}
    </div>

    <div class="tree-mode-toggle__btn">
      <q-btn
        dense
        round
        :icon="currentIcon"
        color="primary"
        :aria-label="`Режим ${currentLabel}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import useTreeModeStore from "../../store/tree-mode-store";

defineOptions({
  name: "tree-mode-toggle",
});

const treeModeStore = useTreeModeStore();

const isEdit = computed(() => treeModeStore.isEditMode);

const currentLabel = computed(() => (isEdit.value ? "редактирования" : "просмотра"));
const nextLabel = computed(() => (!isEdit.value ? "редактирования" : "просмотра"));
const currentIcon = computed(() => (isEdit.value ? "edit" : "visibility"));
</script>

<style lang="scss">
.tree-mode-toggle {
  &__label {
    display: none;
    cursor: pointer;
    text-decoration: underline;
    color: $primary;

    @media screen and (min-width: 768px) {
      display: block;
    }
  }

  &__btn {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
}
</style>
