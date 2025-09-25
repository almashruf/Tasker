"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { LoginButton } from "@/components/login-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Welcome to Tasker</CardTitle>
              <CardDescription>Sign in with your Google account to start managing your tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <LoginButton />
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
