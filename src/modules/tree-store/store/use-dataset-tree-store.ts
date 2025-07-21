import { defineStore } from "pinia";
import { reactive, ref, toRaw } from "vue";

import TreeStore from "src/modules/tree-store/utils/tree-store/tree-store";
import treeStoreStorage from "src/modules/tree-store/storage/tree-store-storage";

import type { INode, NodeIdType } from "src/modules/tree-store/utils/tree-store/types";
import useAppEnvironment from "src/composable/use-app-environment";

const useDatasetTreeStore = defineStore("dataset-tree-store", () => {
  const treeStoresMap = reactive<Map<string, TreeStore>>(new Map());

  const { canSaveData } = useAppEnvironment();

  const loadAll = async () => {
    const resData = await treeStoreStorage.getAll();

    resData.forEach(datasetData => {
      const { name, data: nodeList } = datasetData;
      const treeStore = new TreeStore(nodeList);

      treeStoresMap.set(name, treeStore);
    });
  };

  const saveTreeStore = async (name: string, data: INode[]): Promise<void> => {
    if (canSaveData.value) {
      await treeStoreStorage.save({ name, data });
    }

    treeStoresMap.set(name, new TreeStore(data));
  };

  const deleteTreeStore = async (name: string): Promise<void> => {
    if (canSaveData.value) {
      await treeStoreStorage.delete(name);
    }

    treeStoresMap.delete(name);
    if (selectedDatasetName.value === name) {
      selectedDatasetName.value = "";
      selectedTreeStore.value = null;
    }
  };

  const selectedTreeStore = ref<TreeStore | null>(null);
  const selectedDatasetName = ref<string>("");

  const setSelectedTreeStore = (name: string) => {
    const selected = treeStoresMap.get(name);
    if (selected) {
      selectedDatasetName.value = name;
      selectedTreeStore.value = selected;
    }
  };

  const persistSelectedTreeStore = async () => {
    if (!selectedTreeStore.value) return;

    if (canSaveData.value) {
      await treeStoreStorage.save({
        name: selectedDatasetName.value,
        data: selectedTreeStore.value.getAll().map(node => toRaw(node)),
      });
    }
  };

  const addNode = async (newNode: INode): Promise<void> => {
    if (selectedTreeStore.value) {
      selectedTreeStore.value.addItem(newNode);

      await persistSelectedTreeStore();
    }
  };

  const updateNode = async (updatedNode: INode): Promise<void> => {
    if (selectedTreeStore.value) {
      selectedTreeStore.value.updateItem(updatedNode);

      await persistSelectedTreeStore();
    }
  };

  const deleteNode = async (nodeId: NodeIdType): Promise<void> => {
    if (selectedTreeStore.value) {
      selectedTreeStore.value.removeItem(nodeId);

      await persistSelectedTreeStore();
    }
  };

  return {
    saveTreeStore,
    loadAll,
    deleteTreeStore,

    selectedTreeStore,
    setSelectedTreeStore,
    addNode,
    updateNode,
    deleteNode,
  };
});

export default useDatasetTreeStore;
