<template>
  <ag-grid-vue
    :style="treeDataGridStyles"
    :row-data="rowData"
    :default-col-def="defaultColDef"
    :column-defs="columnDefs"
    :get-data-path="getDataPath"
    :auto-group-column-def="autoGroupColDef"
    :get-row-id="getRowIdFn"
    :group-default-expanded="groupDefaultExpanded"
    stop-editing-when-cells-lose-focus
    tree-data
    row-numbers
    @grid-ready="onGridReady"
    @cell-editing-stopped="handleCellEditStop"
  />
</template>

<script setup lang="ts" generic="T">
import { computed, shallowRef } from "vue";

import { AgGridVue } from "ag-grid-vue3";

import type {
  ITreeTableEmits,
  ITreeTableProps,
  GetRowIdFunc,
  GetDataPath,
  GetRowIdParams,
  CellEditingStoppedEvent,
  GridApi,
  GridReadyEvent,
} from "./types";

defineOptions({
  name: "tree-data-grid",
});

const {
  defaultColDef = { flex: 1 },
  groupDefaultExpanded = 10,
  minTableWidth = "600px",
} = defineProps<ITreeTableProps<T>>();

const emit = defineEmits<ITreeTableEmits<T>>();

const treeDataGridStyles = computed(() => ({
  width: "100%",
  height: "100%",
  minWidth: `${minTableWidth}`,
}));

const gridApi = shallowRef<GridApi | null>(null);

const getRowIdFn: GetRowIdFunc = (params: GetRowIdParams) => String(params.data.id);
const getDataPath: GetDataPath = data => data.path;
function onGridReady(params: GridReadyEvent) {
  gridApi.value = params.api;
}

function handleCellEditStop(event: CellEditingStoppedEvent<T>) {
  const cellData = event.data;
  if (cellData) {
    emit("on-cell-edit-stop", cellData);
  }
}
</script>
