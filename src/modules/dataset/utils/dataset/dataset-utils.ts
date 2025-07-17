import type { ValidateParsedPayload } from "src/modules/dataset/types/file";

export function parseJson(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Неверный формат JSON");
  }
}

export function validateParsed<T>(payload: ValidateParsedPayload<T>): T[] {
  const { data, validator, errorMessage = "Некорректная структура данных" } = payload;

  if (!Array.isArray(data)) {
    throw new Error("Файл должен содержать массив объектов");
  }

  const isValid = data.every(validator);

  if (!isValid) {
    throw new Error(errorMessage);
  }

  return data;
}
