"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// Data represents soil samples with sand, silt, and clay percentages
// Size represents the sample size
const data = [
  { name: "Sample 1", sand: 40, silt: 40, clay: 20, size: 100 },
  { name: "Sample 2", sand: 30, silt: 50, clay: 20, size: 120 },
  { name: "Sample 3", sand: 20, silt: 60, clay: 20, size: 150 },
  { name: "Sample 4", sand: 50, silt: 30, clay: 20, size: 80 },
  { name: "Sample 5", sand: 60, silt: 20, clay: 20, size: 90 },
  { name: "Sample 6", sand: 35, silt: 35, clay: 30, size: 110 },
  { name: "Sample 7", sand: 25, silt: 45, clay: 30, size: 130 },
  { name: "Sample 8", sand: 45, silt: 25, clay: 30, size: 100 },
  { name: "Sample 9", sand: 33, silt: 33, clay: 34, size: 140 },
  { name: "Sample 10", sand: 20, silt: 30, clay: 50, size: 120 },
]

export default function SoilTextureChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid opacity={0.3} />
        <XAxis
          type="number"
          dataKey="sand"
          name="Sand"
          unit="%"
          domain={[0, 100]}
          label={{ value: "Sand %", position: "bottom" }}
        />
        <YAxis
          type="number"
          dataKey="clay"
          name="Clay"
          unit="%"
          domain={[0, 100]}
          label={{ value: "Clay %", angle: -90, position: "left" }}
        />
        <ZAxis type="number" dataKey="size" range={[60, 400]} name="Sample Size" unit="g" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <ChartTooltip>
                  <div className="font-medium">{data.name}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>Sand:</span>
                    <span className="font-medium">{data.sand}%</span>
                    <span>Silt:</span>
                    <span className="font-medium">{data.silt}%</span>
                    <span>Clay:</span>
                    <span className="font-medium">{data.clay}%</span>
                    <span>Sample Size:</span>
                    <span className="font-medium">{data.size}g</span>
                  </div>
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Scatter name="Soil Samples" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
