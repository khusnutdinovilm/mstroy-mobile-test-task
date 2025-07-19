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
import { computed, onMounted, ref } from "vue";

import { HomePageHeader, HomePageEmptyState } from "src/components/home-page";

import TreeDataTable from "src/modules/tree-store/components/tree-data-table";

import useNotify from "src/utils/use-notify";

import useDatasetMetaStore from "src/modules/dataset/store/use-dataset-meta-store";
import useDatasetTreeStore from "src/modules/tree-store/store/use-dataset-tree-store";
import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";

defineOptions({
  name: "home-page",
});

const notify = useNotify();
const { isEdit: isEditMode } = useModeSwitcher();
const datasetMetaStore = useDatasetMetaStore();
const datasetTreeStore = useDatasetTreeStore();

const isDatasetsEmpty = computed(() => !datasetMetaStore.datasetsMetaMap.size);
const isDataLoading = ref(true);
const homepageContentClasses = computed(() => ({
  "home-page__content--empty": isDatasetsEmpty.value,
}));

const loadInitialData = async () => {
  isDataLoading.value = true;

  try {
    await datasetMetaStore.loadAll();
    await datasetTreeStore.loadAll();

    selectFirstDatasetIfExists();
  } catch (error) {
    notify.negative({
      message: "Произошла ошибка при загрузке данных",
    });
    throw error;
  } finally {
    isDataLoading.value = false;
  }
};

const selectFirstDatasetIfExists = () => {
  const firstDataset = datasetMetaStore.sortedDatasets[0];

  if (firstDataset) {
    datasetMetaStore.setSelectedDatasetMeta(firstDataset.name);
    datasetTreeStore.setSelectedTreeStore(firstDataset.name);
  }
};

onMounted(async () => {
  await loadInitialData();
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
