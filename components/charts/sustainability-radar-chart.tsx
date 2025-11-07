"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { subject: "Water Efficiency", current: 75, target: 90, industry: 60 },
  { subject: "Soil Health", current: 82, target: 95, industry: 65 },
  { subject: "Biodiversity", current: 65, target: 85, industry: 55 },
  { subject: "Carbon Footprint", current: 70, target: 90, industry: 50 },
  { subject: "Pesticide Use", current: 85, target: 95, industry: 60 },
  { subject: "Energy Efficiency", current: 68, target: 85, industry: 55 },
  { subject: "Waste Management", current: 78, target: 90, industry: 65 },
]

export default function SustainabilityRadarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Current Performance" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Target Performance" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Radar name="Industry Average" dataKey="industry" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <ChartTooltip>
                  <div className="font-medium">{data.subject}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>Current:</span>
                    <span className="font-medium">{data.current}/100</span>
                    <span>Target:</span>
                    <span className="font-medium">{data.target}/100</span>
                    <span>Industry Avg:</span>
                    <span className="font-medium">{data.industry}/100</span>
                  </div>
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
