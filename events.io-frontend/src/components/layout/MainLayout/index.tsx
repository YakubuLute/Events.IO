'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Header from '../Header';
import SideBar from '../SideBar/SideBar';

interface Props {
  children: React.ReactNode;
  verificationStatistics?: React.ReactNode;
}

export default function MainLayout({
  children,
  verificationStatistics,
}: Props) {
  const pathname = usePathname();
  const [isAttendPage, setIsAttendPage] = useState(false);

  useEffect(() => {
    if (pathname) {
      const pathArr = pathname.split('/').filter((segment) => segment !== '');
      if (pathArr[pathArr.length - 1] === 'attend') {
        setIsAttendPage(true);
      } else {
        setIsAttendPage(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="root-wrapper">
      {isAttendPage ? null : <SideBar />}
      <div className="right-main_wrapper">
        {isAttendPage ? null : <Header />}
        {isAttendPage ? null : verificationStatistics}
        <main className="main-header-university">{children}</main>
      </div>
    </div>
  );
}
