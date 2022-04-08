import { CacheStore } from '@/data/protocols/cache'
import { SavePurchases } from '@/domain/usercases'

export class LocalLoadSavePurchase implements SavePurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date
  ) {}

  async save (purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.replace('purchases', {
      timestamp: this.timestamp,
      value: purchases
    })
  }
}
