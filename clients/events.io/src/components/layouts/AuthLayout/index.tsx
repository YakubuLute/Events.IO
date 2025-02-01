import { Navigate, Outlet } from 'react-router-dom'
import classes from './Auth.module.scss'
import { t } from '@lingui/macro'
import { useGetMe } from '../../../queries/useGetMe.ts'
import { PoweredByFooter } from '../../common/PoweredByFooter'
import { LanguageSwitcher } from '../../common/LanguageSwitcher'

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
          <PoweredByFooter />
        </div>
      </main>
    </>
  )
}

export default AuthLayout
