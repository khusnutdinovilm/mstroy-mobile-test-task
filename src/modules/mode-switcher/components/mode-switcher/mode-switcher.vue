<template>
  <q-toggle
    v-model="isEdit"
    :label="`Режим ${currentLabel}`"
    unchecked-icon="visibility"
    checked-icon="edit"
    class="mode-switcher"
    :disable="disabled"
  />
</template>

<script setup lang="ts">
import useModeSwitcher from "src/modules/mode-switcher/composable/use-mode-switcher";

defineOptions({
  name: "mode-switcher",
});

defineProps<{
  disabled?: boolean;
}>();

const { isEdit, label: currentLabel } = useModeSwitcher();
</script>

<style lang="scss">
.mode-switcher {
  & .q-toggle__label {
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
    }
  }
}
</style>
