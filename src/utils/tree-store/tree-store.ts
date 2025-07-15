import type { INode, ITreeStore, MapChildeNodesType, MapNodeType, NodeIdType } from "./types";

export default class TreeStore implements ITreeStore {
  private mapNodes: MapNodeType = new Map();
  private mapChildNodes: MapChildeNodesType = new Map();

  constructor(nodeList: INode[]) {
    this.initNode(nodeList);
  }

  private initNode(nodeList: INode[]): void {
    for (const node of nodeList) {
      this.mapNodes.set(node.id, node);

      const childrenNodes = this.mapChildNodes.get(node.parent) ?? [];
      childrenNodes.push(node);
      this.mapChildNodes.set(node.parent, childrenNodes);
    }
  }

  public getAll(): INode[] {
    return Array.from(this.mapNodes.values());
  }

  public getItem(nodeId: NodeIdType): INode | undefined {
    return this.mapNodes.get(nodeId);
  }

  public getChildren(nodeId: NodeIdType): INode[] {
    if (!this.mapNodes.has(nodeId)) {
      throw new Error(`Node with ID=${nodeId} does not exist`);
    }

    return this.mapChildNodes.get(nodeId) ?? [];
  }

  public getAllChildren(nodeId: NodeIdType): INode[] {
    if (!this.mapNodes.has(nodeId)) {
      throw new Error(`Node with ID=${nodeId} does not exist`);
    }

    const allChildren: INode[] = [];
    const stack = [...(this.mapChildNodes.get(nodeId) ?? [])];

    while (stack.length !== 0) {
      const node = stack.pop()!;
      allChildren.push(node);

      const children = this.mapChildNodes.get(node.id);
      if (children && children.length !== 0) {
        stack.push(...children);
      }
    }

    return allChildren;
  }

  public getAllParents(nodeId: NodeIdType): INode[] {
    if (!this.mapNodes.has(nodeId)) {
      throw new Error(`Node with ID=${nodeId} does not exist`);
    }

    const parentNodes: INode[] = [];

    let node = this.getItem(nodeId);

    while (node) {
      parentNodes.push(node);
      if (node.parent === null) break;
      node = this.getItem(node.parent);
    }

    return parentNodes;
  }

  public addItem(newNodeItem: INode): void {
    if (this.mapNodes.has(newNodeItem.id)) {
      throw new Error(`Node with ID=${newNodeItem.id} already exists`);
    }

    this.mapNodes.set(newNodeItem.id, newNodeItem);

    const siblings = this.getChildren(newNodeItem.parent);
    siblings.push(newNodeItem);
    this.mapChildNodes.set(newNodeItem.parent, siblings);
  }

  public removeItem(nodeId: NodeIdType): void {
    const deletedNode = this.getItem(nodeId);
    if (!deletedNode) {
      throw new Error(`Node with ID=${nodeId} does not exist`);
    }

    const toRemoveIds: Set<NodeIdType> = new Set();
    const stack: NodeIdType[] = [nodeId];

    while (stack.length > 0) {
      const currentId = stack.pop()!;
      if (this.mapNodes.has(currentId)) {
        toRemoveIds.add(currentId);

        const children = this.getChildren(currentId);
        for (const child of children) {
          stack.push(child.id);
        }
      }
    }

    for (const id of toRemoveIds) {
      this.mapNodes.delete(id);
      this.mapChildNodes.delete(id);
    }

    const siblings = this.getChildren(deletedNode.parent);
    this.mapChildNodes.set(
      deletedNode.parent,
      siblings.filter(node => node.id !== deletedNode.id),
    );
  }

  public updateItem(updatedNode: INode): void {
    const targetNode = this.mapNodes.get(updatedNode.id);
    if (!targetNode) {
      throw new Error(`Node with ID=${updatedNode.id} does not exist`);
    }

    const isParentChanged = targetNode.parent !== updatedNode.parent;

    this.mapNodes.set(updatedNode.id, updatedNode);

    if (isParentChanged) {
      const oldSiblings = this.getChildren(targetNode.parent);
      this.mapChildNodes.set(
        targetNode.parent,
        oldSiblings.filter(node => node.id !== updatedNode.id),
      );

      const newSiblings = this.getChildren(updatedNode.parent) ?? [];
      newSiblings.push(updatedNode);
      this.mapChildNodes.set(updatedNode.parent, newSiblings);
    } else {
      const siblings = this.getChildren(updatedNode.parent);
      this.mapChildNodes.set(
        updatedNode.parent,
        siblings.map(node => (node.id === updatedNode.id ? updatedNode : node)),
      );
    }
  }

  public setItems(newItems: INode[]): void {
    this.mapChildNodes.clear();
    this.mapNodes.clear();
    this.initNode(newItems);
  }
}
