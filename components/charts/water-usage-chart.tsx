"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { month: "Jan", usage: 120, efficiency: 65, rainfall: 45 },
  { month: "Feb", usage: 110, efficiency: 68, rainfall: 50 },
  { month: "Mar", usage: 140, efficiency: 70, rainfall: 55 },
  { month: "Apr", usage: 170, efficiency: 72, rainfall: 60 },
  { month: "May", usage: 190, efficiency: 75, rainfall: 65 },
  { month: "Jun", usage: 220, efficiency: 78, rainfall: 40 },
  { month: "Jul", usage: 240, efficiency: 80, rainfall: 35 },
  { month: "Aug", usage: 230, efficiency: 82, rainfall: 30 },
  { month: "Sep", usage: 210, efficiency: 85, rainfall: 45 },
  { month: "Oct", usage: 180, efficiency: 83, rainfall: 55 },
  { month: "Nov", usage: 150, efficiency: 80, rainfall: 60 },
  { month: "Dec", usage: 130, efficiency: 75, rainfall: 50 },
]

export default function WaterUsageChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltip>
                  <div className="font-medium">{label}</div>
                  {payload.map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span>{entry.name}</span>
                      </div>
                      <div>
                        {entry.value}{" "}
                        {entry.name === "Efficiency" ? "%" : entry.name === "Rainfall" ? "mm" : "gal/acre"}
                      </div>
                    </div>
                  ))}
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="usage" fill="#8884d8" name="Water Usage (gal/acre)" />
        <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
        <Bar yAxisId="left" dataKey="rainfall" fill="#ffc658" name="Rainfall (mm)" />
        <ReferenceLine yAxisId="left" y={200} label="Target Usage" stroke="red" strokeDasharray="3 3" />
      </BarChart>
    </ResponsiveContainer>
  )
}
