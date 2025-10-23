import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateTotalSales, calculateTotalCommission, calculateAverageCommission } from "@/lib/calculations"
import type { CommissionRates, SalesRecord } from "@/lib/types"

interface SummaryCardsProps {
  salesData: SalesRecord[]
  commissionRates: CommissionRates
}

export function SummaryCards({ salesData, commissionRates }: SummaryCardsProps) {
  const totalSales = calculateTotalSales(salesData)
  const totalCommission = calculateTotalCommission(salesData, commissionRates)
  const avgCommission = calculateAverageCommission(salesData, commissionRates)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-foreground">
            ৳{totalSales.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{salesData.length} sales records</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-foreground">
            ৳{totalCommission.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Across all employees</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Average Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-foreground">
            ৳{avgCommission.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Per employee</p>
        </CardContent>
      </Card>
    </div>
  )
}
