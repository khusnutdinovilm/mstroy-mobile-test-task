<template>
  <q-page class="home-page">
    <home-page-header :is-empty="isDatasetsEmpty" :is-edit-mode="isEditMode" />

    <div class="home-page__content" :class="homepageContentClasses">
      <div v-if="isDataLoading"></div>
      <home-page-empty-state v-else-if="isDatasetsEmpty" />
      <tree-data-table v-else class="home-page__table" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import { HomePageHeader, HomePageEmptyState } from "src/components/home-page";

import TreeDataTable from "src/modules/tree-store/components/tree-data-table";

import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";
import useHomePageData from "src/composable/use-home-page-data";
import useAppEnvironment from "src/composable/use-app-environment";

defineOptions({
  name: "home-page",
});

const { isEdit: isEditMode } = useModeSwitcher();
const { isDataLoading, isDatasetsEmpty, loadInitialData } = useHomePageData();
const { isMobile, isOnline } = useAppEnvironment();

const homepageContentClasses = computed(() => ({
  "home-page__content--empty": isDatasetsEmpty.value,
}));

onMounted(async () => {
  if (isMobile.value && isOnline.value) {
    await loadInitialData();
  }
});
</script>

<style lang="scss">
.home-page {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: inherit;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;

    &--empty {
      align-items: center;
      justify-content: center;
    }
  }

  &__content,
  &__table {
    flex: 1;
  }
}
</style>
