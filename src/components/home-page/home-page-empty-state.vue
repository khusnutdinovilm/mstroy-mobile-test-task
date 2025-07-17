<template>
  <div class="home-page-empty-state">
    <h4>Нет данных</h4>

    <p>Вы можете выбрать файл .json, содержащий данные для отображения в таблице</p>

    <dataset-uploader />
  </div>
</template>

<script setup lang="ts">
import DatasetUploader from "src/modules/dataset/components/dataset-uploader";

defineOptions({
  name: "home-page-empty-state",
});
</script>

<style lang="scss">
.home-page-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  text-align: center;

  & h4 {
    margin: 0;
  }
}
</style>
