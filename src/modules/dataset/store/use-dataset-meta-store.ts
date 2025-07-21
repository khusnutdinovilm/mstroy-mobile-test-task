import { computed, reactive, ref } from "vue";

import { defineStore } from "pinia";

import datasetMetaStorage from "src/modules/dataset/storage/dataset-meta-storage";
import type { IDatasetMeta } from "src/modules/dataset/types/dataset";
import useAppEnvironment from "src/composable/use-app-environment";

const useDatasetMetaStore = defineStore("dataset-meta-store", () => {
  const { canSaveData } = useAppEnvironment();

  const datasetsMetaMap = reactive<Map<string, IDatasetMeta>>(new Map());

  const sortedDatasets = computed<IDatasetMeta[]>(() =>
    Array.from(datasetsMetaMap.values()).sort((a, b) => b.timestamp - a.timestamp),
  );

  const loadAll = async () => {
    const resData = await datasetMetaStorage.getAll();

    resData.forEach(datasetMeta => {
      datasetsMetaMap.set(datasetMeta.name, datasetMeta);
    });
  };

  const saveDatasetMeta = async (name: string): Promise<void> => {
    const entry: IDatasetMeta = {
      name,
      saved: canSaveData.value,
      timestamp: Date.now(),
    };

    if (canSaveData.value) {
      await datasetMetaStorage.save(entry);
    }

    datasetsMetaMap.set(name, entry);
  };

  const selectedDatasetMeta = ref<IDatasetMeta | null>(null);

  const setSelectedDatasetMeta = (name: string) => {
    const found = datasetsMetaMap.get(name);
    selectedDatasetMeta.value = found ?? null;
  };

  const deleteDatasetMeta = async (name: string): Promise<void> => {
    if (canSaveData.value) {
      await datasetMetaStorage.delete(name);
    }

    datasetsMetaMap.delete(name);

    if (datasetsMetaMap.size === 0) {
      selectedDatasetMeta.value = null;
    } else {
      selectedDatasetMeta.value = sortedDatasets.value[0] || null;
    }
  };

  return {
    datasetsMetaMap,
    sortedDatasets,
    loadAll,
    saveDatasetMeta,
    deleteDatasetMeta,

    selectedDatasetMeta,
    setSelectedDatasetMeta,
  };
});

export default useDatasetMetaStore;
