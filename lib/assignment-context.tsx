"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Assignment {
  id: string
  title: string
  description: string
  deadline: Date
  createdAt: Date
}

interface Submission {
  id: string
  assignmentId: string
  studentEmail: string
  studentName: string
  submissionUrl: string
  note?: string
  status: "pending" | "accepted" | "rejected"
  feedback?: string
  submittedAt: Date
}

interface AssignmentContextType {
  assignments: Assignment[]
  submissions: Submission[]
  addAssignment: (assignment: Omit<Assignment, "id" | "createdAt">) => Promise<void>
  addSubmission: (submission: Omit<Submission, "id" | "status" | "submittedAt">) => Promise<void>
  updateSubmission: (id: string, status: "pending" | "accepted" | "rejected", feedback?: string) => Promise<void>
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

// Demo data
const demoAssignments: Assignment[] = [
  {
    id: "1",
    title: "React Fundamentals Project",
    description:
      "Build a todo application using React hooks and components. The application should allow users to add, edit, delete, and mark tasks as complete. Include proper error handling and responsive design.",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "2",
    title: "Database Design Assignment",
    description:
      "Design a normalized database schema for an e-commerce platform. Include entity-relationship diagrams, table structures, and sample queries. Document your design decisions and explain the normalization process.",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
]

const demoSubmissions: Submission[] = [
  {
    id: "1",
    assignmentId: "1",
    studentEmail: "student@demo.com",
    studentName: "Alex Smith",
    submissionUrl: "https://github.com/alexsmith/react-todo-app",
    note: "I've implemented all the required features plus dark mode toggle. The app is fully responsive and includes unit tests.",
    status: "accepted",
    feedback:
      "Excellent work! Your implementation is clean and well-structured. The additional features show great initiative. Grade: A",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    assignmentId: "2",
    studentEmail: "student@demo.com",
    studentName: "Alex Smith",
    submissionUrl: "https://drive.google.com/file/d/1234567890/view",
    note: "Database schema with detailed documentation and sample data included.",
    status: "pending",
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
]

export function AssignmentProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(demoAssignments)
  const [submissions, setSubmissions] = useState<Submission[]>(demoSubmissions)

  useEffect(() => {
    // Load data from localStorage
    const storedAssignments = localStorage.getItem("assignments")
    const storedSubmissions = localStorage.getItem("submissions")

    if (storedAssignments) {
      const parsed = JSON.parse(storedAssignments)
      setAssignments(
        parsed.map((a: any) => ({
          ...a,
          deadline: new Date(a.deadline),
          createdAt: new Date(a.createdAt),
        })),
      )
    }

    if (storedSubmissions) {
      const parsed = JSON.parse(storedSubmissions)
      setSubmissions(
        parsed.map((s: any) => ({
          ...s,
          submittedAt: new Date(s.submittedAt),
        })),
      )
    }
  }, [])

  const addAssignment = async (assignmentData: Omit<Assignment, "id" | "createdAt">) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    const updatedAssignments = [...assignments, newAssignment]
    setAssignments(updatedAssignments)
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments))
  }

  const addSubmission = async (submissionData: Omit<Submission, "id" | "status" | "submittedAt">) => {
    const newSubmission: Submission = {
      ...submissionData,
      id: Date.now().toString(),
      status: "pending",
      submittedAt: new Date(),
    }

    const updatedSubmissions = [...submissions, newSubmission]
    setSubmissions(updatedSubmissions)
    localStorage.setItem("submissions", JSON.stringify(updatedSubmissions))
  }

  const updateSubmission = async (id: string, status: "pending" | "accepted" | "rejected", feedback?: string) => {
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, status, feedback } : submission,
    )

    setSubmissions(updatedSubmissions)
    localStorage.setItem("submissions", JSON.stringify(updatedSubmissions))
  }

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        submissions,
        addAssignment,
        addSubmission,
        updateSubmission,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  )
}

export function useAssignments() {
  const context = useContext(AssignmentContext)
  if (context === undefined) {
    throw new Error("useAssignments must be used within an AssignmentProvider")
  }
  return context
}
