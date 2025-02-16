import Link from 'next/link';
import { Divider, Drawer as MuiDrawer, Typography } from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';

// import { HeaderLogoBurger } from '@/components/layout/Header/HeaderLogoBurger';
import CloseNav from '@/components/shared/icons/closenav';
import { useHeaderContext } from '@/contexts/headerContext';
import { MenuItem } from '../sideBar.interface';
import styles from './mainSideBar.module.scss';
import OnboardingLink from './OnboardingLink';
import SidebarItems from './SidebarItems';

const drawerWidth = 220;
const drawerWidthMini = 100;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidthMini,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  sideBarContent: MenuItem[];
  handleContactSupport?: () => void;
}

const LargeScreenSidebar = ({ sideBarContent, handleContactSupport }: Props) => {
  const { sideBarOpen } = useHeaderContext();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={sideBarOpen}
      id="aside"
      classes={{ paper: styles.sidebar_container }}
      sx={{
        position: { xs: 'absolute', xl: 'relative' },
        zIndex: { xs: 100, lg: 7 },
        top: 0,
      }}
    >
      <div className={styles.logoContainerLargeScreen}>
        {/* <HeaderLogoBurger platform="candidate" /> */}
        <CloseNav />
      </div>
      <div className={styles.scrollContainer}>
        <SidebarItems sideBarContent={sideBarContent} />

        <OnboardingLink />
      </div>
      <footer className={`${styles.footer} ${!sideBarOpen && styles.hidden}`}>
        <Divider />
        <Typography
          component="p"
          classes={{ root: styles.side_footer_parag }}
          variant="body2"
          sx={{ padding: '20px 16px' }}
        >
          About {''}
          <Link href="https://vaurse.com/terms-of-service">Terms</Link>,&nbsp;
          <Link href="https://vaurse.com/privacy-policy">Privacy</Link>,&nbsp;
          <Link href="https://vaurse.com/referral-terms">Referral</Link>,&nbsp; <br />
          <span onClick={handleContactSupport}>Support</span>&nbsp;
          &copy;Copyright {new Date().getFullYear()},&nbsp; <br />
          <Link href="https://vaurse.com">Vaurse.com</Link>
        </Typography>
      </footer>
    </Drawer>
  );
};

export default LargeScreenSidebar;
