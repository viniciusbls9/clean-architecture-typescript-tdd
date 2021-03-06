import { CachePolicy, CacheStore } from '@/data/protocols/cache'
import { SavePurchases, LoadPurchases } from '@/domain/usercases'

export class LocalLoadSavePurchase implements SavePurchases, LoadPurchases {
  private readonly key = 'purchases'
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly currentDate: Date
  ) { }

  async save(purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.currentDate,
      value: purchases
    })
  }

  async loadAll(): Promise<LoadPurchases.Result[]> {
    try {
      const cache = this.cacheStore.fetch(this.key)
      if (CachePolicy.validate(cache.timestamp, this.currentDate)) {
        return cache.value
      } else {
        throw new Error()
      }
    } catch (error) {
      this.cacheStore.delete(this.key)
      return []
    }
  }
}
