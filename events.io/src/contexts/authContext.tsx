// src/contexts/auth-context.tsx
'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { useCurrentUser } from '@/hooks/hooks'
import { jwtVerify } from 'jose'
import { IUser } from '@/interface/interface'

interface AuthContextType {
  user: Partial<IUser> | null
  setUser: (user: Partial<IUser> | null) => void
  isLoading: boolean
  userError: string | null
  setUserError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider ({
  children,
  isAuthenticated: initialIsAuthenticated
}: {
  children: React.ReactNode
  isAuthenticated?: boolean
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Partial<IUser> | null>(null)
  const [userError, setUserError] = useState<string | null>(null)

  // Use initialIsAuthenticated from server-side props, falling back to false if not provided
  const isAuthenticated = initialIsAuthenticated || false

  // Use useCurrentUser conditionally based on isAuthenticated
  const {
    data: currentUser,
    isLoading: isUserLoading,
    error
  } = useCurrentUser(isAuthenticated)

  // Sync user state with useCurrentUser, but only if authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true)
      setUserError(null)

      try {
        if (!isAuthenticated) {
          setUser(null)
          setIsLoading(false)
          return
        }

        // If authenticated, useCurrentUser will fetch the user
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
      } catch (error) {
        console.error('Error initializing auth:', error)
        setUser(null)
        setUserError('Authentication failed. Please log in again.')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [currentUser, isUserLoading, isAuthenticated])

  // Handle errors from useCurrentUser
  useEffect(() => {
    if (error) {
      console.error('Error fetching user data', error)
      setUserError(error.message)
      setUser(null) // Clear user on error (e.g., 401 or 400)
    } else if (!error) {
      setUserError(null)
    }
  }, [error])

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
