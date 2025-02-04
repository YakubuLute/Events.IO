/* eslint-disable lingui/no-unlocalized-strings */
import { Navigate } from 'react-router-dom'
import { useGetMe } from '../../../queries/useGetMe'

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const me = useGetMe()

  if (me.isLoading) {
    return <div>Loading...</div> // or a loading spinner
  }

  if (!me.isSuccess) {
    return <Navigate to='/auth/login' replace={true} />
  }

  return children
}

export default AuthGuard
