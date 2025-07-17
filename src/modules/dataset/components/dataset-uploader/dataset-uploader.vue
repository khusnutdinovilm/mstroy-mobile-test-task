<template>
  <div class="dataset-uploader">
    <q-btn label="Добавить датасет" icon="add_circle" color="primary" @click.prevent="uploadFile" />

    <input ref="fileInputRef" type="file" accept=".json" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
import useDatasetStore from "src/modules/dataset/store/use-dataset-store";
import useWebFileUpload from "src/modules/dataset/composable/use-web-file-upload";

defineOptions({
  name: "dataset-uploader",
});

const { addDataset } = useDatasetStore();

const uploadFile = () => {
  // TODO: проверка платформы (cordova или web)

  triggerFileInputDialog();
};
const { fileInputRef, triggerFileInputDialog, handleFileChange } = useWebFileUpload(addDataset);
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
