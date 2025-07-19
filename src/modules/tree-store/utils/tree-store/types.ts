export type NodeIdType = null | string | number;

export interface INode {
  id: NodeIdType;
  parent: NodeIdType;
  label: string;
}

export type MapNodeType = Map<NodeIdType, INode>;
export type MapChildeNodesType = Map<NodeIdType, INode[]>;

export interface INodeWithPaths extends INode {
  path: string[];
}

export interface ITreeStore {
  getAll(): INode[];
  getItem(nodeId: NodeIdType): INode | undefined;
  getChildren(nodeId: NodeIdType): INode[];
  getAllChildren(nodeId: NodeIdType): INode[];
  getAllParents(nodeId: NodeIdType): INode[];
  addItem(newNode: INode): void;
  removeItem(nodeId: NodeIdType): void;
  updateItem(updatedNode: INode): void;
  setItems(newItems: INode[]): void;
}
