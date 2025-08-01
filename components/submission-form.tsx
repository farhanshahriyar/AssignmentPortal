"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssignments } from "@/lib/assignment-context"
import { useAuth } from "@/lib/auth-context"

interface SubmissionFormProps {
  assignmentId: string
  onClose: () => void
}

export function SubmissionForm({ assignmentId, onClose }: SubmissionFormProps) {
  const [submissionUrl, setSubmissionUrl] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const { addSubmission } = useAssignments()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      await addSubmission({
        assignmentId,
        studentEmail: user.email,
        studentName: user.name,
        submissionUrl,
        note,
      })

      // Reset form
      setSubmissionUrl("")
      setNote("")
      onClose()
    } catch (error) {
      console.error("Error submitting assignment:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Submit Assignment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="submissionUrl">Submission URL</Label>
          <Input
            id="submissionUrl"
            type="url"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            placeholder="https://github.com/username/repository or https://drive.google.com/..."
            required
          />
          <p className="text-sm text-gray-600">Provide a link to your work (GitHub repository, Google Drive, etc.)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Additional Notes (Optional)</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any additional information about your submission..."
            rows={3}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Assignment"}
          </Button>
        </div>
      </form>
    </div>
  )
}
