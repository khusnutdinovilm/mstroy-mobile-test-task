<template>
  <q-page class="home-page">
    <home-page-header :is-empty="isDatasetsEmpty" :is-edit-mode="isEditMode" />

    <div class="home-page__content" :class="homepageContentClasses">
      <home-page-empty-state v-if="isDatasetsEmpty" />
      <div v-else class="home-page__table-container">
        <tree-table
          :row-data="tableRows"
          :column-defs="tableColumns"
          :auto-group-col-def="autoGroupColumnDef"
          @on-cell-edit-stop="editNode"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { HomePageHeader, HomePageEmptyState } from "src/components/home-page";

import TreeTable from "src/modules/tree-store/components/tree-table";

import useHomePageTable from "src/composable/home-page/use-home-page-table";
import useHomePageState from "src/composable/home-page/use-home-page-state";

defineOptions({
  name: "home-page",
});

const { isDatasetsEmpty, isEditMode } = useHomePageState();

const { tableColumns, tableRows, autoGroupColumnDef, editNode } = useHomePageTable();

const homepageContentClasses = computed(() => ({
  "home-page__content--empty": isDatasetsEmpty.value,
}));
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
    flex: 1;
    height: 100%;

    &--empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  &__table-container {
    height: 100%;
  }
}
</style>
