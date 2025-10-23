"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { calculateCommission, getCommissionRate } from "@/lib/calculations"
import type { CommissionRates, SalesRecord } from "@/lib/types"

interface AddSalesRecordProps {
  onAddRecord: (record: SalesRecord) => void
  commissionRates: CommissionRates
}

export function AddSalesRecord({ onAddRecord, commissionRates }: AddSalesRecordProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [employeeName, setEmployeeName] = useState("")
  const [productName, setProductName] = useState("")
  const [saleAmount, setSaleAmount] = useState("")
  const [targetCompletion, setTargetCompletion] = useState("100")
  const [useCustomRate, setUseCustomRate] = useState(false)
  const [customRate, setCustomRate] = useState("")
  const [status, setStatus] = useState<"Sold" | "Not Sold">("Sold")
  const [previewCommission, setPreviewCommission] = useState(0)

  const handleAmountChange = (value: string) => {
    setSaleAmount(value)
    updatePreview(value, targetCompletion)
  }

  const handleTargetChange = (value: string) => {
    setTargetCompletion(value)
    updatePreview(saleAmount, value)
  }

  const updatePreview = (amount: string, target: string) => {
    if (amount && target) {
      const numAmount = Number.parseFloat(amount)
      const numTarget = Number.parseFloat(target)
      if (useCustomRate && customRate) {
        const rate = Number.parseFloat(customRate)
        setPreviewCommission((numAmount * rate) / 100)
      } else {
        setPreviewCommission(calculateCommission(numAmount, numTarget, commissionRates))
      }
    }
  }

  const handleCustomRateChange = (value: string) => {
    setCustomRate(value)
    if (saleAmount && value) {
      const numAmount = Number.parseFloat(saleAmount)
      const rate = Number.parseFloat(value)
      setPreviewCommission((numAmount * rate) / 100)
    }
  }

  const handleAddRecord = () => {
    if (!employeeName || !productName || !saleAmount || !targetCompletion) {
      alert("Please fill in all required fields")
      return
    }

    const newRecord: SalesRecord = {
      employeeId: `EMP${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      employeeName,
      designation: "Sales Representative",
      productName,
      saleAmount: Number.parseFloat(saleAmount),
      targetCompletion: Number.parseFloat(targetCompletion),
      status,
      customCommissionRate: useCustomRate ? Number.parseFloat(customRate) : undefined,
    }

    onAddRecord(newRecord)
    resetForm()
    setIsOpen(false)
  }

  const resetForm = () => {
    setEmployeeName("")
    setProductName("")
    setSaleAmount("")
    setTargetCompletion("100")
    setUseCustomRate(false)
    setCustomRate("")
    setStatus("Sold")
    setPreviewCommission(0)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full sm:w-auto gap-2">
        <Plus className="w-4 h-4" />
        Add Sales Record
      </Button>
    )
  }

  return (
    <Card className="border-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg sm:text-xl">Add New Sales Record</CardTitle>
        <button
          onClick={() => {
            setIsOpen(false)
            resetForm()
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Employee Name *</label>
            <Input
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Product Name *</label>
            <Input
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sale Amount (৳) *</label>
            <Input
              type="number"
              placeholder="Enter sale amount"
              value={saleAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Target Completion (%) *</label>
            <Input
              type="number"
              placeholder="Enter target completion"
              value={targetCompletion}
              onChange={(e) => handleTargetChange(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Sold" | "Not Sold")}
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
            >
              <option value="Sold">Sold</option>
              <option value="Not Sold">Not Sold</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Commission Rate (%)
              <span className="text-xs text-muted-foreground ml-1">{useCustomRate ? "(Custom)" : "(Auto)"}</span>
            </label>
            {useCustomRate ? (
              <Input
                type="number"
                placeholder="Enter custom rate"
                value={customRate}
                onChange={(e) => handleCustomRateChange(e.target.value)}
                step="0.1"
                className="text-sm"
              />
            ) : (
              <div className="px-3 py-2 border border-input rounded-md text-sm bg-muted text-foreground">
                {targetCompletion ? getCommissionRate(Number.parseFloat(targetCompletion), commissionRates) : 0}%
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="customRate"
            checked={useCustomRate}
            onChange={(e) => {
              setUseCustomRate(e.target.checked)
              if (!e.target.checked) {
                setCustomRate("")
                updatePreview(saleAmount, targetCompletion)
              }
            }}
            className="w-4 h-4 rounded border-input"
          />
          <label htmlFor="customRate" className="text-sm font-medium text-foreground cursor-pointer">
            Use Custom Commission Rate
          </label>
        </div>

        {saleAmount && (
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sale Amount:</span>
              <span className="font-semibold text-foreground">
                ৳{Number.parseFloat(saleAmount).toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Commission Rate:</span>
              <span className="font-semibold text-foreground">
                {useCustomRate ? customRate : getCommissionRate(Number.parseFloat(targetCompletion), commissionRates)}%
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Estimated Commission:</span>
              <span className="font-bold text-primary">
                ৳{previewCommission.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button onClick={handleAddRecord} className="flex-1">
            Add Record
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false)
              resetForm()
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
