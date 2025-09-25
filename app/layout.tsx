import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tasker - Task Management System",
  description: "Effortlessly organize, prioritize, and conquer tasks with Tasker",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/tasker-logo.png",
    apple: "/tasker-logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
