"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { useAssignments } from "@/lib/assignment-context"

const COLORS = {
  pending: "#f59e0b",
  accepted: "#10b981",
  rejected: "#ef4444",
}

export function SubmissionChart() {
  const { submissions } = useAssignments()

  const statusCounts = submissions.reduce(
    (acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = [
    { name: "Pending", value: statusCounts.pending || 0, color: COLORS.pending },
    { name: "Accepted", value: statusCounts.accepted || 0, color: COLORS.accepted },
    { name: "Rejected", value: statusCounts.rejected || 0, color: COLORS.rejected },
  ].filter((item) => item.value > 0)

  const totalSubmissions = submissions.length

  if (totalSubmissions === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submission Status Overview</CardTitle>
          <CardDescription>Distribution of submission statuses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">The chart will appear when students start submitting assignments.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submission Status Overview</CardTitle>
          <CardDescription>Distribution of submission statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              pending: { label: "Pending", color: COLORS.pending },
              accepted: { label: "Accepted", color: COLORS.accepted },
              rejected: { label: "Rejected", color: COLORS.rejected },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
          <CardDescription>Detailed breakdown of submissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Submissions</span>
            <span className="text-2xl font-bold">{totalSubmissions}</span>
          </div>

          {chartData.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">{item.value}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round((item.value / totalSubmissions) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
