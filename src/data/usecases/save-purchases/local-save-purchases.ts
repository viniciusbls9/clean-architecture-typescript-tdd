import { CacheStore } from '@/data/protocols/cache'
import { SavePurchases } from '@/domain/usercases'

export class LocalSavePurchase implements SavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save (purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.delete('purchases')
    this.cacheStore.insert('purchases', purchases)
  }
}
