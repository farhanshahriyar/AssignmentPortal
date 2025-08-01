import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, FileText, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Assignment Submission Portal</h1>
          <p className="text-xl text-gray-600 mb-8">Streamline assignment management for instructors and students</p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Create Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Instructors can easily create and manage assignments with deadlines</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <CardTitle>Submit Work</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Students can submit assignments and track their progress</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>Review & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Instructors can review submissions and provide detailed feedback</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Visual insights into submission statuses and progress</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Demo Accounts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Instructor Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Email:</strong> instructor@demo.com
                </p>
                <p className="mb-4">
                  <strong>Password:</strong> instructor123
                </p>
                <p className="text-sm text-gray-600">
                  Access instructor features: create assignments, review submissions, provide feedback
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Student Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Email:</strong> student@demo.com
                </p>
                <p className="mb-4">
                  <strong>Password:</strong> student123
                </p>
                <p className="text-sm text-gray-600">
                  Access student features: view assignments, submit work, track progress
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
