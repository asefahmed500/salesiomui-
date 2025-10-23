import type { SalesRecord } from "./types"

const firstNames = ["John", "Sarah", "Michael", "Emily", "David", "Jessica", "Robert", "Amanda"]
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]
const products = [
  "Premium Package",
  "Standard Plan",
  "Enterprise Suite",
  "Starter Bundle",
  "Professional Tier",
  "Elite Package",
]
const designations = ["Sales Executive", "Account Manager", "Sales Representative", "Senior Sales Manager"]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateFakeSalesData(): SalesRecord[] {
  const records: SalesRecord[] = []
  const employeeCount = 8

  for (let i = 0; i < employeeCount; i++) {
    const firstName = getRandomElement(firstNames)
    const lastName = getRandomElement(lastNames)
    const employeeName = `${firstName} ${lastName}`
    const employeeId = `EMP${String(i + 1).padStart(4, "0")}`

    // Generate 3-5 sales records per employee
    const salesCount = getRandomNumber(3, 5)
    for (let j = 0; j < salesCount; j++) {
      records.push({
        employeeId,
        employeeName,
        designation: getRandomElement(designations),
        productName: getRandomElement(products),
        saleAmount: getRandomNumber(5000, 50000),
        targetCompletion: getRandomNumber(75, 125),
        status: Math.random() > 0.2 ? "Sold" : "Not Sold",
      })
    }
  }

  return records
}
