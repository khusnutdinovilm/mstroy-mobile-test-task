import { beforeEach, describe, expect, it } from "vitest";

import TreeStore from "./tree-store";

const nodeList = [
  { id: 1, parent: null, label: "Айтем 1" },
  { id: "2", parent: 1, label: "Айтем 2" },
  { id: 3, parent: 1, label: "Айтем 3" },
  { id: 4, parent: "2", label: "Айтем 4" },
  { id: 5, parent: "2", label: "Айтем 5" },
  { id: 6, parent: "2", label: "Айтем 6" },
  { id: 7, parent: 4, label: "Айтем 7" },
  { id: 8, parent: 4, label: "Айтем 8" },
];

const newNodeList = [
  { id: 10, parent: null, label: "Айтем 10" },
  { id: 11, parent: 10, label: "Айтем 11" },
  { id: "12", parent: 10, label: "Айтем 12" },
  { id: 13, parent: 11, label: "Айтем 13" },
  { id: 14, parent: 11, label: "Айтем 14" },
];

describe("TreeStore tests", () => {
  let treeStore: TreeStore;

  beforeEach(() => {
    treeStore = new TreeStore(nodeList);
  });

  it("getAll() should return the initial items", () => {
    const allNodes = treeStore.getAll();

    expect(allNodes).toHaveLength(nodeList.length);
    expect(allNodes).toEqual(nodeList);
  });

  it("getItem() should return the correct item by ID", () => {
    expect(treeStore.getItem(1)).toEqual({ id: 1, parent: null, label: "Айтем 1" });
    expect(treeStore.getItem("2")).toEqual({ id: "2", parent: 1, label: "Айтем 2" });
    expect(treeStore.getItem(2)).toBeUndefined();
  });

  it("getChildren() should return direct children only", () => {
    expect(() => treeStore.getChildren(10)).toThrowError(`does not exist`);

    expect(treeStore.getChildren("2").map(node => node.id)).toEqual([4, 5, 6]);
    expect(treeStore.getChildren(3).map(node => node.id)).toHaveLength(0);
  });

  it("getAllChildren() should return all nested children", () => {
    expect(() => treeStore.getAllChildren(10)).toThrowError(`does not exist`);

    const allChildren = treeStore.getAllChildren("2");
    const ids = allChildren.map(node => node.id).sort();
    expect(ids).toEqual([4, 5, 6, 7, 8].sort());
  });

  it("getAllParents() should return parents chain up to root", () => {
    expect(() => treeStore.getAllParents(10)).toThrowError(`does not exist`);

    const allParents = treeStore.getAllParents(8);
    const ids = allParents.map(node => node.id);
    expect(ids).toEqual([8, 4, "2", 1]);
  });

  it("addItem() should add a new node", () => {
    expect(() => treeStore.addItem({ id: 4, parent: 3, label: "Айтем 9" })).toThrowError(
      "already exists",
    );

    treeStore.addItem({ id: 9, parent: 3, label: "Айтем 9" });

    expect(treeStore.getItem(9)).toBeDefined();
    expect(treeStore.getChildren(3).map(node => node.id)).toContain(9);
  });

  it("removeItem() should remove node and its descendants", () => {
    expect(() => treeStore.removeItem(100)).toThrowError("does not exist");

    treeStore.removeItem(4);

    expect(treeStore.getItem(4)).toBeUndefined();
    expect(treeStore.getItem(7)).toBeUndefined();
    expect(treeStore.getItem(8)).toBeUndefined();

    expect(treeStore.getChildren("2").map(node => node.id)).not.toContain(4);
  });

  it("updateItem() should update existing node", () => {
    expect(() =>
      treeStore.updateItem({ id: 90, parent: 10, label: "Какой-то текст" }),
    ).toThrowError(`does not exist`);

    treeStore.updateItem({ id: 6, parent: 3, label: "Обновленный айтем 6" });

    const updateItem = treeStore.getItem(6);

    expect(updateItem?.parent).toBe(3);
    expect(updateItem?.label).toBe("Обновленный айтем 6");

    expect(treeStore.getChildren(3).map(node => node.id)).toContain(6);
    expect(treeStore.getChildren("2").map(node => node.id)).not.toContain(6);
  });

  it("setItems() should replace all data", () => {
    treeStore.setItems(newNodeList);

    expect(treeStore.getAll()).toHaveLength(5);
    expect(treeStore.getAll()).toEqual(newNodeList);
  });
});
