import { defineStore } from "pinia";

import { ref } from "vue";

const useModeSwitcherStore = defineStore("mode-switcher-store", () => {
  const isEditMode = ref(false);

  const toggleMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  return {
    isEditMode,
    toggleMode,
  };
});

export default useModeSwitcherStore;
