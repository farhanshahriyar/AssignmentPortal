"use client"

import type * as React from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  BarChart3,
  FileText,
  Users,
  Settings,
  LogOut,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Home,
  GraduationCap,
  ChevronUp,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context"
import { useAssignments } from "@/lib/assignment-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, signOut } = useAuth()
  const { assignments, submissions } = useAssignments()
  const router = useRouter()

  if (!user) return null

  const studentSubmissions = submissions.filter((s) => s.studentEmail === user.email)

  const instructorNavItems = [
    {
      title: "Overview",
      icon: Home,
      isActive: true,
    },
    {
      title: "Assignments",
      icon: BookOpen,
      badge: assignments.length,
    },
    {
      title: "Submissions",
      icon: Users,
      badge: submissions.filter((s) => s.status === "pending").length,
    },
    {
      title: "Analytics",
      icon: BarChart3,
    },
  ]

  const studentNavItems = [
    {
      title: "Overview",
      icon: Home,
      isActive: true,
    },
    {
      title: "Assignments",
      icon: BookOpen,
      badge: assignments.length,
    },
    {
      title: "My Submissions",
      icon: FileText,
      badge: studentSubmissions.length,
    },
  ]

  const studentStats = [
    {
      title: "Pending",
      icon: Clock,
      count: studentSubmissions.filter((s) => s.status === "pending").length,
      color: "text-orange-600",
    },
    {
      title: "Accepted",
      icon: CheckCircle,
      count: studentSubmissions.filter((s) => s.status === "accepted").length,
      color: "text-green-600",
    },
    {
      title: "Rejected",
      icon: XCircle,
      count: studentSubmissions.filter((s) => s.status === "rejected").length,
      color: "text-red-600",
    },
  ]

  const instructorStats = [
    {
      title: "Total Assignments",
      icon: FileText,
      count: assignments.length,
      color: "text-blue-600",
    },
    {
      title: "Pending Reviews",
      icon: Clock,
      count: submissions.filter((s) => s.status === "pending").length,
      color: "text-orange-600",
    },
    {
      title: "Total Submissions",
      icon: Users,
      count: submissions.length,
      color: "text-purple-600",
    },
  ]

  const navItems = user.role === "instructor" ? instructorNavItems : studentNavItems
  const stats = user.role === "instructor" ? instructorStats : studentStats

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Assignment Portal</span>
                  <span className="truncate text-xs capitalize">{user.role} Dashboard</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs text-sidebar-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stats.map((stat) => (
                <SidebarMenuItem key={stat.title}>
                  <SidebarMenuButton tooltip={stat.title}>
                    <stat.icon className={stat.color} />
                    <span className="text-sm">{stat.title}</span>
                    <span className={`ml-auto text-sm font-semibold ${stat.color}`}>{stat.count}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.role === "instructor" && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Create Assignment">
                    <Plus />
                    <span>New Assignment</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Review Submissions">
                    <Users />
                    <span>Review Queue</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg" alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
