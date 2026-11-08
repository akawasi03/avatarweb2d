export class RecordStore {
  private static stores = new Map<string, Map<number, Uint8Array>>();

  private constructor(private name: string, private records: Map<number, Uint8Array>) {}

  public static openRecordStore(recordStoreName: string, createIfNecessary = true): RecordStore {
    let store = this.stores.get(recordStoreName);
    if (!store) {
      if (!createIfNecessary) {
        throw new Error(`RecordStoreNotFoundException: ${recordStoreName}`);
      }
      store = new Map<number, Uint8Array>();
      this.stores.set(recordStoreName, store);

      // Check localStorage if available in browser
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const raw = window.localStorage.getItem(`rms_${recordStoreName}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            for (const [k, v] of Object.entries(parsed)) {
              store.set(parseInt(k, 10), new Uint8Array(v as number[]));
            }
          }
        } catch (_) {}
      }
    }
    return new RecordStore(recordStoreName, store);
  }

  public getNumRecords(): number {
    return this.records.size;
  }

  public getRecord(recordId: number): Uint8Array {
    const data = this.records.get(recordId);
    if (!data) {
      throw new Error(`InvalidRecordIDException: id=${recordId} in ${this.name}`);
    }
    return data;
  }

  public addRecord(data: Uint8Array, offset = 0, numBytes = data.length): number {
    const nextId = this.records.size + 1;
    const slice = data.slice(offset, offset + numBytes);
    this.records.set(nextId, slice);
    this.persist();
    return nextId;
  }

  public setRecord(recordId: number, data: Uint8Array, offset = 0, numBytes = data.length): void {
    const slice = data.slice(offset, offset + numBytes);
    this.records.set(recordId, slice);
    this.persist();
  }

  private persist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const obj: Record<string, number[]> = {};
        for (const [k, v] of this.records.entries()) {
          obj[k] = Array.from(v);
        }
        window.localStorage.setItem(`rms_${this.name}`, JSON.stringify(obj));
      } catch (_) {}
    }
  }

  public closeRecordStore(): void {}
}
