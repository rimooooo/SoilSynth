import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SoilNutrientChart from "./charts/soil-nutrient-chart"
import SoilTextureChart from "./charts/soil-texture-chart"
import SoilMicrobiomeChart from "./charts/soil-microbiome-chart"

export default function SoilAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Detailed Soil Analysis</h2>
        <div className="flex gap-4">
          <Select defaultValue="farm1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farm1">North Farm</SelectItem>
              <SelectItem value="farm2">South Farm</SelectItem>
              <SelectItem value="farm3">East Field</SelectItem>
              <SelectItem value="farm4">West Field</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="nutrients">
        <TabsList>
          <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
          <TabsTrigger value="texture">Texture</TabsTrigger>
          <TabsTrigger value="microbiome">Microbiome</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrients" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Nutrient Analysis</CardTitle>
              <CardDescription>Detailed breakdown of macro and micronutrients in soil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <SoilNutrientChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="texture" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Texture Analysis</CardTitle>
              <CardDescription>Distribution of sand, silt, and clay particles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <SoilTextureChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microbiome" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Microbiome Analysis</CardTitle>
              <CardDescription>Microbial diversity and population in soil samples</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <SoilMicrobiomeChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
