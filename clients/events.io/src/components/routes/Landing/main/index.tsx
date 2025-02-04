import { Navigate, Outlet } from 'react-router-dom'
import classes from './Home.module.scss'
import { t } from '@lingui/macro'
import { useGetMe } from '../../../../queries/useGetMe.ts'
import { LanguageSwitcher } from '../../../common/LanguageSwitcher/index.tsx'

const AuthLayout = () => {
  const me = useGetMe()
  if (me.isSuccess) {
    return <Navigate to={'/manage/events'} />
  }

  return (
    <>
      <header>
        <div className={classes.languageSwitcher}>
          <LanguageSwitcher />
        </div>
      </header>
      <main className={classes.container}>
        <div className={classes.logo}>
          <h1>{t`Events.IO`}</h1>
        </div>
        <div className={classes.wrapper}>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout
