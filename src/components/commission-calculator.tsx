"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { calculateCommission } from "@/lib/calculations"
import type { CommissionRates } from "@/lib/types"

interface CommissionCalculatorProps {
  commissionRates: CommissionRates
}

export function CommissionCalculator({ commissionRates }: CommissionCalculatorProps) {
  const [saleAmount, setSaleAmount] = useState<number>(1000)
  const [targetCompletion, setTargetCompletion] = useState<number>(100)

  const commission = calculateCommission(saleAmount, targetCompletion, commissionRates)
  const commissionRate =
    Object.entries(commissionRates)
      .sort(([a], [b]) => Number(b) - Number(a))
      .find(([target]) => targetCompletion >= Number(target))?.[1] || 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Commission Calculator</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Calculate commission based on sale amount and target completion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sale Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="sale-amount" className="text-sm font-medium">
            Sale Amount (TK)
          </Label>
          <Input
            id="sale-amount"
            type="number"
            min="0"
            step="100"
            value={saleAmount}
            onChange={(e) => setSaleAmount(Number(e.target.value) || 0)}
            className="text-base sm:text-lg"
            placeholder="Enter sale amount"
          />
          <p className="text-xs text-muted-foreground">Enter the total sale amount in Taka</p>
        </div>

        {/* Target Completion Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="target-completion" className="text-sm font-medium">
              Target Completion (%)
            </Label>
            <span className="text-lg font-semibold text-primary">{targetCompletion}%</span>
          </div>
          <Slider
            id="target-completion"
            min={0}
            max={150}
            step={5}
            value={[targetCompletion]}
            onValueChange={(value) => setTargetCompletion(value[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Drag to adjust target completion percentage</p>
        </div>

        {/* Commission Rate Display */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Commission Rate:</span>
            <span className="text-lg font-semibold text-primary">{commissionRate}%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {targetCompletion < 80
              ? "Below 80% target - No commission"
              : `${targetCompletion}% completion qualifies for ${commissionRate}% commission`}
          </div>
        </div>

        {/* Commission Result */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-1">
          <p className="text-sm text-muted-foreground">Total Commission</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">৳{commission.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">
            {saleAmount > 0 ? `${((commission / saleAmount) * 100).toFixed(2)}% of sale amount` : "Enter a sale amount"}
          </p>
        </div>

        {/* Commission Breakdown */}
        <div className="border rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium">Commission Breakdown</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sale Amount:</span>
              <span className="font-medium">৳{saleAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commission Rate:</span>
              <span className="font-medium">{commissionRate}%</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
              <span>Commission Earned:</span>
              <span className="text-primary">৳{commission.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
