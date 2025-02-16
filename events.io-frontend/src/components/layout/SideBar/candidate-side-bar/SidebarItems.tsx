import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { CustomBadge } from '@/components/shared';
import { useGetCandidateSidebarStat } from '@/hooks/candidate';
import { useHeaderContext } from '@/contexts/headerContext';
import { MenuItem } from '../sideBar.interface';
import styles from './mainSideBar.module.scss';

interface Props {
  sideBarContent: MenuItem[];
}

const SidebarItems = ({ sideBarContent }: Props) => {
  const { data: candidateSideStatistics } = useGetCandidateSidebarStat();
  const { sideBarOpen, setSideBarOpen, screenSize } = useHeaderContext();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname || ''); // we select the first item as default
  const isSmallScreen = screenSize === 'mobile' || screenSize === 'tablet';

  const onSetActiveLink = (link: string) => {
    localStorage.setItem('activeLink', link);
    setActiveLink(link);
    if (isSmallScreen) {
      setSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem('activeLink', pathname || '');
      const link = localStorage.getItem('activeLink') as string;
      setActiveLink(link || pathname || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sideBardata = sideBarContent.map((item) => {
    const menuList = item.menuList.map((menu) => {
      if (menu.label === 'Calendar') {
        return {
          ...menu,
          count: candidateSideStatistics?.todayCalendarItems,
        };
      }
      if (menu.label === 'Reviews') {
        return {
          ...menu,
          count: candidateSideStatistics?.reviews,
        };
      }
      if (menu.label === 'Messages') {
        return {
          ...menu,
          count: candidateSideStatistics?.unreadMessages,
        };
      }
      if (menu.label === 'Favorited') {
        return {
          ...menu,
          count: candidateSideStatistics?.bookmarks,
        };
      }
      if (menu.label === 'recommendations') {
        return {
          ...menu,
          count: candidateSideStatistics?.recommendations,
        };
      }
      if (menu.label === 'Shortlisted') {
        return {
          ...menu,
          count: candidateSideStatistics?.shortlists,
        };
      }
      if (menu.label === 'Hires') {
        return {
          ...menu,
          count: candidateSideStatistics?.hires,
        };
      }
      if (menu.label === 'Matches') {
        return {
          ...menu,
          count: candidateSideStatistics?.matches,
        };
      }
      if (menu.label === 'Interviews') {
        return {
          ...menu,
          count: candidateSideStatistics?.pendingInterviews,
        };
      }
      if (menu.label === 'Offers') {
        return {
          ...menu,
          count: candidateSideStatistics?.pendingOffers,
        };
      }
      if (menu.label === 'Appointments') {
        return {
          ...menu,
          count: candidateSideStatistics?.upcomingAppointments,
        };
      }
      return menu;
    });
    return {
      ...item,
      menuList,
    };
  });

  return (
    <>
      {sideBardata?.length > 0 &&
        sideBardata?.map((data) => (
          <div key={data.groupLabel} className={styles.sideNavGroup}>
            <div className={styles.groupBox}>
              <ListItemText
                primary={data?.groupLabel}
                className={styles.groupLabel}
              />
              {data?.groupIcon && (
                <IconButton
                  className={`${
                    !sideBarOpen && styles.hidden
                  } bg-[#ECECED] mr-2 !p-1`}
                  LinkComponent={Link}
                  href={data?.groupLink as string}
                >
                  {data?.groupIcon}
                </IconButton>
              )}
            </div>
            <List className={styles.listItemBox}>
              {data.menuList?.map((item, index: number) => (
                <Link key={index} href={item.url}>
                  <ListItem disablePadding className={styles.item}>
                    <ListItemButton
                      className={`${styles.itemBtn} ${
                        !sideBarOpen && styles.small
                      } ${item.url === activeLink && styles.active}`}
                      onClick={() => onSetActiveLink(item.url)}
                    >
                      <div className={styles.itemTitleBox}>
                        <ListItemIcon className={styles.itemIcon}>
                          {item.icon}
                        </ListItemIcon>

                        {sideBarOpen && (
                          <ListItemText
                            primary={item.label}
                            className={`${styles.itemLabel} ${
                              !sideBarOpen && styles.hidden
                            } `}
                          />
                        )}
                      </div>
                      {(item?.count || item?.count === 0) && (
                        <CustomBadge
                          count={item?.count}
                          name={item.label}
                          iconBtnClass="aside_left_btn"
                          badgeClass="aside_badge"
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        ))}
    </>
  );
};

export default SidebarItems;
