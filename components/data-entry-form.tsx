"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function DataEntryForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    date: new Date().toISOString().split("T")[0],
    pH: "",
    organicMatter: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    moisture: "",
    notes: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
    setOpen(false)
    // Reset form
    setFormData({
      location: "",
      date: new Date().toISOString().split("T")[0],
      pH: "",
      organicMatter: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      moisture: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Sample</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Soil Sample</DialogTitle>
          <DialogDescription>Enter the details of your soil sample. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="advanced">Detailed Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => handleChange("location", value)} required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North Field</SelectItem>
                      <SelectItem value="south">South Field</SelectItem>
                      <SelectItem value="east">East Field</SelectItem>
                      <SelectItem value="west">West Field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Sample Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g. 6.8"
                    value={formData.pH}
                    onChange={(e) => handleChange("pH", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                  <Input
                    id="organicMatter"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="e.g. 4.2"
                    value={formData.organicMatter}
                    onChange={(e) => handleChange("organicMatter", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this sample"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (ppm)</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    min="0"
                    placeholder="e.g. 42"
                    value={formData.nitrogen}
                    onChange={(e) => handleChange("nitrogen", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (ppm)</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    min="0"
                    placeholder="e.g. 38"
                    value={formData.phosphorus}
                    onChange={(e) => handleChange("phosphorus", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (ppm)</Label>
                  <Input
                    id="potassium"
                    type="number"
                    min="0"
                    placeholder="e.g. 28"
                    value={formData.potassium}
                    onChange={(e) => handleChange("potassium", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="moisture">Moisture Content (%)</Label>
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="e.g. 28"
                  value={formData.moisture}
                  onChange={(e) => handleChange("moisture", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Tests</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="microbiome" className="rounded border-gray-300" />
                    <Label htmlFor="microbiome" className="font-normal">
                      Microbiome Analysis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="texture" className="rounded border-gray-300" />
                    <Label htmlFor="texture" className="font-normal">
                      Texture Analysis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="heavy-metals" className="rounded border-gray-300" />
                    <Label htmlFor="heavy-metals" className="font-normal">
                      Heavy Metals
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="pesticides" className="rounded border-gray-300" />
                    <Label htmlFor="pesticides" className="font-normal">
                      Pesticide Residue
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Sample</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
