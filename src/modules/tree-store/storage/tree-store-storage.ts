import BaseIDBStorage from "src/utils/base-idb-storage";

import type { INode } from "src/modules/tree-store/utils/tree-store/types";

const treeStoreStorage = new BaseIDBStorage<{
  name: string;
  data: INode[];
}>({
  dbName: "tree-store-db",
  storeName: "tree-store",
  dbVersion: 1,
  keyPath: "name",
});

export default treeStoreStorage;
