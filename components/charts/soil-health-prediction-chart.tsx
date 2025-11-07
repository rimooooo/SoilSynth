"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { useMemo } from "react"

// Generate random variation within a percentage range
const randomVariation = (value, percentage = 5) => {
  const variation = (Math.random() * 2 - 1) * ((value * percentage) / 100)
  return value + variation
}

export default function SoilHealthPredictionChart({ healthImprovement = 24.7 }) {
  // Generate dynamic data based on the health improvement percentage
  const data = useMemo(() => {
    // Base values
    const baseOrganicMatter = 3.0
    const basePH = 6.2
    const baseBiodiversity = 45
    const baseCarbonStorage = 1.2

    // Calculate final values based on improvement percentage
    const finalOrganicMatter = baseOrganicMatter * (1 + healthImprovement / 100)
    const finalPH = Math.min(7.0, basePH * (1 + healthImprovement / 200)) // pH has a smaller range
    const finalBiodiversity = baseBiodiversity * (1 + healthImprovement / 100)
    const finalCarbonStorage = baseCarbonStorage * (1 + healthImprovement / 80)

    // Generate yearly data with some randomness
    return [
      {
        year: "2020",
        organicMatter: randomVariation(baseOrganicMatter, 3),
        pH: randomVariation(basePH, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity, 2)),
        carbonStorage: randomVariation(baseCarbonStorage, 3),
      },
      {
        year: "2021",
        organicMatter: randomVariation(baseOrganicMatter * 1.1, 3),
        pH: randomVariation(basePH * 1.02, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.07, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 1.25, 3),
      },
      {
        year: "2022",
        organicMatter: randomVariation(baseOrganicMatter * 1.2, 3),
        pH: randomVariation(basePH * 1.04, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.15, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 1.5, 3),
      },
      {
        year: "2023",
        organicMatter: randomVariation(baseOrganicMatter * 1.3, 3),
        pH: randomVariation(basePH * 1.06, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.25, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 1.8, 3),
      },
      {
        year: "2024",
        organicMatter: randomVariation(baseOrganicMatter * 1.45, 3),
        pH: randomVariation(basePH * 1.08, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.4, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 2.1, 3),
      },
      {
        year: "2025",
        organicMatter: randomVariation(baseOrganicMatter * 1.6, 3),
        pH: randomVariation(basePH * 1.09, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.55, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 2.4, 3),
      },
      {
        year: "2026",
        organicMatter: randomVariation(baseOrganicMatter * 1.8, 3),
        pH: randomVariation(basePH * 1.1, 1),
        biodiversity: Math.round(randomVariation(baseBiodiversity * 1.7, 2)),
        carbonStorage: randomVariation(baseCarbonStorage * 2.8, 3),
      },
      {
        year: "2027",
        organicMatter: finalOrganicMatter,
        pH: finalPH,
        biodiversity: Math.round(finalBiodiversity),
        carbonStorage: finalCarbonStorage,
      },
    ]
  }, [healthImprovement])

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
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
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
        <ReferenceLine y={4.0} yAxisId="left" label="Target Organic Matter" stroke="#ff7300" strokeDasharray="3 3" />
        <ReferenceLine y={70} yAxisId="right" label="Target Biodiversity" stroke="#82ca9d" strokeDasharray="3 3" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="organicMatter"
          stroke="#8884d8"
          name="Organic Matter (%)"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#ff7300" name="pH" />
        <Line yAxisId="right" type="monotone" dataKey="biodiversity" stroke="#82ca9d" name="Biodiversity Index" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="carbonStorage"
          stroke="#ffc658"
          name="Carbon Storage (tons/acre)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
