import Link from 'next/link'
import { Divider, Drawer as MuiDrawer, Typography } from '@mui/material'

import { HeaderLogoBurger } from '@/components/layout/Header/HeaderLogoBurger'
import CloseNav from '@/components/shared/icons/closenav'
import { useHeaderContext } from '@/contexts/headerContext'
import { MenuItem } from '../sideBar.interface'
import styles from './mainSideBar.module.scss'
import OnboardingLink from './OnboardingLink'
import SidebarItems from './SidebarItems'

interface Props {
  sideBarContent: MenuItem[]
  handleContactSupport?: () => void
}

const SmallScreenSidebar = ({
  sideBarContent,
  handleContactSupport
}: Props) => {
  const { sideBarOpen } = useHeaderContext()

  return (
    <MuiDrawer
      anchor='left'
      open={sideBarOpen}
      id='aside'
      classes={{ paper: styles.sidebar_container }}
      sx={{
        position: { xs: 'absolute', xl: 'relative' },
        zIndex: { xs: 100, lg: 100, xl: 7 },
        top: 0,
        '& .MuiDrawer-paper': {
          width: sideBarOpen ? '250px' : 'auto'
        }
      }}
    >
      <div className={styles.logoContainer}>
        <HeaderLogoBurger showLabel platform='candidate' isSmall />
        <CloseNav />
      </div>

      <SidebarItems sideBarContent={sideBarContent} />
      <OnboardingLink />
      <footer className={`${styles.footer} ${!sideBarOpen && styles.hidden}`}>
        <Divider />
        <Typography
          component='p'
          classes={{ root: styles.side_footer_parag }}
          variant='body2'
          sx={{ padding: '20px 12px' }}
        >
          About {''}
          <Link href='https://vaurse.com/terms-of-service'>Terms</Link>,&nbsp;
          <Link href='https://vaurse.com/privacy-policy'>Privacy</Link>,&nbsp;
          <Link href='https://vaurse.com/referral-terms'>Referral</Link>,&nbsp;
          <span onClick={handleContactSupport}>Support</span>&nbsp;
          &copy;Copyright {new Date().getFullYear()},&nbsp;
          <Link href='https://vaurse.com'>Vaurse.com</Link>
        </Typography>
      </footer>
    </MuiDrawer>
  )
}

export default SmallScreenSidebar
