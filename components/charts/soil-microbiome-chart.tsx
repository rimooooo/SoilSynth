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
  { subject: "Bacteria", healthy: 80, current: 65, optimal: 90 },
  { subject: "Fungi", healthy: 70, current: 60, optimal: 80 },
  { subject: "Protozoa", healthy: 60, current: 45, optimal: 70 },
  { subject: "Nematodes", healthy: 50, current: 40, optimal: 60 },
  { subject: "Arthropods", healthy: 40, current: 30, optimal: 50 },
  { subject: "Earthworms", healthy: 30, current: 25, optimal: 40 },
]

export default function SoilMicrobiomeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Current Levels" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Healthy Range" dataKey="healthy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Radar name="Optimal Levels" dataKey="optimal" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <ChartTooltip>
                  <div className="font-medium">{data.subject}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>Current Level:</span>
                    <span className="font-medium">{data.current}</span>
                    <span>Healthy Range:</span>
                    <span className="font-medium">{data.healthy}</span>
                    <span>Optimal Level:</span>
                    <span className="font-medium">{data.optimal}</span>
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
