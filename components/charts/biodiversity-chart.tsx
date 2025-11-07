"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { year: "2018", insects: 45, birds: 28, mammals: 12, plants: 65 },
  { year: "2019", insects: 48, birds: 30, mammals: 13, plants: 68 },
  { year: "2020", insects: 52, birds: 32, mammals: 14, plants: 72 },
  { year: "2021", insects: 58, birds: 35, mammals: 15, plants: 78 },
  { year: "2022", insects: 65, birds: 38, mammals: 17, plants: 85 },
  { year: "2023", insects: 72, birds: 42, mammals: 19, plants: 92 },
  { year: "2024", insects: 78, birds: 45, mammals: 21, plants: 98 },
]

export default function BiodiversityChart() {
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
        <XAxis dataKey="year" />
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
                      <div>{entry.value} species</div>
                    </div>
                  ))}
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Brush dataKey="year" height={30} stroke="#8884d8" />
        <Line type="monotone" dataKey="insects" stroke="#8884d8" name="Beneficial Insects" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="birds" stroke="#82ca9d" name="Bird Species" />
        <Line type="monotone" dataKey="mammals" stroke="#ffc658" name="Mammal Species" />
        <Line type="monotone" dataKey="plants" stroke="#ff8042" name="Plant Species" />
      </LineChart>
    </ResponsiveContainer>
  )
}
