// src/contexts/auth-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useCurrentUser } from '@/hooks/hooks'
import { IUser } from '@/interface/interface'

interface AuthContextType {
  user: Partial<IUser> | null
  setUser: (user: Partial<IUser> | null) => void
  isLoading: boolean
  userError: string | null
  setUserError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Partial<IUser> | null>(null)
  const [userError, setUserError] = useState<string | null>(null)

  const {
    data: currentUser,
    isLoading: isUserLoading,
    error
  } = useCurrentUser()

  useEffect(() => {
    if (currentUser && !isUserLoading) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        phoneNumber: currentUser.phoneNumber,
        countryCode: currentUser.countryCode,
        role: currentUser.role,
        isAdmin: currentUser.isAdmin,
        isVerified: currentUser.isVerified,
        createdAt: currentUser.createdAt
      })
    } else if (!currentUser && !isUserLoading) {
      setUser(null)
    }
    if (error) {
      setUserError(error.message)
    } else if (!error) {
      setUserError(null)
    }
    setIsLoading(isUserLoading)
  }, [currentUser, isUserLoading, userError, setUserError, error])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, setUser, userError, setUserError }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
