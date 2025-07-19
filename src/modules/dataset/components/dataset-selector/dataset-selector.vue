<template>
  <q-select
    v-model="selectedDatasetMeta"
    :options="datasetMetaStore.sortedDatasets"
    :disable="disabled"
    option-label="name"
    option-value="name"
    label="Выерите файл"
    dense
    outlined
  >
    <template #option="{ itemProps, opt }">
      <q-item v-bind="itemProps">
        <q-item-section side>
          {{ opt.name }}
        </q-item-section>

        <q-item-section v-if="!opt.saved">
          <q-icon name="warning" color="yellow-9" />
        </q-item-section>

        <q-item-section v-if="isEditMode" side @click.stop="removeDataset(opt.value)">
          <q-btn icon="remove" round dense color="negative" size="xs" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed } from "vue";

import useNotify from "src/utils/use-notify";

import useDatasetMetaStore from "src/modules/dataset/store/use-dataset-meta-store";
import useDatasetTreeStore from "src/modules/tree-store/store/use-dataset-tree-store";

defineOptions({
  name: "dataset-selector",
});

defineProps<{
  disabled?: boolean;
  isEditMode?: boolean;
}>();

const notify = useNotify();

const datasetMetaStore = useDatasetMetaStore();
const datasetTreeStore = useDatasetTreeStore();

const selectedDatasetMeta = computed({
  get: () => datasetMetaStore.selectedDatasetMeta,
  set: value => {
    if (!value) return;

    const current = datasetMetaStore.selectedDatasetMeta;

    if (current !== null && value.name !== current.name) {
      datasetMetaStore.setSelectedDatasetMeta(value.name);
      datasetTreeStore.setSelectedTreeStore(value.name);
    }
  },
});

const removeDataset = async (datasetName: string) => {
  await datasetMetaStore.deleteDatasetMeta(datasetName);
  await datasetTreeStore.deleteTreeStore(datasetName);

  notify.positive({
    message: `Файл ${datasetName} успешно удалён`,
    html: true,
  });
};
</script>
