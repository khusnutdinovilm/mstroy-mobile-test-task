import type { ValidateParsedPayload } from "src/modules/file//types";

export default function validateParsed<T>(payload: ValidateParsedPayload<T>): T[] {
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
