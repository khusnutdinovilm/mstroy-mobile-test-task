import { computed, ref } from "vue";

import type { ColDef } from "ag-grid-enterprise";

import TreeCell from "src/modules/tree-store/components/tree-cell";

import useActiveTreeStore from "src/modules/tree-store/store/use-active-tree-store";

import type { INode } from "src/modules/tree-store/types/tree-store";
import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";

export default function () {
  const { isEdit } = useModeSwitcher();

  const treeTableStore = useActiveTreeStore();

  const tableColumns = ref<ColDef[]>([
    {
      field: "label",
      headerName: "Наименование",
      editable: () => isEdit.value,
      resizable: false,
    },
  ]);

  const tableRows = computed(() => {
    if (!treeTableStore.treeStore) return [];

    const allNodes = treeTableStore.treeStore.getAll();

    return allNodes.map(node => {
      const allParents = treeTableStore.treeStore!.getAllParents(node.id);

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
      createNewNode: treeTableStore.addNewNode,
      deleteNode: treeTableStore.removeNode,
    },
  });

  const editNode = ({ id, parent, label }: INode) => {
    treeTableStore.updateNode({ id, parent, label });
  };

  return {
    tableColumns,
    tableRows,
    autoGroupColumnDef,
    editNode,
  };
}
