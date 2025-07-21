import { computed, ref } from "vue";

import useNotify from "src/utils/use-notify";

import useDatasetMetaStore from "src/modules/dataset/store/use-dataset-meta-store";
import useDatasetTreeStore from "src/modules/tree-store/store/use-dataset-tree-store";

export default function useHomePageData() {
  const notify = useNotify();

  const datasetMetaStore = useDatasetMetaStore();
  const datasetTreeStore = useDatasetTreeStore();

  const isDatasetsEmpty = computed(() => !datasetMetaStore.datasetsMetaMap.size);
  const isDataLoading = ref(false);

  const loadInitialData = async () => {
    isDataLoading.value = true;

    try {
      await datasetMetaStore.loadAll();
      await datasetTreeStore.loadAll();

      selectFirstDatasetIfExists();
    } catch (error) {
      notify.negative({
        message: "Произошла ошибка при загрузке данных",
      });
      throw error;
    } finally {
      isDataLoading.value = false;
    }
  };

  const selectFirstDatasetIfExists = () => {
    const firstDataset = datasetMetaStore.sortedDatasets[0];

    if (firstDataset) {
      datasetMetaStore.setSelectedDatasetMeta(firstDataset.name);
      datasetTreeStore.setSelectedTreeStore(firstDataset.name);
    }
  };

  return {
    isDataLoading,
    isDatasetsEmpty,
    loadInitialData,
  };
}
