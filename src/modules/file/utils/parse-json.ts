export default function parseJson(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Неверный формат JSON");
  }
}
