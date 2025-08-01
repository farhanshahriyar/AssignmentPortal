import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { AssignmentProvider } from "@/lib/assignment-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Assignment Submission Portal",
  description: "A comprehensive platform for managing assignments and submissions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AssignmentProvider>{children}</AssignmentProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
