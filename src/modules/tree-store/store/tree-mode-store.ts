import { defineStore } from "pinia";
import { ref } from "vue";

const useTreeModeStore = defineStore("tree-mode-store", () => {
  const isEditMode = ref(false);

  const toggleMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  return {
    isEditMode,
    toggleMode,
  };
});

export default useTreeModeStore;
