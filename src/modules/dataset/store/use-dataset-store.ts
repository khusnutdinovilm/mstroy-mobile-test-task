import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { INode } from "src/modules/tree-store/types/tree-store";

import type { IDatasetEntry } from "src/modules/dataset/types/dataset";

const useDatasetStore = defineStore("dataset-store", () => {
  const datasets = ref<Map<string, IDatasetEntry>>(new Map());
  const activeDataset = ref<IDatasetEntry | null>(null);

  const sortedDatasets = computed<IDatasetEntry[]>(() =>
    Array.from(datasets.value.values()).sort((a, b) => b.timestamp - a.timestamp),
  );

  const addDataset = (name: string, data: INode[]) => {
    const entry: IDatasetEntry = {
      name,
      data,
      saved: false,
      timestamp: Date.now(),
    };

    datasets.value.set(name, entry);

    selectDataset(name);
  };

  const selectDataset = (name: string) => {
    const found = datasets.value.get(name);
    activeDataset.value = found ?? null;
  };

  const removeDatase = (name: string) => {
    datasets.value.delete(name);

    if (datasets.value.size === 0) {
      activeDataset.value = null;
    } else {
      activeDataset.value = sortedDatasets.value?.[0] ?? null;
    }
  };

  return {
    datasets,
    activeDataset,
    sortedDatasets,
    addDataset,
    removeDatase,
    selectDataset,
  };
});

export default useDatasetStore;
