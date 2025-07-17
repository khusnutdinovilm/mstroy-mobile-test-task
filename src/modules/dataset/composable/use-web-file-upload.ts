import { ref } from "vue";

import useNotify from "src/utils/use-notify";

import { readFileAsText } from "src/modules/dataset/utils/file/read-file-as-text";
import { parseJson, validateParsed } from "src/modules/dataset/utils/dataset/dataset-utils";

import { isNode } from "src/modules/tree-store/utils/is-node";

import type { INode } from "src/modules/tree-store/types/tree-store";
import type { OnSuccessHandler } from "src/modules/dataset/types/file";

export default function (onSuccess: OnSuccessHandler) {
  const notify = useNotify();

  const fileInputRef = ref<HTMLInputElement | null>(null);

  const resetInput = () => {
    if (fileInputRef.value) {
      fileInputRef.value.value = "";
    }
  };

  const triggerFileInputDialog = () => {
    fileInputRef.value?.click();
  };

  const handleFileChange = async (event: Event): Promise<void> => {
    if (!(event.target instanceof HTMLInputElement)) return;

    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const content = await readFileAsText(file);
      const parsed = parseJson(content);
      const validatedData = validateParsed<INode>({
        data: parsed,
        validator: isNode,
        errorMessage: "Некорректная структура узлов дерева",
      });

      onSuccess(file.name, validatedData);

      notify.positive({
        message: `Файл <strong>${file.name}</strong> успешно загружен`,
        html: true,
      });
    } catch (error) {
      const { message } = (error as { message: string }) || "Ошибка загрузки файла";
      notify.negative({
        message,
      });
    } finally {
      resetInput();
    }
  };

  return {
    fileInputRef,
    triggerFileInputDialog,
    handleFileChange,
  };
}
