<template>
  <div class="tree-data-table">
    <div class="tree-data-table__container">
      <tree-data-grid
        :column-defs="tableColumns"
        :row-data="tableRows"
        :auto-group-col-def="autoGroupColumnDef"
        @on-cell-edit-stop="handleEditNode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import TreeDataGrid from "src/components/shared/tree-data-grid";

import useNotify from "src/utils/use-notify";

import TreeCell from "src/modules/tree-store/components/tree-cell";
import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";
import useDatasetTreeStore from "src/modules/tree-store/store/use-dataset-tree-store";

import type { ColDef } from "ag-grid-enterprise";
import type { INode, NodeIdType } from "src/modules/tree-store/utils/tree-store/types";

defineOptions({
  name: "tree-data-table",
});

const notify = useNotify();

const { isEdit } = useModeSwitcher();

const datasetTreeStore = useDatasetTreeStore();

const createNewNode = async (newNode: INode): Promise<void> => {
  await datasetTreeStore.addNode(newNode);
  notify.positive({
    message: "Узел успешно добавлен",
  });
};

const deleteNode = async (nodeId: NodeIdType): Promise<void> => {
  await datasetTreeStore.deleteNode(nodeId);
  notify.positive({
    message: "Узел успешно удален",
  });
};

const handleEditNode = async ({ id, parent, label }: INode) => {
  await datasetTreeStore.updateNode({ id, parent, label });
  notify.positive({
    message: "Узел успешно обновлён",
  });
};

const tableColumns = ref<ColDef[]>([
  {
    field: "label",
    headerName: "Наименование",
    editable: () => isEdit.value,
    resizable: false,
  },
]);

const tableRows = computed(() => {
  const selectedTreeStore = datasetTreeStore.selectedTreeStore;

  if (!selectedTreeStore) return [];

  const allNodes = selectedTreeStore.getAll();

  return allNodes.map(node => {
    const allParents = selectedTreeStore.getAllParents(node.id);

    return {
      ...node,
      path: allParents.map(node => node.id).reverse(),
    };
  });
});

const autoGroupColumnDef = ref<ColDef>({
  headerName: "Категория",
  field: "id",
  resizable: false,
  cellRenderer: TreeCell,
  cellRendererParams: {
    suppressCount: true,
    isEditMode: () => isEdit.value,
    createNewNode,
    deleteNode,
  },
});
</script>

<style lang="scss">
.tree-data-table {
  display: flex;
  flex-direction: column;

  &__container {
    flex: 1;
    overflow: scroll;
  }
}
</style>
