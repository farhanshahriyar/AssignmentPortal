// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { InstructorDashboard } from "@/components/instructor-dashboard"
// import { StudentDashboard } from "@/components/student-dashboard"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default function DashboardPage() {
//   const { user } = useAuth()

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//           <p className="text-gray-600">Please sign in to access the dashboard.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="flex-1 overflow-auto">
//         {user.role === "instructor" ? <InstructorDashboard /> : <StudentDashboard />}
//       </main>
//     </SidebarProvider>
//   )
// }


import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { InstructorDashboard } from "@/components/instructor-dashboard";
import { StudentDashboard } from "@/components/student-dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      
      <main className="flex-1 overflow-auto">
        {session.user.role === "INSTRUCTOR" ? <InstructorDashboard /> : <StudentDashboard />}
      </main>
    </SidebarProvider>
  );
}

