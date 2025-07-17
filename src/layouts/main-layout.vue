<template>
  <q-layout view="hHh lpR fFf" class="main-layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: "main-layout",
});
</script>

<style lang="scss">
.main-layout {
  height: 100%;

  & .q-page-container {
    height: 100%;
  }
}
</style>
