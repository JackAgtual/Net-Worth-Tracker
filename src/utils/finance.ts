import { Data } from '../types/data'

export const calculateNetWorth = (assets: Data[], liabilities: Data[]): number => {
  let netWorth = 0
  assets.forEach((asset) => {
    netWorth += asset.amount
  })
  liabilities.forEach((liability) => {
    netWorth -= liability.amount
  })
  return netWorth
}
