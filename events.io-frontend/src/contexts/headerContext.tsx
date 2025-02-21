'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useMediaQuery } from '@mui/material';

type ScreenSizes = 'mobile' | 'tablet' | 'laptop' | 'desktop';

interface HeaderContextProps {
  sideBarOpen: boolean;
  setSideBarOpen: (sideBarOpen: boolean) => void;
  headerOpen: boolean;
  setHeaderOpen: (headerOpen: boolean) => void;
  roleHeaderSelected: 'employer' | 'university' | 'candidate';
  setRoleHeaderSelected: (
    roleHeaderSelected: 'employer' | 'university' | 'candidate'
  ) => void;
  isLargeScreen: boolean;
  screenSize: ScreenSizes;
}

export const HeaderContext = React.createContext<
  HeaderContextProps | undefined
>(undefined);

export const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
};

const { Provider } = HeaderContext;

const HeaderProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const aboveMd = useMediaQuery('(min-width:1280px)');
  const [headerOpen, setHeaderOpen] = useState<boolean>(false);
  const [roleHeaderSelected, setRoleHeaderSelected] = useState<
    'employer' | 'university' | 'candidate'
  >('employer');
  const [isLargeScreen, setLargeScreen] = useState(true);
  const [screenSize, setScreenSize] = useState<ScreenSizes>('desktop');

  const handleScreenSize = useCallback(() => {
    if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setScreenSize('mobile');
    } else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
      setScreenSize('tablet');
    } else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
      setScreenSize('laptop');
    } else if (window.innerWidth > 1024) {
      setScreenSize('desktop');
    }
  }, []);

  useEffect(() => {
    if (sideBarOpen && !aboveMd) setSideBarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerOpen]);

  useEffect(() => {
    if (aboveMd) {
      setSideBarOpen(true);
      setLargeScreen(true);
    } else {
      setSideBarOpen(false);
      setLargeScreen(false);
    }
  }, [aboveMd]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleScreenSize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleScreenSize);

    return () => {
      window.removeEventListener('resize', handleScreenSize);
    };
  }, [screenSize, handleScreenSize]);

  const providerValues: HeaderContextProps = {
    sideBarOpen,
    setSideBarOpen,
    headerOpen,
    setHeaderOpen,
    roleHeaderSelected,
    setRoleHeaderSelected,
    isLargeScreen,
    screenSize,
  };

  return <Provider value={providerValues}>{children}</Provider>;
};

export default HeaderProvider;
