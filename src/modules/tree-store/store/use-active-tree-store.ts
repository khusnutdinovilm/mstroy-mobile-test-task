import { defineStore } from "pinia";

import { ref } from "vue";

import TreeStore from "src/modules/tree-store/utils/tree-store/tree-store";
import type { INode, NodeIdType } from "src/modules/tree-store/types/tree-store";

const useActiveTreeStore = defineStore("active-tree-store", () => {
  const treeStore = ref<TreeStore | null>(null);

  const initTreeStore = (nodeList: INode[]) => {
    treeStore.value = new TreeStore(nodeList);
  };

  function addNewNode(newNode: INode) {
    treeStore.value?.addItem(newNode);
  }

  function removeNode(nodeId: NodeIdType) {
    treeStore.value?.removeItem(nodeId);
  }

  function updateNode(updatedNode: INode) {
    treeStore.value?.updateItem(updatedNode);
  }

  return {
    treeStore,
    initTreeStore,
    addNewNode,
    removeNode,
    updateNode,
  };
});

export default useActiveTreeStore;
