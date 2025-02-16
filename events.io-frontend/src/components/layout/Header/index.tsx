'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/system';

import { CustomButton } from '@/components/shared';
import CloseNav from '@/components/shared/icons/closenav';
import Menu from '@/components/shared/icons/menu';
import OpenNav from '@/components/shared/icons/opennav';
import { useGetCurrentUserBasicInfo } from '@/hooks/shared';
import { useHeaderContext } from '@/contexts/headerContext';
import { UserTypes } from '@/@types/shared/type';
import candidateHeaderStyles from '@/app/candidate/candidate.module.scss';
import employerHeaderStyles from '@/app/employer/(index)/employer.module.scss';
import searchCandidateHeaderStyles from '@/app/search-candidate/search-candidate.module.scss';
import universityHeaderStyles from '@/app/university/university.module.scss';
import {
  candidateNavLink,
  candidateSettingsLinks,
  employerNavLink,
  employerSettingsLinks,
  roleOptionsNavLink,
  univercityNavLink,
  universitySettingsLinks,
} from '@/constants/NavLink';
import { DefaultRoles } from '@/enums/shared';
// import { userDecoded } from '@/utils/jwtDecode';
import { getCurrentUser } from '@/utils';
import FeedbackButton from './Feedback/FeedbackButton';
import styles from './header.module.scss';
import { HeaderLogoBurger } from './HeaderLogoBurger';
import { HeaderMenuLinkBar } from './HeaderMenuLinkBar';
import HeaderMobileNav from './HeaderMobileNav';
import { HeaderRightActions } from './HeaderRightActions';
import { CandidateHeaderSearchBar } from './SearchBar/candidateHeaderSearchBar';
import { UniversityHeaderSearchBar } from './SearchBar/universityHeaderSearchBar';

type Props = {
  isPublic?: boolean;
};

const pathRegex = /^\/[a-zA-Z0-9-]+(\?.*)?$/;

const Header = ({ isPublic }: Props) => {
  const { screenSize } = useHeaderContext();
  const { sideBarOpen } = useHeaderContext();
  const isLargeScreen = screenSize === 'desktop';

  const path = window.location.pathname + window.location.search;
  const isVCardPath = pathRegex.test(path);

  // const userType = userDecoded?.userType;
  const user = getCurrentUser();
  const { data: currentUserInfo } = useGetCurrentUserBasicInfo();

  const [currentUserRole, setCurrentUserRole] = useState<string | null>(
    `${user?.role}`
  );

  useEffect(() => {
    if (user && user?.role) {
      return setCurrentUserRole(user?.role?.toLowerCase());
    }
  }, [user, currentUserRole]);

  const filterUniversitySettingsLinks = () => {
    if (currentUserRole !== DefaultRoles.OWNER) {
      return universitySettingsLinks.slice(
        0,
        universitySettingsLinks.length - 3
      );
    } else {
      return universitySettingsLinks;
    }
  };
  const filteredLinks = filterUniversitySettingsLinks();

  let leftContentData = (
    <div className={searchCandidateHeaderStyles.headerLeftContainer}>
      <HeaderLogoBurger showLabel />
    </div>
  );
  let middleContentData = (
    // <div className={searchCandidateHeaderStyles.headerMiddleContainer}>
    <HeaderMenuLinkBar
      navItems={roleOptionsNavLink}
      menuClass="role_options"
      isRoot
    />
    // </div>
  );
  let rightContentData = (
    <div className={styles.home_login_button}>
      <CustomButton
        label="Login"
        href="/candidate/signin"
        type={'button'}
        buttonClass="login_button"
        hasLink
      />
      <Menu />
    </div>
  );

  const pathname = usePathname().replaceAll('/en', '').replaceAll('/fr', '');

  // Employer Header
  const setEmployerHeaderContent = () => {
    leftContentData = (
      <Stack
        direction="row"
        display={{ sx: 'flex', xl: '' }}
        width={{ xxl: '240px' }}
        spacing={2}
      >
        <HeaderLogoBurger haveSidebar platform="employer" />
      </Stack>
    );

    middleContentData = (
      <div className={employerHeaderStyles.headerMiddleContainer}>
        <HeaderMenuLinkBar
          navItems={employerNavLink}
          menuClass="employee_menu"
        />
      </div>
    );

    rightContentData = (
      <div className={employerHeaderStyles.headerRightContainer}>
        <HeaderRightActions
          verification
          invite={false}
          university={false}
          referrals={false}
          center={false}
          wallet
          company
          settings={employerSettingsLinks}
          platform="employer"
        />
      </div>
    );
  };

  // University Header
  const setUniversityHeaderContent = () => {
    leftContentData = (
      <Stack
        direction="row"
        display={{ sx: 'flex', xl: '' }}
        width={{ xxl: '210px' }}
        spacing={2}
      >
        <HeaderLogoBurger haveSidebar platform="university" />
      </Stack>
    );

    middleContentData = (
      <div className={universityHeaderStyles.headerMiddleContainer}>
        <div className={universityHeaderStyles.search_wrapper}>
          <UniversityHeaderSearchBar />
        </div>
        <HeaderMenuLinkBar
          navItems={univercityNavLink}
          menuClass="univertity_menu"
        />
      </div>
    );

    rightContentData = (
      <div className={universityHeaderStyles.headerRightContainer}>
        <HeaderRightActions
          verification
          invite={false}
          company={false}
          wallet
          referrals={false}
          university
          center={false}
          settings={filteredLinks}
          platform="university"
        />
      </div>
    );
  };

  // Candidate Header
  const setCandidateHeaderContent = () => {
    leftContentData = (
      <Stack
        direction="row"
        display={{ sx: 'flex', xl: '' }}
        width={{ xxl: '195px' }}
        spacing={2}
        alignItems={'center'}
      >
        <HeaderLogoBurger haveSidebar platform="candidate" showLabel />
        {isLargeScreen ? sideBarOpen ? <CloseNav /> : <OpenNav /> : null}
      </Stack>
    );

    middleContentData = (
      <div className={candidateHeaderStyles.headerMiddleContainer}>
        <HeaderMenuLinkBar
          navItems={candidateNavLink}
          menuClass="candidate_menu"
        />
      </div>
    );

    rightContentData = (
      <div className="flex gap-x-2">
        <FeedbackButton
          userType={UserTypes.CANDIDATE}
          sx={{ display: { xs: 'none', xl: 'flex' } }}
        />
        <div className={candidateHeaderStyles.search_wrapper}>
          <CandidateHeaderSearchBar />
        </div>
        <HeaderRightActions
          verification={false}
          invite={false}
          wallet={false}
          university={false}
          referrals
          center
          company={false}
          settings={candidateSettingsLinks}
          platform="candidate"
        />
      </div>
    );
  };

  const setHeaderSearCandidateContent = () => {
    leftContentData = (
      <div className={searchCandidateHeaderStyles.headerLeftContainer}>
        <HeaderLogoBurger haveSidebar platform="candidate" />
      </div>
    );

    middleContentData = (
      <div className={searchCandidateHeaderStyles.headerMiddleContainer}>
        <HeaderMenuLinkBar
          navItems={roleOptionsNavLink}
          menuClass="role_options"
        />
      </div>
    );
  };

  const [navbarOptions, setNavbarOptions] = useState([...roleOptionsNavLink]);

  if (!isPublic && currentUserInfo?.userType) {
    if (
      pathname.startsWith('/employer') ||
      currentUserInfo?.userType === UserTypes.EMPLOYEE
    ) {
      setEmployerHeaderContent();
      if (navbarOptions !== employerNavLink) setNavbarOptions(employerNavLink);
    } else if (
      pathname.startsWith('/university') ||
      currentUserInfo?.userType === UserTypes.STAFF
    ) {
      setUniversityHeaderContent();
      if (navbarOptions !== univercityNavLink)
        setNavbarOptions(univercityNavLink);
    } else if (
      pathname.startsWith('/candidate') ||
      currentUserInfo?.userType === UserTypes.CANDIDATE
    ) {
      setCandidateHeaderContent();
      if (navbarOptions !== candidateNavLink)
        setNavbarOptions(candidateNavLink);
    } else if (pathname.startsWith('/employer/search-candidate')) {
      setHeaderSearCandidateContent();
      if (navbarOptions !== employerNavLink) setNavbarOptions(employerNavLink);
    }
  }

  return isVCardPath ? null : (
    <AppBar
      color="inherit"
      component="header"
      // position="sticky"
      classes={{ root: styles.header_container }}
      sx={{
        boxShadow: 'none',
        top: 0,
        position: { xs: 'sticky', xl: 'fixed' },
      }}
    >
      <Toolbar classes={{ root: styles.header_toolbar }}>
        <>{leftContentData}</>
        <>{middleContentData}</>
        <>{rightContentData}</>
      </Toolbar>

      <HeaderMobileNav univercityNavLink={navbarOptions} />
    </AppBar>
  );
};

export default Header;
