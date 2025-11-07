"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { name: "Water Use", score: 78, target: 85 },
  { name: "Soil Health", score: 82, target: 90 },
  { name: "Biodiversity", score: 65, target: 75 },
  { name: "Carbon", score: 71, target: 80 },
  { name: "Pesticide", score: 88, target: 90 },
]

export default function SustainabilityScoreChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
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
                      <div>{entry.value}</div>
                    </div>
                  ))}
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="score" fill="#4CAF50" name="Current Score" />
        <Bar dataKey="target" fill="#8BC34A" name="Target Score" />
      </BarChart>
    </ResponsiveContainer>
  )
}
