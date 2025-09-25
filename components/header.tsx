"use client"

import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { LoginButton } from "@/components/login-button"
import { UserMenu } from "@/components/user-menu"

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/tasker-logo.png" alt="Tasker Logo" width={120} height={40} className="h-8 w-auto" />
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Welcome, {user.name.split(" ")[0]}</span>
                <UserMenu />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
