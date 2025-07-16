import { defineStore } from "pinia";

import { computed, ref } from "vue";

import TreeStore from "src/utils/tree-store/tree-store";
import type { INode, NodeIdType } from "src/utils/tree-store/types";

const useActiveTreeStore = defineStore("active-tree-store", () => {
  const treeStore = ref<TreeStore | null>(null);

  const nodesWithPath = computed(() => {
    if (!treeStore.value) return [];

    const allNodes = treeStore.value.getAll();

    return allNodes.map(node => {
      const allParents = treeStore.value!.getAllParents(node.id);

      return {
        ...node,
        path: allParents.map(node => node.id).reverse(),
      };
    });
  });

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
    initTreeStore,
    nodesWithPath,
    addNewNode,
    removeNode,
    updateNode,
  };
});

export default useActiveTreeStore;
