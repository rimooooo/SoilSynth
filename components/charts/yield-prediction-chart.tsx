"use client"

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { useMemo } from "react"

// Generate random variation within a percentage range
const randomVariation = (value, percentage = 5) => {
  const variation = (Math.random() * 2 - 1) * ((value * percentage) / 100)
  return value + variation
}

export default function YieldPredictionChart({ cropType = "corn", yieldIncrease = 18.3 }) {
  // Generate dynamic data based on the crop type and yield increase
  const data = useMemo(() => {
    // Base values for different crops
    const cropBaseYields = {
      corn: 90,
      wheat: 65,
      soybean: 50,
      cotton: 2.5,
    }

    const baseYield = cropBaseYields[cropType] || 90
    const finalYield = baseYield * (1 + yieldIncrease / 100)

    // Calculate intermediate values with some randomness
    const midYield = baseYield + (finalYield - baseYield) * 0.5

    return [
      { month: "Jan", actual: 0, predicted: 0, range: [0, 0] },
      { month: "Feb", actual: 0, predicted: 0, range: [0, 0] },
      { month: "Mar", actual: 0, predicted: 0, range: [0, 0] },
      { month: "Apr", actual: 0, predicted: 0, range: [0, 0] },
      { month: "May", actual: 0, predicted: 0, range: [0, 0] },
      {
        month: "Jun",
        actual: randomVariation(baseYield * 0.7),
        predicted: baseYield * 0.7,
        range: [baseYield * 0.65, baseYield * 0.75],
      },
      {
        month: "Jul",
        actual: randomVariation(baseYield * 0.85),
        predicted: baseYield * 0.85,
        range: [baseYield * 0.8, baseYield * 0.9],
      },
      {
        month: "Aug",
        actual: randomVariation(baseYield),
        predicted: baseYield,
        range: [baseYield * 0.95, baseYield * 1.05],
      },
      { month: "Sep", actual: null, predicted: randomVariation(midYield), range: [midYield * 0.9, midYield * 1.1] },
      {
        month: "Oct",
        actual: null,
        predicted: randomVariation(midYield * 1.15),
        range: [midYield * 1.05, midYield * 1.25],
      },
      {
        month: "Nov",
        actual: null,
        predicted: randomVariation(finalYield * 0.9),
        range: [finalYield * 0.8, finalYield],
      },
      { month: "Dec", actual: null, predicted: finalYield, range: [finalYield * 0.85, finalYield * 1.15] },
    ]
  }, [cropType, yieldIncrease])

  // Custom data for the area chart (prediction range)
  const areaData = useMemo(() => {
    return data.map((item) => ({
      month: item.month,
      low: item.range[0],
      high: item.range[1] - item.range[0], // We need the difference for stacked area
    }))
  }, [data])

  // Get the unit based on crop type
  const getYieldUnit = () => {
    return cropType === "cotton" ? "bales/acre" : "bu/acre"
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={areaData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" />
        <YAxis
          label={{
            value: `${cropType.charAt(0).toUpperCase() + cropType.slice(1)} Yield (${getYieldUnit()})`,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const monthData = data.find((d) => d.month === label)
              return (
                <ChartTooltip>
                  <div className="font-medium">{label}</div>
                  {monthData.actual !== null && (
                    <div className="flex items-center justify-between gap-2">
                      <span>Actual Yield:</span>
                      <span className="font-medium">
                        {monthData.actual.toFixed(1)} {getYieldUnit()}
                      </span>
                    </div>
                  )}
                  {monthData.predicted !== null && (
                    <div className="flex items-center justify-between gap-2">
                      <span>Predicted Yield:</span>
                      <span className="font-medium">
                        {monthData.predicted.toFixed(1)} {getYieldUnit()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span>Prediction Range:</span>
                    <span className="font-medium">
                      {monthData.range[0].toFixed(1)} - {monthData.range[1].toFixed(1)} {getYieldUnit()}
                    </span>
                  </div>
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="low" stackId="1" stroke="none" fill="#e6f7ff" name="Prediction Range Low" />
        <Area type="monotone" dataKey="high" stackId="1" stroke="none" fill="#bae7ff" name="Prediction Range High" />
        <Bar
          dataKey={(item) => data.find((d) => d.month === item.month).actual}
          barSize={20}
          fill="#82ca9d"
          name="Actual Yield"
        />
        <Line
          type="monotone"
          dataKey={(item) => data.find((d) => d.month === item.month).predicted}
          stroke="#ff7300"
          name="Predicted Yield"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
