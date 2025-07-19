<template>
  <div class="home-page-header">
    <mode-switcher :disabled="isEmpty" />

    <div class="home-page-header__controls">
      <dataset-uploader v-if="isEditMode" class="home-page-header__uploader" />

      <dataset-selector
        :disabled="isEmpty"
        :is-edit-mode="isEditMode"
        class="home-page-header__selector"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModeSwitcher from "src/modules/mode-switcher/components/mode-switcher";
import DatasetUploader from "src/modules/dataset/components/dataset-uploader";
import DatasetSelector from "src/modules/dataset/components/dataset-selector";

defineOptions({
  name: "home-page-header",
});

defineProps<{
  isEmpty: boolean;
  isEditMode: boolean;
}>();
</script>

<style lang="scss">
.home-page-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &__controls {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 20px;
  }

  &__uploader {
    @media screen and (max-width: 768px) {
      & .q-icon {
        margin: 0;
      }

      & .block {
        display: none !important;
      }
    }
  }

  &__selector {
    min-width: 150px;

    @media screen and (min-width: 768px) {
      min-width: 200px;
    }
  }
}
</style>
