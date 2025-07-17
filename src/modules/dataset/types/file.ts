import type { INode } from "src/modules/tree-store/types/tree-store";

export type OnSuccessHandler = (name: string, data: INode[]) => void;

export interface ValidateParsedPayload<T> {
  data: unknown;
  validator: (item: unknown) => item is T;
  errorMessage: string;
}
