import type { INode } from "src/modules/tree-store/utils/tree-store/types";

export const isNode = (value: unknown): value is INode =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  "parent" in value &&
  "label" in value;
