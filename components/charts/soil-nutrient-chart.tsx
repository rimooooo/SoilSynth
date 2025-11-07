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
  { name: "Nitrogen (N)", value: 42, optimal: 50, deficient: 30, excess: 70 },
  { name: "Phosphorus (P)", value: 38, optimal: 40, deficient: 25, excess: 60 },
  { name: "Potassium (K)", value: 28, optimal: 35, deficient: 20, excess: 55 },
  { name: "Calcium (Ca)", value: 65, optimal: 60, deficient: 40, excess: 80 },
  { name: "Magnesium (Mg)", value: 32, optimal: 30, deficient: 15, excess: 45 },
  { name: "Sulfur (S)", value: 22, optimal: 25, deficient: 15, excess: 40 },
  { name: "Iron (Fe)", value: 18, optimal: 20, deficient: 10, excess: 30 },
  { name: "Zinc (Zn)", value: 12, optimal: 15, deficient: 8, excess: 25 },
]

export default function SoilNutrientChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
        <XAxis type="number" domain={[0, "dataMax"]} />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const nutrient = payload[0].payload
              return (
                <ChartTooltip>
                  <div className="font-medium">{label}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Current Level:</span>
                    <span className="font-medium">{nutrient.value} ppm</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Optimal Range:</span>
                    <span className="font-medium">
                      {nutrient.deficient} - {nutrient.excess} ppm
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Target Level:</span>
                    <span className="font-medium">{nutrient.optimal} ppm</span>
                  </div>
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" name="Current Level (ppm)" />
        <ReferenceLine x={0} stroke="#666" />
      </BarChart>
    </ResponsiveContainer>
  )
}
