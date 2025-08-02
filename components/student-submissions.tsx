"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, FileText } from "lucide-react"
import { useAssignments } from "@/lib/assignment-context"
import { useAuth } from "@/lib/auth-context"
import { useSession } from "next-auth/react"

export function StudentSubmissions() {
  const { submissions, assignments } = useAssignments()
  const { data: session } = useSession()
  const user = session?.user || {}
  

  const studentSubmissions = submissions.filter((s) => s.studentEmail === user?.email)

  const getAssignmentTitle = (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId)
    return assignment?.title || "Unknown Assignment"
  }

  if (studentSubmissions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-600 text-center">Your assignment submissions will appear here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {studentSubmissions.map((submission) => (
        <Card key={submission.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{getAssignmentTitle(submission.assignmentId)}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-2">
                  <Calendar className="h-4 w-4" />
                  Submitted on {submission.submittedAt.toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge
                variant={
                  submission.status === "accepted"
                    ? "default"
                    : submission.status === "rejected"
                      ? "destructive"
                      : "secondary"
                }
              >
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Submission URL:</h4>
              <a
                href={submission.submissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
              >
                {submission.submissionUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {submission.note && (
              <div>
                <h4 className="text-sm font-medium mb-2">Your Note:</h4>
                <p className="text-sm text-gray-600">{submission.note}</p>
              </div>
            )}

            {submission.feedback && (
              <div>
                <h4 className="text-sm font-medium mb-2">Instructor Feedback:</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{submission.feedback}</p>
                </div>
              </div>
            )}

            {submission.status === "pending" && (
              <div className="text-sm text-gray-600">
                Your submission is being reviewed. You'll receive feedback soon.
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
