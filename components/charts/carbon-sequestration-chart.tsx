"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { useMemo } from "react"

// Generate random variation within a percentage range
const randomVariation = (value, percentage = 5) => {
  const variation = (Math.random() * 2 - 1) * ((value * percentage) / 100)
  return value + variation
}

export default function CarbonSequestrationChart({ carbonSequestration = 3.2 }) {
  // Generate dynamic data based on the carbon sequestration value
  const data = useMemo(() => {
    // Base values
    const baseConventional = 1.0
    const baseConservation = 1.2
    const baseRegenerative = 1.5

    // Calculate final values based on carbon sequestration
    const finalConventional = baseConventional * 1.7
    const finalConservation = baseConservation * 2.75
    const finalRegenerative = carbonSequestration

    // Generate yearly data with some randomness
    return [
      {
        year: "2020",
        conventional: randomVariation(baseConventional, 3),
        conservation: randomVariation(baseConservation, 3),
        regenerative: randomVariation(baseRegenerative, 3),
      },
      {
        year: "2021",
        conventional: randomVariation(baseConventional * 1.1, 3),
        conservation: randomVariation(baseConservation * 1.25, 3),
        regenerative: randomVariation(baseRegenerative * 1.33, 3),
      },
      {
        year: "2022",
        conventional: randomVariation(baseConventional * 1.2, 3),
        conservation: randomVariation(baseConservation * 1.5, 3),
        regenerative: randomVariation(baseRegenerative * 1.67, 3),
      },
      {
        year: "2023",
        conventional: randomVariation(baseConventional * 1.3, 3),
        conservation: randomVariation(baseConservation * 1.75, 3),
        regenerative: randomVariation(baseRegenerative * 2.0, 3),
      },
      {
        year: "2024",
        conventional: randomVariation(baseConventional * 1.4, 3),
        conservation: randomVariation(baseConservation * 2.0, 3),
        regenerative: randomVariation(baseRegenerative * 2.33, 3),
      },
      {
        year: "2025",
        conventional: randomVariation(baseConventional * 1.5, 3),
        conservation: randomVariation(baseConservation * 2.25, 3),
        regenerative: randomVariation(baseRegenerative * 2.67, 3),
      },
      {
        year: "2026",
        conventional: randomVariation(baseConventional * 1.6, 3),
        conservation: randomVariation(baseConservation * 2.5, 3),
        regenerative: randomVariation(baseRegenerative * 3.33, 3),
      },
      {
        year: "2027",
        conventional: finalConventional,
        conservation: finalConservation,
        regenerative: finalRegenerative,
      },
    ]
  }, [carbonSequestration])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="year" />
        <YAxis label={{ value: "Carbon (tons/acre)", angle: -90, position: "insideLeft" }} />
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
                      <div>{entry.value.toFixed(2)} tons/acre</div>
                    </div>
                  ))}
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="conventional"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Conventional Farming"
        />
        <Area
          type="monotone"
          dataKey="conservation"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Conservation Farming"
        />
        <Area
          type="monotone"
          dataKey="regenerative"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
          name="Regenerative Farming"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
