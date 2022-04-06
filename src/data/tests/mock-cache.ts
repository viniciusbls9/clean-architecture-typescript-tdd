import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases } from "@/domain/usercases"

export class CacheStoreSpy implements CacheStore {
  messages: CacheStoreSpy.Message[] = []
  deleteKey: string
  insertKey: string
  insertValues: SavePurchases.Params[] = []

  delete (key: string): void {
    this.messages.push(CacheStoreSpy.Message.delete)
    this.deleteKey = key
  }

  insert (insertKey: string, value: any): void {
    this.messages.push(CacheStoreSpy.Message.insert)
    this.insertKey = insertKey
    this.insertValues = value
  }

  simulateDeleteError (): void {
    jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.delete)
      throw new Error()
    })
  }

  simulateInsertError (): void {
    jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.insert)
      throw new Error()
    })
  }
}

export namespace CacheStoreSpy {
  export enum Message {
    delete,
    insert
  }
}
