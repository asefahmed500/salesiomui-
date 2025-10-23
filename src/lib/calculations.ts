import type { CommissionRates, SalesRecord } from "./types"

export function getCommissionRate(targetCompletion: number, rates: CommissionRates): number {
  const sortedTargets = Object.keys(rates)
    .map(Number)
    .sort((a, b) => b - a)

  for (const target of sortedTargets) {
    if (targetCompletion >= target) {
      return rates[target]
    }
  }

  return 0
}

export function calculateCommission(
  saleAmount: number,
  targetCompletion: number,
  rates: CommissionRates,
  customRate?: number,
): number {
  const rate = customRate !== undefined ? customRate : getCommissionRate(targetCompletion, rates)
  return Math.round(((saleAmount * rate) / 100) * 100) / 100
}

export function calculateTotalSales(salesData: SalesRecord[]): number {
  return salesData.reduce((sum, record) => sum + record.saleAmount, 0)
}

export function calculateTotalCommission(salesData: SalesRecord[], rates: CommissionRates): number {
  return salesData.reduce((sum, record) => {
    return sum + calculateCommission(record.saleAmount, record.targetCompletion, rates)
  }, 0)
}

export function calculateAverageCommission(salesData: SalesRecord[], rates: CommissionRates): number {
  if (salesData.length === 0) return 0
  return calculateTotalCommission(salesData, rates) / salesData.length
}
