import BaseIDBStorage from "src/utils/base-idb-storage";

import type { IDatasetMeta } from "src/modules/dataset/types/dataset";

const datasetMetaStorage = new BaseIDBStorage<IDatasetMeta>({
  dbName: "dataset-meta-db",
  storeName: "dataset-meta",
  dbVersion: 1,
  keyPath: "name",
});

export default datasetMetaStorage;
