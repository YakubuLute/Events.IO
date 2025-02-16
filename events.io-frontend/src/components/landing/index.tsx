'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from '@mui/system';

import Header from '@/components/layout/Header/';
import { getCurrentUser } from '@/utils';
import styles from './landing.module.scss';
import LandingFooter from './landingFooter';
import LandingMain from './landingMain';

export default function LandingComponent() {
  const user = getCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.userType === 'CANDIDATE') {
      router.push('/candidate/dashboard');
    } else if (user?.userType === 'EMPLOYEE') {
      router.push('/employer/dashboard');
    } else if (user?.userType === 'STAFF') {
      router.push('/university/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box className={styles.mainLandingWrapper}>
      {!user ? <Header /> : null}
      <Box className="min-h-screen md:min-h-[100vh] flex flex-col">
        <Container className="max-w-[1208px]">
          {!user ? <LandingMain /> : null}
        </Container>
        {!user ? <LandingFooter /> : null}
      </Box>
    </Box>
  );
}
