import { ref } from "vue";

import readFileAsText from "src/modules/file/utils/read-file-as-text";
import parseJson from "src/modules/file/utils/parse-json";
import validateParsed from "src/modules/file/utils/validate-parsed";

import type { IUseWebFileUploadPayload } from "src/modules/file/types";

export default function useWebFileUpload<T>(payload: IUseWebFileUploadPayload<T>) {
  const { fileDataValidator, onSuccess } = payload;

  const fileInputRef = ref<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (fileInputRef.value) {
      fileInputRef.value.value = "";
    }
  };

  function triggerFileInputDialog() {
    fileInputRef.value?.click();
  }

  async function handleFileChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const content = await readFileAsText(file);
      const parsed = parseJson(content);
      const validatedData = validateParsed<T>({
        data: parsed,
        validator: fileDataValidator,
        errorMessage: "Некорректная структура узлов дерева",
      });

      onSuccess(file.name, validatedData);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      resetInput();
    }
  }

  return {
    fileInputRef,
    triggerFileInputDialog,
    handleFileChange,
  };
}
