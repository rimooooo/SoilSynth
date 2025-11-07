"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertTriangle, ThumbsUp, Sprout, Droplets, Wind } from "lucide-react"

// Array of possible insights that can be randomly selected
const possibleInsights = [
  {
    type: "soil-health",
    title: "Soil Health Insight",
    description:
      "Your soil's organic matter has increased by 0.5% over the last month, indicating successful implementation of cover cropping. Continue this practice to further improve soil structure and water retention capacity.",
    icon: Lightbulb,
    badge: "High Impact",
    color: "green",
  },
  {
    type: "yield-prediction",
    title: "Yield Prediction",
    description:
      "Based on current soil conditions and weather forecasts, we predict an 18.3% increase in corn yield if you implement precision irrigation in the north field. This could result in approximately $12,400 additional revenue.",
    icon: TrendingUp,
    badge: "Opportunity",
    color: "blue",
  },
  {
    type: "risk-alert",
    title: "Risk Alert",
    description:
      "Potassium levels in the east field are declining and may reach critical levels within 45 days. Consider applying potassium-rich amendments before the next planting cycle to prevent yield loss.",
    icon: AlertTriangle,
    badge: "Attention Needed",
    color: "amber",
  },
  {
    type: "sustainability",
    title: "Sustainability Achievement",
    description:
      "Your carbon sequestration efforts have resulted in storing an estimated 3.2 tons of carbon per acre. This puts your farm in the top 15% of sustainable agricultural operations in your region.",
    icon: ThumbsUp,
    badge: "Milestone",
    color: "purple",
  },
  {
    type: "crop-rotation",
    title: "Crop Rotation Recommendation",
    description:
      "Analysis of your soil microbial diversity suggests that rotating to legumes next season would significantly enhance nitrogen fixation. This could reduce fertilizer needs by up to 30% and improve soil structure.",
    icon: Sprout,
    badge: "Recommendation",
    color: "emerald",
  },
  {
    type: "water-management",
    title: "Water Management Insight",
    description:
      "Your soil moisture sensors indicate inconsistent irrigation patterns in the southwest quadrant. Adjusting your irrigation schedule to early morning hours could improve water efficiency by 22% and reduce evaporation loss.",
    icon: Droplets,
    badge: "Efficiency",
    color: "cyan",
  },
  {
    type: "climate-adaptation",
    title: "Climate Adaptation Alert",
    description:
      "Based on 5-year climate trend analysis, we predict increased drought conditions in your region. Consider transitioning 15% of your acreage to drought-resistant crop varieties to mitigate risk.",
    icon: Wind,
    badge: "Long-term Planning",
    color: "indigo",
  },
  {
    type: "soil-amendment",
    title: "Soil Amendment Suggestion",
    description:
      "AI analysis of your soil composition indicates that adding biochar at 5 tons/acre would improve your soil's cation exchange capacity by 40%, enhancing nutrient retention and reducing fertilizer runoff.",
    icon: Lightbulb,
    badge: "Innovation",
    color: "teal",
  },
]

// Helper function to get random insights
const getRandomInsights = (count = 4) => {
  // Shuffle array and take first 'count' elements
  return [...possibleInsights].sort(() => 0.5 - Math.random()).slice(0, count)
}

export default function AiInsightsPanel() {
  const [insights, setInsights] = useState(possibleInsights.slice(0, 4))
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNewInsights = () => {
    setIsGenerating(true)

    // Simulate AI processing time
    setTimeout(() => {
      setInsights(getRandomInsights())
      setIsGenerating(false)
    }, 2000)
  }

  // Map color names to Tailwind classes
  const getColorClasses = (color) => {
    const colorMap = {
      green: "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950",
      blue: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
      amber: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950",
      purple: "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950",
      emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950",
      cyan: "border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950",
      indigo: "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950",
      teal: "border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950",
    }
    return colorMap[color] || colorMap.blue
  }

  const getIconColor = (color) => {
    const colorMap = {
      green: "text-green-600 dark:text-green-400",
      blue: "text-blue-600 dark:text-blue-400",
      amber: "text-amber-600 dark:text-amber-400",
      purple: "text-purple-600 dark:text-purple-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      cyan: "text-cyan-600 dark:text-cyan-400",
      indigo: "text-indigo-600 dark:text-indigo-400",
      teal: "text-teal-600 dark:text-teal-400",
    }
    return colorMap[color] || colorMap.blue
  }

  const getBadgeClasses = (color) => {
    const colorMap = {
      green: "text-green-600 border-green-200 bg-green-100 dark:text-green-400 dark:border-green-800 dark:bg-green-900",
      blue: "text-blue-600 border-blue-200 bg-blue-100 dark:text-blue-400 dark:border-blue-800 dark:bg-blue-900",
      amber: "text-amber-600 border-amber-200 bg-amber-100 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-900",
      purple:
        "text-purple-600 border-purple-200 bg-purple-100 dark:text-purple-400 dark:border-purple-800 dark:bg-purple-900",
      emerald:
        "text-emerald-600 border-emerald-200 bg-emerald-100 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-900",
      cyan: "text-cyan-600 border-cyan-200 bg-cyan-100 dark:text-cyan-400 dark:border-cyan-800 dark:bg-cyan-900",
      indigo:
        "text-indigo-600 border-indigo-200 bg-indigo-100 dark:text-indigo-400 dark:border-indigo-800 dark:bg-indigo-900",
      teal: "text-teal-600 border-teal-200 bg-teal-100 dark:text-teal-400 dark:border-teal-800 dark:bg-teal-900",
    }
    return colorMap[color] || colorMap.blue
  }

  const getTextColor = (color) => {
    const colorMap = {
      green: "text-green-700 dark:text-green-300",
      blue: "text-blue-700 dark:text-blue-300",
      amber: "text-amber-700 dark:text-amber-300",
      purple: "text-purple-700 dark:text-purple-300",
      emerald: "text-emerald-700 dark:text-emerald-300",
      cyan: "text-cyan-700 dark:text-cyan-300",
      indigo: "text-indigo-700 dark:text-indigo-300",
      teal: "text-teal-700 dark:text-teal-300",
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="space-y-4">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
          <p className="text-green-700 dark:text-green-300 text-center">
            Analyzing soil data and generating insights...
          </p>
        </div>
      ) : (
        <>
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <Alert key={index} className={getColorClasses(insight.color)}>
                <Icon className={`h-4 w-4 ${getIconColor(insight.color)}`} />
                <AlertTitle className="flex items-center gap-2">
                  {insight.title}
                  <Badge variant="outline" className={getBadgeClasses(insight.color)}>
                    {insight.badge}
                  </Badge>
                </AlertTitle>
                <AlertDescription className={getTextColor(insight.color)}>{insight.description}</AlertDescription>
              </Alert>
            )
          })}

          <div className="flex justify-center mt-6">
            <Button
              onClick={generateNewInsights}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? "Generating..." : "Generate New Insights"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
