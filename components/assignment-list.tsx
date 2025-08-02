"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText } from "lucide-react"
import { useAssignments } from "@/lib/assignment-context"
import { useAuth } from "@/lib/auth-context"
import { SubmissionForm } from "@/components/submission-form"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
const AssingmentDeadline = dynamic(() => import("./dynamic/AssingmentDeadline"), {
  ssr: false,
})

interface AssignmentListProps {
  showActions: boolean
}

export function AssignmentList({ showActions }: AssignmentListProps) {
  const { assignments, submissions } = useAssignments()
  const {data:session} =useSession()
  const user = session?.user || {}
  console.log(session, "user")
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null)

  const getSubmissionStatus = (assignmentId: string) => {
    const submission = submissions.find((s) => s.assignmentId === assignmentId && s.studentEmail === user?.email)
    return submission?.status || null
  }

  const hasSubmitted = (assignmentId: string) => {
    return submissions.some((s) => s.assignmentId === assignmentId && s.studentEmail === user?.email)
  }

  const isOverdue = (deadline: Date) => {
    return new Date() > deadline
  }

  if (assignments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
          <p className="text-gray-600 text-center">
            {showActions
              ? "Create your first assignment to get started."
              : "No assignments have been created yet. Check back later."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const submissionStatus = getSubmissionStatus(assignment.id)
        const submitted = hasSubmitted(assignment.id)
        const overdue =isOverdue(new Date(assignment.deadline))
        console.log(assignment.deadline)
        console.log(overdue, "overdue")

        return (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription className="mt-2">{assignment.description}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {submissionStatus && (
                    <Badge
                      variant={
                        submissionStatus === "accepted"
                          ? "default"
                          : submissionStatus === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {submissionStatus.charAt(0).toUpperCase() + submissionStatus.slice(1)}
                    </Badge>
                  )}
                  {overdue && !submitted && <Badge variant="destructive">Overdue</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <AssingmentDeadline deadline={assignment.deadline} date={true} />
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                 <AssingmentDeadline deadline={assignment.deadline} date={false}/>
                </div>
              </div>

              {!showActions && user?.role === "STUDENT" && (
                <div className="flex gap-2">
                  {!submitted ? (
                    <Button onClick={() => setSelectedAssignment(assignment.id)} disabled={overdue}>
                      {overdue ? "Submission Closed" : "Submit Assignment"}
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Already Submitted
                    </Button>
                  )}
                </div>
              )}
            </CardContent>

            {selectedAssignment === assignment.id && (
              <CardContent className="border-t">
                <SubmissionForm assignmentId={assignment.id} onClose={() => setSelectedAssignment(null)} />
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
