export interface SalesRecord {
  employeeId: string
  employeeName: string
  designation: string
  productName: string
  saleAmount: number
  targetCompletion: number
  status: "Sold" | "Not Sold"
  customCommissionRate?: number
}

export type CommissionRates = Record<number, number>
