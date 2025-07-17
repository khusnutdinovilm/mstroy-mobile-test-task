<template>
  <div class="tree-mode-toggle" :class="treeModeClasses" @click="toggleMode">
    <div class="tree-mode-toggle__label" :title="`Переключить в режим ${nextLabel}`">
      Режим {{ currentLabel }}
    </div>

    <div class="tree-mode-toggle__btn">
      <q-btn
        dense
        round
        :icon="currentIcon"
        color="primary"
        :disable="disabled"
        :aria-label="`Режим ${currentLabel}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useQuasar } from "quasar";
import useTreeMode from "src/modules/tree-store/store/use-tree-mode";

defineOptions({
  name: "tree-mode-toggle",
});

const $q = useQuasar();

const props = defineProps<{
  disabled?: boolean;
}>();

const treeModeClasses = computed(() => ({
  "tree-mode-toggle--disable": props.disabled,
}));

const treeModeStore = useTreeMode();

const isEdit = computed(() => treeModeStore.isEditMode);

const currentLabel = computed(() => (isEdit.value ? "редактирования" : "просмотра"));
const nextLabel = computed(() => (!isEdit.value ? "редактирования" : "просмотра"));
const currentIcon = computed(() => (isEdit.value ? "edit" : "visibility"));

function toggleMode() {
  treeModeStore.toggleMode();
  $q.notify({
    icon: "",
    type: "positive",
    position: "bottom-right",
    message: `Вы переключись в режим <strong>${currentLabel.value}</strong>`,
    html: true,
    timeout: 500,
  });
}
</script>

<style lang="scss">
.tree-mode-toggle {
  --label-color: #{$blue-10};
  --label-cursor: pointer;

  &--disable {
    --label-color: #{$blue-3};
    --label-cursor: not-allowed;
    pointer-events: none;
  }

  &__label {
    display: none;
    cursor: var(--label-cursor);
    text-decoration: underline;
    color: var(--label-color);

    @media screen and (min-width: 768px) {
      display: block;
    }
  }

  &__btn {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
}
</style>
