<template>
  <q-select
    v-model="selected"
    :options="options"
    :disable="disabled"
    dense
    label="Выберите файл"
    outlined
  >
    <template #option="{ itemProps, opt }">
      <q-item v-bind="itemProps">
        <q-item-section side>
          {{ opt.label }}
        </q-item-section>

        <q-item-section v-if="!opt.saved">
          <q-icon name="warning" color="yellow-9" />
        </q-item-section>

        <q-item-section v-if="isEditMode" side @click.stop="datasetStore.removeDatase(opt.value)">
          <q-btn icon="remove" round dense color="negative" size="xs" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import useDatasetStore from "src/modules/dataset/store/use-dataset-store";
import type { IOptionItem } from "./types";
import { QSelect } from "quasar";

defineOptions({
  name: "dataset-selector",
});

defineProps<{
  disabled?: boolean;
  isEditMode?: boolean;
}>();

const datasetStore = useDatasetStore();

watch(
  () => datasetStore.activeDataset,
  newValue => {
    if (newValue) {
      const { name } = newValue;
      selected.value = {
        label: name,
        value: name,
      };
    } else {
      selected.value = null;
    }
  },
);

const selected = ref<IOptionItem | null>(null);
watch(selected, newModelValue => {
  if (newModelValue) {
    datasetStore.selectDataset(newModelValue.value);
  }
});

const options = computed(() => {
  return datasetStore.sortedDatasets.map(dataset => ({
    label: dataset.name,
    value: dataset.name,
  }));
});
</script>
