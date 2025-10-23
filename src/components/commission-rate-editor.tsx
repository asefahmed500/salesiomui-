"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Trash2 } from "lucide-react"
import type { CommissionRates } from "@/lib/types"

interface CommissionRateEditorProps {
  isOpen: boolean
  onClose: () => void
  rates: CommissionRates
  onSave: (rates: CommissionRates) => void
}

export function CommissionRateEditor({ isOpen, onClose, rates, onSave }: CommissionRateEditorProps) {
  const [editedRates, setEditedRates] = useState<CommissionRates>(rates)
  const [newTarget, setNewTarget] = useState<string>("")
  const [newRate, setNewRate] = useState<string>("")

  const handleRateChange = (target: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setEditedRates((prev) => ({
      ...prev,
      [target]: numValue,
    }))
  }

  const handleAddCustomRate = () => {
    const target = Number.parseInt(newTarget)
    const rate = Number.parseFloat(newRate)

    if (!isNaN(target) && !isNaN(rate) && target > 0 && rate >= 0) {
      setEditedRates((prev) => ({
        ...prev,
        [target]: rate,
      }))
      setNewTarget("")
      setNewRate("")
    }
  }

  const handleDeleteRate = (target: number) => {
    setEditedRates((prev) => {
      const updated = { ...prev }
      delete updated[target]
      return updated
    })
  }

  const handleSave = () => {
    onSave(editedRates)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sticky top-0 bg-background border-b">
          <CardTitle className="text-lg sm:text-xl">Edit Commission Rates</CardTitle>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6 py-6">
          {/* Existing Rates */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Current Rates</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto p-1">
              {Object.entries(editedRates)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([target, rate]) => (
                  <div key={target} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-muted rounded-lg border">
                    <label className="w-full sm:w-32 text-sm font-medium text-foreground">
                      {target}% Target:
                    </label>
                    <div className="flex items-center gap-2 flex-1 w-full">
                      <Input
                        type="number"
                        value={rate}
                        onChange={(e) => handleRateChange(Number.parseInt(target), e.target.value)}
                        className="flex-1"
                        step="0.1"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRate(Number.parseInt(target))}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        aria-label={`Delete ${target}% rate`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Add Custom Rate */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Add Custom Rate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Target %</label>
                <Input
                  type="number"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g., 130"
                  min="0"
                  step="1"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Commission %</label>
                <Input
                  type="number"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  placeholder="e.g., 6"
                  min="0"
                  step="0.1"
                  className="w-full"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleAddCustomRate} 
                  className="w-full gap-2"
                  disabled={!newTarget || !newRate}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden xs:inline">Add Rate</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md text-sm text-muted-foreground space-y-3 border">
            <p className="font-semibold text-foreground">Commission Structure</p>
            <ul className="space-y-2">
              {Object.entries(editedRates)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([target, rate]) => (
                  <li key={target} className="flex items-center justify-between">
                    <span className="text-foreground">{target}% target</span>
                    <span className="font-medium text-primary">{rate}% commission</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full sm:w-1/2 bg-transparent"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-1/2"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}