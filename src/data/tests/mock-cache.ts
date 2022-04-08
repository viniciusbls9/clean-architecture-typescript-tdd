import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases } from "@/domain/usercases"

export class CacheStoreSpy implements CacheStore {
  actions: CacheStoreSpy.Action[] = []
  deleteKey: string
  insertKey: string
  insertValues: SavePurchases.Params[] = []

  delete (key: string): void {
    this.actions.push(CacheStoreSpy.Action.delete)
    this.deleteKey = key
  }

  insert (insertKey: string, value: any): void {
    this.actions.push(CacheStoreSpy.Action.insert)
    this.insertKey = insertKey
    this.insertValues = value
  }

  simulateDeleteError (): void {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete)
      throw new Error()
    })
  }

  simulateInsertError (): void {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert)
      throw new Error()
    })
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert
  }
}
