/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { IUser } from '@/interface/interface'
import api from '@/services/auth.service'

interface AuthContextType {
  user: Partial<IUser> | null
  setUser: (user: Partial<IUser> | null) => void
  isLoading: boolean
  isAuthenticated: boolean
  userError: string | null
  setUserError: (error: string | null) => void
  logout: () => Promise<void>
  refreshUserData: () => Promise<void>
}

// Initial context value to prevent hydration issues
const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {},
  isLoading: true,
  isAuthenticated: false,
  userError: null,
  setUserError: () => {},
  logout: async () => {},
  refreshUserData: async () => {}
}

const AuthContext = createContext<AuthContextType>(initialAuthContext)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<Partial<IUser> | null>(null)
  const [userError, setUserError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Function to fetch user data
  const fetchUserData = useCallback(async () => {
    setIsLoading(true)
    setUserError(null)

    try {
      const response = await api.get('/auth/check')
      const { isAuthenticated: authStatus, user: authUser } = response.data

      setIsAuthenticated(authStatus)

      if (authStatus && authUser) {
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
      return { success: true }
    } catch (error: any) {
      console.error('Error checking auth:', error)
      setUser(null)
      setIsAuthenticated(false)
      setUserError(
        error.message || 'Authentication failed. Please log in again.'
      )
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Function to refresh user data (can be called after actions that change user state)
  const refreshUserData = useCallback(async () => {
    return fetchUserData()
  }, [fetchUserData])

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
      setUserError('Logout failed. Please try again.')
    }
  }, [])

  // Effect for initial data fetch - only runs once
  useEffect(() => {
    // Set mounted to true to indicate client-side rendering
    setMounted(true)

    // Only fetch on client-side to avoid hydration mismatches
    if (typeof window !== 'undefined') {
      fetchUserData()
    }
  }, [fetchUserData])

  useEffect(() => {
    console.log('AuthProvider mounted, fetching user data...')
    setMounted(true)

    if (typeof window !== 'undefined') {
      fetchUserData().then(result => {
        console.log('Auth data fetched:', result)
      })
    }
  }, [fetchUserData])

  // If not mounted yet (server-side), return the initial provider
  // This prevents hydration mismatch errors
  if (!mounted) {
    return (
      <AuthContext.Provider value={initialAuthContext}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated,
        userError,
        setUserError,
        logout,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
