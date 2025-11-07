"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { month: "Jan", pH: 6.2, organicMatter: 3.2, nitrogen: 2.1, phosphorus: 1.8 },
  { month: "Feb", pH: 6.3, organicMatter: 3.3, nitrogen: 2.2, phosphorus: 1.9 },
  { month: "Mar", pH: 6.4, organicMatter: 3.5, nitrogen: 2.3, phosphorus: 2.0 },
  { month: "Apr", pH: 6.5, organicMatter: 3.7, nitrogen: 2.5, phosphorus: 2.1 },
  { month: "May", pH: 6.6, organicMatter: 3.8, nitrogen: 2.6, phosphorus: 2.2 },
  { month: "Jun", pH: 6.7, organicMatter: 3.9, nitrogen: 2.7, phosphorus: 2.3 },
  { month: "Jul", pH: 6.8, organicMatter: 4.0, nitrogen: 2.8, phosphorus: 2.4 },
  { month: "Aug", pH: 6.8, organicMatter: 4.1, nitrogen: 2.9, phosphorus: 2.5 },
  { month: "Sep", pH: 6.7, organicMatter: 4.2, nitrogen: 2.8, phosphorus: 2.4 },
  { month: "Oct", pH: 6.8, organicMatter: 4.2, nitrogen: 2.7, phosphorus: 2.3 },
  { month: "Nov", pH: 6.8, organicMatter: 4.2, nitrogen: 2.6, phosphorus: 2.2 },
  { month: "Dec", pH: 6.8, organicMatter: 4.2, nitrogen: 2.5, phosphorus: 2.1 },
]

export default function SoilHealthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" />
        <YAxis />
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
        <Line type="monotone" dataKey="pH" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="organicMatter" stroke="#82ca9d" />
        <Line type="monotone" dataKey="nitrogen" stroke="#ffc658" />
        <Line type="monotone" dataKey="phosphorus" stroke="#ff8042" />
      </LineChart>
    </ResponsiveContainer>
  )
}
