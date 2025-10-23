"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Check, X } from "lucide-react"
import { calculateCommission, getCommissionRate } from "@/lib/calculations"
import type { CommissionRates, SalesRecord } from "@/lib/types"

interface SalesTableProps {
  salesData: SalesRecord[]
  commissionRates: CommissionRates
}

type SortField = "name" | "amount" | "commission"
type SortOrder = "asc" | "desc"

export function SalesTable({ salesData, commissionRates }: SalesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "sold" | "not-sold">("all")
  const [sortField, setSortField] = useState<SortField>("amount")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

  const filteredAndSortedData = useMemo(() => {
    const filtered = salesData.filter((record) => {
      const matchesSearch =
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.productName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "sold" && record.status === "Sold") ||
        (statusFilter === "not-sold" && record.status === "Not Sold")
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let aVal: number, bVal: number

      if (sortField === "name") {
        aVal = a.employeeName.localeCompare(b.employeeName)
        bVal = 0
      } else if (sortField === "amount") {
        aVal = a.saleAmount
        bVal = b.saleAmount
      } else {
        aVal = calculateCommission(a.saleAmount, a.targetCompletion, commissionRates, a.customCommissionRate)
        bVal = calculateCommission(b.saleAmount, b.targetCompletion, commissionRates, b.customCommissionRate)
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal
    })

    return filtered
  }, [salesData, searchTerm, statusFilter, sortField, sortOrder, commissionRates])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Sales Records</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search by employee or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm sm:max-w-xs"
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="text-xs sm:text-sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "sold" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("sold")}
              className="text-xs sm:text-sm"
            >
              Sold
            </Button>
            <Button
              variant={statusFilter === "not-sold" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("not-sold")}
              className="text-xs sm:text-sm"
            >
              Not Sold
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96 -mx-4 sm:mx-0 border border-border rounded-md">
          <table className="w-full text-xs sm:text-sm">
            <thead className="sticky top-0 bg-muted">
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground">Employee</th>
                <th className="text-left py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground hidden sm:table-cell">
                  ID
                </th>
                <th className="text-left py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground hidden md:table-cell">
                  Designation
                </th>
                <th className="text-left py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground hidden lg:table-cell">
                  Product
                </th>
                <th className="text-left py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground">Status</th>
                <th className="text-right py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground">
                  <button
                    onClick={() => toggleSort("amount")}
                    className="flex items-center gap-1 hover:text-primary ml-auto"
                  >
                    Amount
                    <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </th>
                <th className="text-right py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground hidden md:table-cell">
                  Target %
                </th>
                <th className="text-right py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground hidden lg:table-cell">
                  Rate %
                </th>
                <th className="text-right py-2 px-3 sm:py-3 sm:px-4 font-semibold text-foreground">
                  <button
                    onClick={() => toggleSort("commission")}
                    className="flex items-center gap-1 hover:text-primary ml-auto"
                  >
                    Commission
                    <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((record, idx) => {
                const commission = calculateCommission(
                  record.saleAmount,
                  record.targetCompletion,
                  commissionRates,
                  record.customCommissionRate,
                )
                const rate =
                  record.customCommissionRate !== undefined
                    ? record.customCommissionRate
                    : getCommissionRate(record.targetCompletion, commissionRates)
                return (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-foreground font-medium text-xs sm:text-sm">
                      {record.employeeName}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-foreground hidden sm:table-cell text-xs">
                      {record.employeeId}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-foreground hidden md:table-cell text-xs">
                      {record.designation}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-foreground hidden lg:table-cell text-xs">
                      {record.productName}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4">
                      <div className="flex items-center gap-1">
                        {record.status === "Sold" ? (
                          <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <span className="text-green-600 font-medium text-xs">Sold</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            <span className="text-red-600 font-medium text-xs">Not Sold</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-right text-foreground text-xs sm:text-sm">
                      ৳{record.saleAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-right text-foreground hidden md:table-cell text-xs">
                      {record.targetCompletion}%
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-right text-foreground hidden lg:table-cell text-xs">
                      {rate}%
                      {record.customCommissionRate !== undefined && (
                        <span className="text-xs text-primary ml-1">(Custom)</span>
                      )}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-right font-semibold text-foreground text-xs sm:text-sm">
                      ৳{commission.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground">
          Showing {filteredAndSortedData.length} of {salesData.length} records
        </div>
      </CardContent>
    </Card>
  )
}
