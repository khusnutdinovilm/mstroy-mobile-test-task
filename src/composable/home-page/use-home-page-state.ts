import { computed, watch } from "vue";

import useDatasetStore from "src/modules/dataset/store/use-dataset-store";
import useActiveTreeStore from "src/modules/tree-store/store/use-active-tree-store";
import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";

export default function () {
  const { isEdit, toggleMode } = useModeSwitcher();

  const datasetStore = useDatasetStore();
  const treeTableStore = useActiveTreeStore();

  const isDatasetsEmpty = computed(() => !datasetStore.datasets.size);
  const isEditMode = computed(() => isEdit.value);

  watch(
    () => datasetStore.activeDataset,
    newValue => {
      if (newValue) {
        treeTableStore.initTreeStore(newValue.data);
      } else if (isEdit.value) {
        toggleMode();
      }
    },
  );

  return {
    isDatasetsEmpty,
    isEditMode,
  };
}
