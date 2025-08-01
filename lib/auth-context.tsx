"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "instructor" | "student"
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string, role: "instructor" | "student") => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users
const demoUsers: User[] = [
  {
    id: "1",
    email: "instructor@demo.com",
    name: "Mahabub Alam",
    role: "instructor",
  },
  {
    id: "2",
    email: "student@demo.com",
    name: "Farhan Shahriyar",
    role: "student",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(demoUsers)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Load stored users
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication logic
    const demoCredentials = [
      { email: "instructor@demo.com", password: "instructor123" },
      { email: "student@demo.com", password: "student123" },
    ]

    const validCredential = demoCredentials.find((cred) => cred.email === email && cred.password === password)

    if (validCredential) {
      const foundUser = users.find((u) => u.email === email)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("user", JSON.stringify(foundUser))
        return true
      }
    }

    // Check registered users
    const registeredUser = users.find((u) => u.email === email)
    if (registeredUser && password) {
      // Simple password check for demo
      setUser(registeredUser)
      localStorage.setItem("user", JSON.stringify(registeredUser))
      return true
    }

    return false
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: "instructor" | "student",
  ): Promise<boolean> => {
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
