import { defineStore } from "pinia";
import { ref } from "vue";

const useTreeMode = defineStore("tree-mode", () => {
  const isEditMode = ref(false);

  const toggleMode = () => {
    isEditMode.value = !isEditMode.value;
  };

  return {
    isEditMode,
    toggleMode,
  };
});

export default useTreeMode;
