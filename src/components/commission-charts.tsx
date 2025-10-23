"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { calculateCommission } from "@/lib/calculations"
import type { CommissionRates, SalesRecord } from "@/lib/types"

interface CommissionChartsProps {
  salesData: SalesRecord[]
  commissionRates: CommissionRates
}

export function CommissionCharts({ salesData, commissionRates }: CommissionChartsProps) {
  const targetDistribution = [
    { name: "80%", count: salesData.filter((r) => r.targetCompletion >= 80 && r.targetCompletion < 90).length },
    { name: "90%", count: salesData.filter((r) => r.targetCompletion >= 90 && r.targetCompletion < 100).length },
    { name: "100%", count: salesData.filter((r) => r.targetCompletion >= 100 && r.targetCompletion < 110).length },
    { name: "110%+", count: salesData.filter((r) => r.targetCompletion >= 110).length },
  ]

  const employeeCommissions = Array.from(
    salesData.reduce((acc, record) => {
      const commission = calculateCommission(record.saleAmount, record.targetCompletion, commissionRates)
      const existing = acc.get(record.employeeName) || { name: record.employeeName, commission: 0 }
      existing.commission += commission
      acc.set(record.employeeName, existing)
      return acc
    }, new Map<string, { name: string; commission: number }>()),
  ).map(([, data]) => data)

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Target Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={targetDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || 'Unknown'}: ${Math.round(percent || 0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Top Earners</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={employeeCommissions.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0} 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `৳${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: number) => [`৳${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 'Commission']}
                labelFormatter={(value) => `Employee: ${value}`}
              />
              <Bar dataKey="commission" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}