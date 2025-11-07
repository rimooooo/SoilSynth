"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Sprout, Droplets, AlertTriangle } from "lucide-react"
import YieldPredictionChart from "./charts/yield-prediction-chart"
import SoilHealthPredictionChart from "./charts/soil-health-prediction-chart"
import CarbonSequestrationChart from "./charts/carbon-sequestration-chart"

// Generate random number within a range with fixed precision
const randomInRange = (min, max, precision = 1) => {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(precision))
}

// Generate random percentage change (positive or negative)
const randomPercentageChange = (baseValue, maxChange = 15, precision = 1) => {
  const changePercent = randomInRange(-maxChange, maxChange, precision)
  const newValue = baseValue * (1 + changePercent / 100)
  return {
    value: Number(newValue.toFixed(precision)),
    change: changePercent,
    isPositive: changePercent > 0,
  }
}

// Possible recommendations for different prediction types
const yieldRecommendations = [
  {
    title: "Precision Irrigation Implementation",
    description:
      "Implement precision irrigation in the north field to optimize water usage. Our models predict this could increase yield by up to 22% while reducing water consumption by 30%.",
    icon: Droplets,
    badge: "High Impact",
    color: "blue",
  },
  {
    title: "Micronutrient Application",
    description:
      "Soil analysis indicates zinc and boron deficiencies in the east field. Targeted micronutrient application could increase yield potential by 15-18% for your current crop.",
    icon: Lightbulb,
    badge: "Quick Win",
    color: "green",
  },
  {
    title: "Row Spacing Optimization",
    description:
      "Adjusting row spacing from 30 inches to 20 inches in the south field could increase light interception and yield by approximately 12%. Best implemented next planting season.",
    icon: TrendingUp,
    badge: "Planning",
    color: "purple",
  },
  {
    title: "Beneficial Insect Habitat",
    description:
      "Creating field borders with flowering plants could increase pollinator activity and natural pest control, potentially increasing yields by 8-10% while reducing pesticide costs.",
    icon: Sprout,
    badge: "Sustainability",
    color: "emerald",
  },
]

const soilHealthRecommendations = [
  {
    title: "Cover Crop Implementation",
    description:
      "Implementing a winter cover crop mix of rye, vetch, and clover could increase soil organic matter by 0.5% annually while reducing erosion by up to 80%.",
    icon: Sprout,
    badge: "Long-term",
    color: "green",
  },
  {
    title: "Reduced Tillage Practices",
    description:
      "Transitioning to reduced tillage or no-till practices could improve soil structure, increase water infiltration by 40%, and boost soil microbial activity significantly.",
    icon: Lightbulb,
    badge: "Structural Change",
    color: "amber",
  },
  {
    title: "Biochar Amendment",
    description:
      "Adding biochar at 3-5 tons per acre could improve your soil's cation exchange capacity by 20%, enhancing nutrient retention and reducing fertilizer needs.",
    icon: TrendingUp,
    badge: "Innovation",
    color: "purple",
  },
  {
    title: "Compost Tea Application",
    description:
      "Monthly applications of compost tea could increase beneficial soil microorganisms by up to 300%, improving nutrient cycling and plant health.",
    icon: Droplets,
    badge: "Biological",
    color: "cyan",
  },
]

const carbonRecommendations = [
  {
    title: "Agroforestry Integration",
    description:
      "Integrating tree rows (silvopasture) could sequester an additional 2-4 tons of carbon per acre annually while providing windbreaks and additional income streams.",
    icon: Sprout,
    badge: "Transformative",
    color: "emerald",
  },
  {
    title: "Perennial Crop Rotation",
    description:
      "Incorporating perennial crops into your rotation could increase soil carbon by up to 25% over 5 years while reducing erosion and improving water quality.",
    icon: TrendingUp,
    badge: "Long-term",
    color: "blue",
  },
  {
    title: "Biochar Application",
    description:
      "Applying biochar at 2 tons per acre could sequester carbon for hundreds of years while improving soil structure and water retention capacity.",
    icon: Lightbulb,
    badge: "Carbon Negative",
    color: "indigo",
  },
  {
    title: "Managed Grazing Integration",
    description:
      "Implementing rotational grazing during fallow periods could increase soil carbon sequestration by 30% while providing additional revenue through livestock.",
    icon: Sprout,
    badge: "Diversification",
    color: "green",
  },
]

const riskAlerts = [
  {
    title: "Drought Risk Alert",
    description:
      "Climate models indicate a 65% chance of drought conditions in the next growing season. Consider drought-resistant varieties and improved water management strategies.",
    icon: AlertTriangle,
    badge: "High Risk",
    color: "red",
  },
  {
    title: "Pest Pressure Warning",
    description:
      "Monitoring data suggests increased corn rootworm pressure next season. Consider rotation to non-host crops or targeted biological controls.",
    icon: AlertTriangle,
    badge: "Moderate Risk",
    color: "amber",
  },
  {
    title: "Soil Erosion Vulnerability",
    description:
      "The west field shows signs of increased erosion risk. Implementing contour farming and cover crops could reduce soil loss by up to 80%.",
    icon: AlertTriangle,
    badge: "Preventable",
    color: "orange",
  },
  {
    title: "Nutrient Runoff Risk",
    description:
      "Water testing indicates increased phosphorus levels in runoff. Consider buffer strips and split fertilizer applications to reduce environmental impact and nutrient loss.",
    icon: AlertTriangle,
    badge: "Regulatory",
    color: "amber",
  },
]

// Helper function to get random recommendations
const getRandomRecommendation = (recommendations) => {
  const index = Math.floor(Math.random() * recommendations.length)
  return recommendations[index]
}

export default function PredictiveInsights() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState("corn")

  // State for the prediction metrics
  const [predictions, setPredictions] = useState({
    yieldIncrease: { value: 18.3, change: 3.2, isPositive: true },
    soilHealthImprovement: { value: 24.7, change: 5.1, isPositive: true },
    carbonSequestration: { value: 3.2, change: 0.4, isPositive: true },
  })

  // State for recommendations
  const [recommendations, setRecommendations] = useState({
    yield: yieldRecommendations[0],
    soilHealth: soilHealthRecommendations[0],
    carbon: carbonRecommendations[0],
    risk: riskAlerts[0],
  })

  // State for chart data
  const [yieldData, setYieldData] = useState(null)
  const [soilHealthData, setSoilHealthData] = useState(null)
  const [carbonData, setCarbonData] = useState(null)

  const generateNewPredictions = () => {
    setIsGenerating(true)

    // Simulate AI processing time
    setTimeout(() => {
      // Generate new prediction metrics
      const newPredictions = {
        yieldIncrease: randomPercentageChange(18.3, 20, 1),
        soilHealthImprovement: randomPercentageChange(24.7, 15, 1),
        carbonSequestration: randomPercentageChange(3.2, 25, 1),
      }

      setPredictions(newPredictions)

      // Generate new recommendations
      setRecommendations({
        yield: getRandomRecommendation(yieldRecommendations),
        soilHealth: getRandomRecommendation(soilHealthRecommendations),
        carbon: getRandomRecommendation(carbonRecommendations),
        risk: getRandomRecommendation(riskAlerts),
      })

      // Signal charts to regenerate their data
      setYieldData(Date.now())
      setSoilHealthData(Date.now())
      setCarbonData(Date.now())

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
      red: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950",
      orange: "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950",
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
      red: "text-red-600 dark:text-red-400",
      orange: "text-orange-600 dark:text-orange-400",
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
      red: "text-red-600 border-red-200 bg-red-100 dark:text-red-400 dark:border-red-800 dark:bg-red-900",
      orange:
        "text-orange-600 border-orange-200 bg-orange-100 dark:text-orange-400 dark:border-orange-800 dark:bg-orange-900",
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
      red: "text-red-700 dark:text-red-300",
      orange: "text-orange-700 dark:text-orange-300",
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Predictive Insights</h2>
          <p className="text-muted-foreground">Using generative AI to forecast agricultural outcomes</p>
        </div>
        <Button
          onClick={generateNewPredictions}
          disabled={isGenerating}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">Generating...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Generate New Predictions"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Predicted Yield Increase</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              {predictions.yieldIncrease.isPositive ? "+" : "-"}
              {predictions.yieldIncrease.value}%
              {isGenerating && <div className="ml-2 h-4 w-4 animate-pulse rounded-full bg-green-500/50"></div>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Based on current soil health and proposed interventions
              {!isGenerating && (
                <span className={predictions.yieldIncrease.isPositive ? "text-green-500" : "text-red-500"}>
                  {" "}
                  ({predictions.yieldIncrease.isPositive ? "+" : ""}
                  {predictions.yieldIncrease.change.toFixed(1)}% change)
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Soil Health Improvement</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              {predictions.soilHealthImprovement.isPositive ? "+" : "-"}
              {predictions.soilHealthImprovement.value}%
              {isGenerating && <div className="ml-2 h-4 w-4 animate-pulse rounded-full bg-green-500/50"></div>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Projected improvement over next 12 months
              {!isGenerating && (
                <span className={predictions.soilHealthImprovement.isPositive ? "text-green-500" : "text-red-500"}>
                  {" "}
                  ({predictions.soilHealthImprovement.isPositive ? "+" : ""}
                  {predictions.soilHealthImprovement.change.toFixed(1)}% change)
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Carbon Sequestration</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              {predictions.carbonSequestration.isPositive ? "+" : "-"}
              {predictions.carbonSequestration.value} tons/acre
              {isGenerating && <div className="ml-2 h-4 w-4 animate-pulse rounded-full bg-green-500/50"></div>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Projected carbon capture with sustainable practices
              {!isGenerating && (
                <span className={predictions.carbonSequestration.isPositive ? "text-green-500" : "text-red-500"}>
                  {" "}
                  ({predictions.carbonSequestration.isPositive ? "+" : ""}
                  {predictions.carbonSequestration.change.toFixed(1)} change)
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">AI-Generated Recommendations</h3>
        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
              <p className="text-green-700 dark:text-green-300 text-center">
                Analyzing data and generating recommendations...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Yield Recommendation */}
            <Alert className={getColorClasses(recommendations.yield.color)}>
              <recommendations.yield.icon className={`h-4 w-4 ${getIconColor(recommendations.yield.color)}`} />
              <AlertTitle className="flex items-center gap-2">
                {recommendations.yield.title}
                <Badge variant="outline" className={getBadgeClasses(recommendations.yield.color)}>
                  {recommendations.yield.badge}
                </Badge>
              </AlertTitle>
              <AlertDescription className={getTextColor(recommendations.yield.color)}>
                {recommendations.yield.description}
              </AlertDescription>
            </Alert>

            {/* Soil Health Recommendation */}
            <Alert className={getColorClasses(recommendations.soilHealth.color)}>
              <recommendations.soilHealth.icon
                className={`h-4 w-4 ${getIconColor(recommendations.soilHealth.color)}`}
              />
              <AlertTitle className="flex items-center gap-2">
                {recommendations.soilHealth.title}
                <Badge variant="outline" className={getBadgeClasses(recommendations.soilHealth.color)}>
                  {recommendations.soilHealth.badge}
                </Badge>
              </AlertTitle>
              <AlertDescription className={getTextColor(recommendations.soilHealth.color)}>
                {recommendations.soilHealth.description}
              </AlertDescription>
            </Alert>

            {/* Carbon Recommendation */}
            <Alert className={getColorClasses(recommendations.carbon.color)}>
              <recommendations.carbon.icon className={`h-4 w-4 ${getIconColor(recommendations.carbon.color)}`} />
              <AlertTitle className="flex items-center gap-2">
                {recommendations.carbon.title}
                <Badge variant="outline" className={getBadgeClasses(recommendations.carbon.color)}>
                  {recommendations.carbon.badge}
                </Badge>
              </AlertTitle>
              <AlertDescription className={getTextColor(recommendations.carbon.color)}>
                {recommendations.carbon.description}
              </AlertDescription>
            </Alert>

            {/* Risk Alert */}
            <Alert className={getColorClasses(recommendations.risk.color)}>
              <recommendations.risk.icon className={`h-4 w-4 ${getIconColor(recommendations.risk.color)}`} />
              <AlertTitle className="flex items-center gap-2">
                {recommendations.risk.title}
                <Badge variant="outline" className={getBadgeClasses(recommendations.risk.color)}>
                  {recommendations.risk.badge}
                </Badge>
              </AlertTitle>
              <AlertDescription className={getTextColor(recommendations.risk.color)}>
                {recommendations.risk.description}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      <Tabs defaultValue="yield">
        <TabsList>
          <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
          <TabsTrigger value="health">Soil Health Forecast</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Sequestration</TabsTrigger>
        </TabsList>

        <TabsContent value="yield" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Crop Yield Prediction</CardTitle>
                  <CardDescription>AI-generated forecast based on soil data and climate models</CardDescription>
                </div>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
                    <p className="text-green-700 dark:text-green-300">Generating yield predictions...</p>
                  </div>
                </div>
              ) : (
                <div className="h-96">
                  <YieldPredictionChart
                    key={yieldData}
                    cropType={selectedCrop}
                    yieldIncrease={predictions.yieldIncrease.value}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Prediction</CardTitle>
              <CardDescription>Projected soil health metrics over the next 3 years</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
                    <p className="text-green-700 dark:text-green-300">Generating soil health forecasts...</p>
                  </div>
                </div>
              ) : (
                <div className="h-96">
                  <SoilHealthPredictionChart
                    key={soilHealthData}
                    healthImprovement={predictions.soilHealthImprovement.value}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Sequestration Forecast</CardTitle>
              <CardDescription>Projected carbon capture with different agricultural practices</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
                    <p className="text-green-700 dark:text-green-300">Generating carbon sequestration forecasts...</p>
                  </div>
                </div>
              ) : (
                <div className="h-96">
                  <CarbonSequestrationChart
                    key={carbonData}
                    carbonSequestration={predictions.carbonSequestration.value}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
