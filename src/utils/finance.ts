import { DataArray } from '../types/data'

export const calculateNetWorth = (assets: DataArray, liabilities: DataArray): number => {
  let netWorth = 0
  assets.forEach((asset) => {
    netWorth += asset.amount
  })
  liabilities.forEach((liability) => {
    netWorth -= liability.amount
  })
  return netWorth
}
