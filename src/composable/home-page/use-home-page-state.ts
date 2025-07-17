import { computed, watch } from "vue";

import useDatasetStore from "src/modules/dataset/store/use-dataset-store";
import useActiveTreeStore from "src/modules/tree-store/store/use-active-tree-store";
import useTreeMode from "src/modules/tree-store/store/use-tree-mode";

export default function () {
  const datasetStore = useDatasetStore();
  const treeModeStore = useTreeMode();
  const treeTableStore = useActiveTreeStore();

  const isDatasetsEmpty = computed(() => !datasetStore.datasets.size);
  const isEditMode = computed(() => treeModeStore.isEditMode);

  watch(
    () => datasetStore.activeDataset,
    newValue => {
      if (newValue) {
        treeTableStore.initTreeStore(newValue.data);
      } else if (treeModeStore.isEditMode) {
        treeModeStore.toggleMode();
      }
    },
  );

  return {
    isDatasetsEmpty,
    isEditMode,
  };
}
