import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import {
  // Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { AddMore } from '@/components/employer';
import { HeaderLogoBurger } from '@/components/layout/Header/HeaderLogoBurger';
import { CustomBadge, CustomSkeleton } from '@/components/shared';
import CustomSearchInput from '@/components/shared/customSearchInput';
import { useHeaderContext } from '@/contexts/headerContext';
import {
  // UniversityFullProfileResponseDTO,
  useGetClassYears,
  useGetUniversityFullProfile,
} from '@/hooks/university';
import { ClassYearsResponseDTO } from '@/hooks/university/dtos/res/university.dto.res';
import styles from './universitysidebar.module.scss';

const drawerWidth = 240;
const drawerWidthMini = 0;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidthMini,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  whiteSpace: 'nowrap',
  display: 'flex',
  overflow: 'hidden',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UniversitySideBar = () => {
  const { sideBarOpen } = useHeaderContext();
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const paramsClassYear = searchParams.get('year');

  const { data: profileData, isPending: profileLoading } =
    useGetUniversityFullProfile();

  const { data: classesData, isPending: classesLoading } = useGetClassYears({
    filterBy: 'joined',
  });
  const studentsCount: ClassYearsResponseDTO = classesData?.data;

  const [tempClasses, setTempClasses] = useState<ClassYearsResponseDTO | null>(
    null
  );

  useEffect(() => {
    setTempClasses(studentsCount);
  }, [studentsCount]);

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open={sideBarOpen}
        id="aside"
        classes={{ root: styles.sidebar_container }}
        sx={{
          // width: { xxl: drawerWidth },
          position: { xs: 'absolute', xl: 'relative' },
          zIndex: { xs: 10, lg: 7 },
          top: 0,
        }}
      >
        <Stack spacing={3} className={styles.vaurse_logo}>
          <HeaderLogoBurger haveSidebar />
        </Stack>

        <Box component="div" className={styles.univ_profile}>
          <Stack direction="row" className={styles.univ_profile_logo}>
            {profileLoading ? (
              <CustomSkeleton variant="rounded" width={128} height={128} />
            ) : (
              profileData?.logo && (
                <Image
                  key={profileData.logo}
                  src={`${profileData.logo}?timestamp=${new Date().getTime()}`}
                  unoptimized
                  alt={`University logo ${profileData?.logo} `}
                  width={128}
                  height={128}
                />
              )
            )}
          </Stack>
          <>
            {profileLoading ? (
              <>
                <CustomSkeleton variant="text" height={24} />
                <CustomSkeleton variant="text" height={20} />
              </>
            ) : (
              <>
                <Typography
                  sx={{ textTransform: 'capitalize', textWrap: 'wrap' }}
                  className={styles.univ_profile_name}
                >
                  {profileData?.institutionName}
                </Typography>

                <Stack direction="row" className={styles.univ_profile_location}>
                  <PinDropOutlinedIcon />
                  <Typography className={styles.location}>
                    {profileData?.location.state},{' '}
                    {profileData?.location.country}
                  </Typography>
                </Stack>
              </>
            )}
          </>
        </Box>

        <Box className={styles.classes_container}>
          <div className={styles.classes_title_add_btn}>
            <ListItemText
              primary="Class Year"
              className={styles.classes_title}
            />
            <AddMore
              label=""
              className="add_class_year"
              onClick={() => router.push('/university/onboard')}
            />
          </div>
          {!!tempClasses?.items.length && (
            <div className={styles.searchInputWrapper}>
              <CustomSearchInput
                placeholder="Search..."
                searchClass="employee_search"
                show
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTempClasses({
                    items: [
                      ...(tempClasses?.items || []).filter(
                        (classe: {
                          name: number;
                          value: number;
                          totalStudents: number;
                        }) =>
                          classe.name.toString().startsWith(e?.target?.value)
                      ),
                    ],
                  })
                }
              />
            </div>
          )}

          <List>
            {classesLoading ? (
              Array.from({ length: 6 })
                .fill('')
                .map((_, index) => (
                  <CustomSkeleton variant="text" height={36} key={index} />
                ))
            ) : (
              <>
                {tempClasses?.items.map((classYear, index: number) => {
                  return (
                    <Link
                      key={index}
                      passHref
                      legacyBehavior
                      href={{
                        pathname: '/university/classes',
                        query: { year: classYear?.name },
                      }}
                    >
                      <ListItem
                        disablePadding
                        sx={{
                          py: 0,
                          display: 'block',
                          '&:hover, &:focus': { backgroundColor: 'none' },
                        }}
                        className={`${styles.item} ${paramsClassYear == classYear.name.toString() && styles.active}`}
                      >
                        <ListItemButton
                          selected={paramsClassYear == classYear.toString()}
                          className={styles.item_btn}
                          sx={{
                            maxHeight: 36,
                            justifyContent: sideBarOpen ? 'initial' : 'center',
                            pr: 2.5,
                            pl: 1,
                            py: 0,
                            my: sideBarOpen ? 0 : 1,
                          }}
                        >
                          <ListItemText
                            primary={`Class of ${classYear.name}`}
                            sx={{ display: sideBarOpen ? 'block' : 'none' }}
                            className={styles.item_label}
                          />
                          <CustomBadge
                            count={classYear.totalStudents}
                            name={`${classYear.totalStudents}`}
                            iconBtnClass="aside_left_btn"
                            badgeClass="aside_badge"
                          ></CustomBadge>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
              </>
            )}
          </List>
        </Box>
        <Box
          component="footer"
          className={`${styles.footer} ${!sideBarOpen && styles.small}`}
          sx={{ display: sideBarOpen ? 'block' : 'none' }}
        >
          <Divider />
          <Typography
            component="p"
            classes={{ root: styles.side_footer_parag }}
            variant="body2"
          >
            About {''}
            <Link href="https://vaurse.com/terms-of-service">Terms {''}</Link> ,
            <Link href="https://vaurse.com/privacy-policy">Privacy{''} </Link>{' '}
            Help <br />
            &copy; Copyright {new Date().getFullYear()},{''}
            <Link href="https://vaurse.com">Vaurse.com</Link>
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default UniversitySideBar;
