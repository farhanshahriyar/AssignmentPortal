"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Calendar, User } from "lucide-react"
import { useAssignments } from "@/lib/assignment-context"

export function SubmissionReview() {
  const { submissions, assignments, updateSubmission } = useAssignments()
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending")

  const getAssignmentTitle = (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId)
    return assignment?.title || "Unknown Assignment"
  }

  const handleReview = async (submissionId: string) => {
    await updateSubmission(submissionId, status, feedback)
    setSelectedSubmission(null)
    setFeedback("")
    setStatus("pending")
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <User className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-600 text-center">Student submissions will appear here for review.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{getAssignmentTitle(submission.assignmentId)}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {submission.studentName} ({submission.studentEmail})
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {submission.submittedAt.toLocaleDateString()}
                  </span>
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
              <Label className="text-sm font-medium">Submission URL:</Label>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={submission.submissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {submission.submissionUrl}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {submission.note && (
              <div>
                <Label className="text-sm font-medium">Student Note:</Label>
                <p className="text-sm text-gray-600 mt-1">{submission.note}</p>
              </div>
            )}

            {submission.feedback && (
              <div>
                <Label className="text-sm font-medium">Feedback:</Label>
                <p className="text-sm text-gray-600 mt-1">{submission.feedback}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSubmission(submission.id)
                  setStatus(submission.status)
                  setFeedback(submission.feedback || "")
                }}
              >
                {submission.status === "pending" ? "Review" : "Update Review"}
              </Button>
            </div>

            {selectedSubmission === submission.id && (
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold">Review Submission</h4>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value: "pending" | "accepted" | "rejected") => setStatus(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback to the student..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleReview(submission.id)}>Save Review</Button>
                  <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
