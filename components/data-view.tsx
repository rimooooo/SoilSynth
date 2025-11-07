"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash,
  Upload,
} from "lucide-react"
import DataEntryForm from "./data-entry-form"

// Sample data for the table
const sampleData = [
  {
    id: "S001",
    date: "2023-05-15",
    location: "North Field",
    pH: 6.8,
    organicMatter: 4.2,
    nitrogen: 42,
    phosphorus: 38,
    potassium: 28,
    moisture: 28,
    status: "optimal",
  },
  {
    id: "S002",
    date: "2023-05-22",
    location: "South Field",
    pH: 6.5,
    organicMatter: 3.8,
    nitrogen: 38,
    phosphorus: 35,
    potassium: 25,
    moisture: 25,
    status: "good",
  },
  {
    id: "S003",
    date: "2023-06-01",
    location: "East Field",
    pH: 6.2,
    organicMatter: 3.5,
    nitrogen: 32,
    phosphorus: 30,
    potassium: 22,
    moisture: 22,
    status: "attention",
  },
  {
    id: "S004",
    date: "2023-06-08",
    location: "West Field",
    pH: 5.8,
    organicMatter: 3.0,
    nitrogen: 28,
    phosphorus: 25,
    potassium: 18,
    moisture: 18,
    status: "critical",
  },
  {
    id: "S005",
    date: "2023-06-15",
    location: "North Field",
    pH: 6.9,
    organicMatter: 4.3,
    nitrogen: 44,
    phosphorus: 40,
    potassium: 30,
    moisture: 30,
    status: "optimal",
  },
  {
    id: "S006",
    date: "2023-06-22",
    location: "South Field",
    pH: 6.6,
    organicMatter: 3.9,
    nitrogen: 40,
    phosphorus: 36,
    potassium: 26,
    moisture: 26,
    status: "good",
  },
  {
    id: "S007",
    date: "2023-07-01",
    location: "East Field",
    pH: 6.3,
    organicMatter: 3.6,
    nitrogen: 34,
    phosphorus: 32,
    potassium: 24,
    moisture: 24,
    status: "good",
  },
  {
    id: "S008",
    date: "2023-07-08",
    location: "West Field",
    pH: 5.9,
    organicMatter: 3.1,
    nitrogen: 30,
    phosphorus: 27,
    potassium: 20,
    moisture: 20,
    status: "attention",
  },
  {
    id: "S009",
    date: "2023-07-15",
    location: "North Field",
    pH: 7.0,
    organicMatter: 4.4,
    nitrogen: 46,
    phosphorus: 42,
    potassium: 32,
    moisture: 32,
    status: "optimal",
  },
  {
    id: "S010",
    date: "2023-07-22",
    location: "South Field",
    pH: 6.7,
    organicMatter: 4.0,
    nitrogen: 42,
    phosphorus: 38,
    potassium: 28,
    moisture: 28,
    status: "good",
  },
]

export default function DataView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Filter data based on search term
  const filteredData = sampleData.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusMap = {
      optimal: { label: "Optimal", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      good: { label: "Good", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      attention: { label: "Attention", className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
      critical: { label: "Critical", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    }

    const { label, className } = statusMap[status] || statusMap.good

    return (
      <Badge variant="outline" className={className}>
        {label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Soil Sample Data</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search samples..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <DataEntryForm />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Soil Samples</CardTitle>
              <CardDescription>View and manage your soil sample data</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Sample
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>Organic Matter</TableHead>
                <TableHead>N-P-K</TableHead>
                <TableHead>Moisture</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.pH}</TableCell>
                  <TableCell>{item.organicMatter}%</TableCell>
                  <TableCell>
                    {item.nitrogen}-{item.phosphorus}-{item.potassium}
                  </TableCell>
                  <TableCell>{item.moisture}%</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}{" "}
              entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
