import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';

import { getCurrentPlatform } from '@/utils/checkBaseUrl';
import { HelpSettingIcon, LogoutIcon, WalletIcon } from '@/components/ui/icons';
import BillIcon from '@/components/ui/icons/billIcon';
import { useAuthCandidateContext } from '@/contexts/authCandidateContext';
import { useAuthEmployerContext } from '@/contexts/authEmployerContext';
import { useAuthUniversityContext } from '@/contexts/authUniversityContext';
import { UserTypes } from '@/@types/shared/type';
import { SettingsItem } from '@/constants/NavLink';
import { DefaultRoles } from '@/enums/shared';
import { getCurrentUser } from '@/utils';
import styles from './accountMenu.module.scss';
import ContactSupportModals from '../ContactSupportModals/ContactSupportModals';

interface AccountMenuProps {
  anchorElUser: null | HTMLElement;
  // setAnchorElUser: (value: null | HTMLElement) => void;
  setAnchorElUser: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  settings: SettingsItem[];
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  anchorElUser,
  setAnchorElUser,
  settings,
}) => {
  const open = Boolean(anchorElUser);
  const router = useRouter();
  const pathName = usePathname();
  const [contactSupport, setContactSupport] = React.useState(false);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const currentPlatform = getCurrentPlatform(pathName);
  const user = getCurrentUser();

  function navigateHandler(link: string) {
    router.push(link);
    handleCloseUserMenu();
  }

  const { logOut: logOutUniversity } = useAuthUniversityContext();
  const { logOut: logOutCandidate } = useAuthCandidateContext();
  const { logOut: logOutEmployer } = useAuthEmployerContext();

  const handleLogout = () => {
    if (
      currentPlatform === 'university' ||
      user?.userType === UserTypes.STAFF
    ) {
      logOutUniversity();
    } else if (
      currentPlatform === 'candidate' ||
      user?.userType === UserTypes.CANDIDATE
    ) {
      logOutCandidate();
    } else if (
      currentPlatform === 'employer' ||
      user?.userType === UserTypes.EMPLOYEE
    ) {
      logOutEmployer();
    }
  };

  // taro its throwing this error. Please fix ----> TypeError: Cannot destructure property 'logOut' of '(0 , authUniversityContext.useAuthUniversityContext
  // const { logOut } = useAuthUniversityContext();

  return (
    <>
      <Menu
        anchorEl={anchorElUser}
        disableScrollLock
        id="account-menu"
        open={open}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        elevation={4}
        sx={{
          overflow: 'visible',
          boxShadow: '0px 16px 20px -8px rgba(17, 12, 34, 0.10)',
          borderRadius: '16px',
          mt: 2.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
          '& .MuiMenu-paper': {
            width: { xs: 240, md: 'auto' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        className={styles.profile_user_menu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.name}
            onClick={() => navigateHandler(setting.link)}
          >
            <ListItemIcon>{setting.iconPath}</ListItemIcon>
            <ListItemText sx={{ mr: 7 }}>{setting.name}</ListItemText>
            <KeyboardArrowRightIcon />
          </MenuItem>
        ))}

        {(user?.userType === UserTypes.EMPLOYEE &&
          user?.role?.toLowerCase() === DefaultRoles.OWNER) ||
          (user?.userType === UserTypes.STAFF &&
            user?.role?.toLowerCase() === DefaultRoles.OWNER) ? (
          <div>
            <Divider />
            <MenuItem
              onClick={() => navigateHandler(`/${currentPlatform}/wallet`)}
            >
              <ListItemIcon>
                <WalletIcon />
              </ListItemIcon>
              <ListItemText sx={{ mr: 7 }}> Wallet</ListItemText>
              <KeyboardArrowRightIcon />
            </MenuItem>
            <MenuItem
              onClick={() => navigateHandler(`/${currentPlatform}/billing`)}
            >
              <ListItemIcon>
                <BillIcon />
              </ListItemIcon>
              <ListItemText sx={{ mr: 7 }}>Billing</ListItemText>
              <KeyboardArrowRightIcon />
            </MenuItem>
          </div>
        ) : null}
        <Divider />

        <MenuItem
          onClick={
            () => setContactSupport(true)
            // navigateHandler(`https://vaurse.com/support`)
          }
        >
          <ListItemIcon>
            <HelpSettingIcon />
          </ListItemIcon>
          <ListItemText sx={{ mr: 7 }}>Contact Support</ListItemText>
          <KeyboardArrowRightIcon />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText sx={{ mr: 7 }}>Sign out</ListItemText>
        </MenuItem>
      </Menu>

      <ContactSupportModals
        contactSupport={contactSupport}
        onCloseSupport={() => setContactSupport(false)}
      />
    </>
  );
};
