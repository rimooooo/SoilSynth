import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Filter, RefreshCw } from "lucide-react"
import Dashboard from "@/components/dashboard"
import SoilAnalysis from "@/components/soil-analysis"
import PredictiveInsights from "@/components/predictive-insights"
import SustainabilityMetrics from "@/components/sustainability-metrics"
import DataView from "@/components/data-view"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-green-50 dark:bg-green-950 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-300">
                SoilSynth
              </h1>
              <p className="text-green-700 dark:text-green-400 mt-1">AI-powered insights for sustainable agriculture</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="soil-analysis">Soil Analysis</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Insights</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability Metrics</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="soil-analysis">
            <SoilAnalysis />
          </TabsContent>

          <TabsContent value="predictive">
            <PredictiveInsights />
          </TabsContent>

          <TabsContent value="sustainability">
            <SustainabilityMetrics />
          </TabsContent>

          <TabsContent value="data">
            <DataView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
