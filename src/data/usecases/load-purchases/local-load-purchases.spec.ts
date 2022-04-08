import { LocalLoadSavePurchase } from '@/data/usecases'
import { CacheStoreSpy } from '@/data/tests'

type SutTypes = {
  sut: LocalLoadSavePurchase
  cacheStore: CacheStoreSpy
}

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy()
  const sut = new LocalLoadSavePurchase(cacheStore, timestamp)

  return { sut, cacheStore }
}

describe('LocalSavePurchases', () => {
  test('Should not delete or insert cache on sut.init', () => {
    const { cacheStore } = makeSut()
    expect(cacheStore.actions).toEqual([])
  })
})
