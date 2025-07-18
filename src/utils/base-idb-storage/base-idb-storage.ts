import { openDB, type IDBPDatabase } from "idb";

import type { IBaseIDBStorageOptions } from "./types";

export default class BaseIDBStorage<T> {
  private dbName: string;
  private storeName: string;
  private dbVersion: number;
  private keyPath: keyof T;

  private dbPromise: Promise<IDBPDatabase<unknown>>;

  constructor(options: IBaseIDBStorageOptions<T>) {
    this.dbName = options.dbName;
    this.storeName = options.storeName;
    this.dbVersion = options.dbVersion;
    this.keyPath = options.keyPath;

    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase<unknown>> {
    return openDB(this.dbName, this.dbVersion, {
      upgrade: db => {
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: this.keyPath as string });
        }
      },
    });
  }

  async getAll(): Promise<T[]> {
    const db = await this.dbPromise;
    return db.getAll(this.storeName);
  }

  async save(data: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(this.storeName, data);
  }

  async delete(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(this.storeName, key);
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear(this.storeName);
  }
}
