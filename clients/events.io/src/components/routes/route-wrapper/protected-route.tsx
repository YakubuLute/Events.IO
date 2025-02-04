/* eslint-disable lingui/no-unlocalized-strings */
import { Navigate } from 'react-router-dom'
import { useGetMe } from '../../../queries/useGetMe'

export const ProtectedRoute: React.FC = () => {
  const me = useGetMe()

  if (me.isPending) {
    return null
  }

  // If user is not authenticated, redirect to login
  if (!me.isSuccess) {
    return <Navigate to='/auth/login' replace />
  }

  return <Outlet />
}
