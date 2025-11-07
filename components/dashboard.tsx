"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Droplets, Leaf, Thermometer, Wind } from "lucide-react"
import SoilCompositionChart from "./charts/soil-composition-chart"
import SoilHealthChart from "./charts/soil-health-chart"
import SustainabilityScoreChart from "./charts/sustainability-score-chart"
import AiInsightsPanel from "./ai-insights-panel"
import { useRef } from "react"

export default function Dashboard() {
  const aiInsightsPanelRef = useRef(null)

  const handleGenerateInsights = () => {
    // Call the generateNewInsights function in the AiInsightsPanel component
    if (aiInsightsPanelRef.current && aiInsightsPanelRef.current.generateNewInsights) {
      aiInsightsPanelRef.current.generateNewInsights()
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Soil pH Level</CardDescription>
            <CardTitle className="text-2xl flex items-center justify-between">
              6.8
              <Droplets className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +0.2
              </span>
              <span className="ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Organic Matter</CardDescription>
            <CardTitle className="text-2xl flex items-center justify-between">
              4.2%
              <Leaf className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +0.5%
              </span>
              <span className="ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Soil Temperature</CardDescription>
            <CardTitle className="text-2xl flex items-center justify-between">
              18.3°C
              <Thermometer className="h-5 w-5 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +1.2°C
              </span>
              <span className="ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Moisture Content</CardDescription>
            <CardTitle className="text-2xl flex items-center justify-between">
              28%
              <Wind className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> -3%
              </span>
              <span className="ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Soil Health Metrics</CardTitle>
            <CardDescription>Tracking key soil health indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SoilHealthChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil Composition</CardTitle>
            <CardDescription>Breakdown of soil components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SoilCompositionChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Score</CardTitle>
            <CardDescription>Overall sustainability rating based on multiple factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SustainabilityScoreChart />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Generative AI analysis of your soil data</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AiInsightsPanel ref={aiInsightsPanelRef} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
