import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SustainabilityRadarChart from "./charts/sustainability-radar-chart"
import WaterUsageChart from "./charts/water-usage-chart"
import BiodiversityChart from "./charts/biodiversity-chart"

export default function SustainabilityMetrics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Sustainability Metrics</h2>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sustainability Overview</CardTitle>
          <CardDescription>Comprehensive view of sustainability metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <SustainabilityRadarChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Water Usage Efficiency</CardTitle>
            <CardDescription>Water consumption relative to crop yield</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <WaterUsageChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biodiversity Index</CardTitle>
            <CardDescription>Tracking biodiversity in and around agricultural land</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BiodiversityChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
