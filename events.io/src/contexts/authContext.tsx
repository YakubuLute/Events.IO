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
import { IUser } from '@/interface/interface'
import api from '@/services/auth.service' // Your Axios instance

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Fetch auth state from /api/auth/check
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      setUserError(null)

      try {
        const response = await api.get('/api/auth/check')
        const { isAuthenticated, user: authUser } = response.data

        setIsAuthenticated(isAuthenticated)
        if (isAuthenticated && authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.name || '',
            phoneNumber: authUser.phoneNumber,
            countryCode: authUser.countryCode,
            role: authUser.role,
            isAdmin: authUser.isAdmin,
            isVerified: authUser.isVerified,
            createdAt: authUser.createdAt
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
        setUserError('Authentication failed. Please log in again.')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Use useCurrentUser conditionally based on isAuthenticated
  const {
    data: currentUser,
    isLoading: isUserLoading,
    error
  } = useCurrentUser(isAuthenticated)

  // Sync user state with useCurrentUser, but only if authenticated
  useEffect(() => {
    if (currentUser && !isUserLoading && isAuthenticated) {
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
