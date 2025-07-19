<template>
  <div class="dataset-uploader">
    <q-btn label="Добавить датасет" icon="add_circle" color="primary" @click.prevent="uploadFile" />

    <input ref="fileInputRef" type="file" accept=".json" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
import useNotify from "src/utils/use-notify";

import useWebFileUpload from "src/modules/file/composable/use-web-file-upload";
import useDatasetMetaStore from "src/modules/dataset/store/use-dataset-meta-store";

import { isNode } from "src/modules/tree-store/utils/is-node";
import useDatasetTreeStore from "src/modules/tree-store/store/use-dataset-tree-store";

import type { INode } from "src/modules/tree-store/utils/tree-store/types";

defineOptions({
  name: "dataset-uploader",
});

const notify = useNotify();

const datasetMetaStore = useDatasetMetaStore();
const datasetTreeStore = useDatasetTreeStore();

const onSuccess = async (filename: string, data: INode[]): Promise<void> => {
  await datasetMetaStore.saveDatasetMeta(filename);
  await datasetTreeStore.saveTreeStore(filename, data);

  datasetMetaStore.setSelectedDatasetMeta(filename);
  datasetTreeStore.setSelectedTreeStore(filename);

  notify.positive({
    message: `Файл <b>${filename}</b> успешно загружен`,
    html: true,
  });
};

const uploadFile = () => {
  // TODO: проверка платформы (cordova или web)

  triggerFileInputDialog();
};

const { fileInputRef, triggerFileInputDialog, handleFileChange } = useWebFileUpload<INode>({
  fileDataValidator: isNode,
  onSuccess,
});
</script>

<style lang="scss">
.dataset-uploader {
  & .q-btn {
    text-transform: none;
  }

  & input[type="file"] {
    display: none;
  }
}
</style>
