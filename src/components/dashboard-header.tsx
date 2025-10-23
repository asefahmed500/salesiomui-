"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

interface DashboardHeaderProps {
  onEditRates: () => void
}

export function DashboardHeader({ onEditRates }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sales Commission Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Track employee sales and commission earnings</p>
        </div>
        <Button 
          onClick={onEditRates} 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-transparent w-full sm:w-auto"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm sm:text-base">Edit Rates</span>
        </Button>
      </div>
    </header>
  )
}