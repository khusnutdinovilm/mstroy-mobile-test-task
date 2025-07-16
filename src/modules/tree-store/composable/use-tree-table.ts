import { computed, ref } from "vue";
import type { ColDef } from "ag-grid-enterprise";

import useActiveTreeStore from "src/modules/tree-store/store/use-active-tree-store";
import useTreeMode from "src/modules/tree-store/store/use-tree-mode";
import TreeCell from "src/modules/tree-store/components/tree-cell";
import type { INode } from "src/modules/tree-store/types/tree-store";

export default function () {
  const treeModeStore = useTreeMode();
  const treeTableStore = useActiveTreeStore();

  const columns = ref<ColDef[]>([
    {
      field: "label",
      headerName: "Наименование",
      editable: () => treeModeStore.isEditMode,
      resizable: false,
    },
  ]);

  const rowData = computed(() => {
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
      isEditMode: () => treeModeStore.isEditMode,
      createNewNode: treeTableStore.addNewNode,
      deleteNode: treeTableStore.removeNode,
    },
  });

  const editNode = ({ id, parent, label }: INode) => {
    treeTableStore.updateNode({ id, parent, label });
  };

  return {
    columns,
    rowData,
    autoGroupColumnDef,
    editNode,
  };
}
