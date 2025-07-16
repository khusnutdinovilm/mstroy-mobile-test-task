import { type ICellRendererParams } from "ag-grid-enterprise";
import type { INode, NodeIdType } from "src/utils/tree-store/types";

export interface ITreeCellParams extends ICellRendererParams {
  isEditMode: () => boolean;
  createNewNode: (newNode: INode) => void;
  deleteNode: (nodeId: NodeIdType) => void;
}

export interface ITreeCellProps {
  params: ITreeCellParams;
}
