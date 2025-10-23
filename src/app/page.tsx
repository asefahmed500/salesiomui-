"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SummaryCards } from "@/components/summary-cards"
import { SalesTable } from "@/components/sales-table"
import { CommissionCharts } from "@/components/commission-charts"
import { CommissionRateEditor } from "@/components/commission-rate-editor"
import { CommissionCalculator } from "@/components/commission-calculator"
import { AddSalesRecord } from "@/components/add-sales-record"
import { generateFakeSalesData } from "@/lib/fake-data"
import type { CommissionRates, SalesRecord } from "@/lib/types"

export default function Home() {
  const [salesData, setSalesData] = useState<SalesRecord[]>(generateFakeSalesData())
  const [commissionRates, setCommissionRates] = useState<CommissionRates>({
    80: 1,
    90: 2,
    100: 3,
    110: 4,
    120: 5,
  })
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const handleAddRecord = (record: SalesRecord) => {
    setSalesData([...salesData, record])
  }

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader onEditRates={() => setIsEditorOpen(true)} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        <SummaryCards salesData={salesData} commissionRates={commissionRates} />

        <div className="flex justify-center">
          <AddSalesRecord onAddRecord={handleAddRecord} commissionRates={commissionRates} />
        </div>

        <div>
          <SalesTable salesData={salesData} commissionRates={commissionRates} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <CommissionCalculator commissionRates={commissionRates} />
          <CommissionCharts salesData={salesData} commissionRates={commissionRates} />
        </div>
      </div>

      <CommissionRateEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        rates={commissionRates}
        onSave={setCommissionRates}
      />
    </main>
  )
}