"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogIn, Loader2 } from "lucide-react"

export function LoginButton() {
  const { signIn, isLoading } = useAuth()

  return (
    <Button onClick={signIn} disabled={isLoading} variant="outline" size="sm" className="gap-2 bg-transparent">
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  )
}
