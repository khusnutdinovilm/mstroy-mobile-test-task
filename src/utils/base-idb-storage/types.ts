export interface IBaseIDBStorageOptions<T> {
  dbName: string;
  storeName: string;
  dbVersion: number;
  keyPath: keyof T;
}
