import type { INode } from "src/modules/tree-store/types/tree-store";

export interface IDatasetMeta {
  name: string;
  saved: boolean;
  timestamp: number;
}

export interface IDatasetEntry extends IDatasetMeta {
  data: INode[];
}
