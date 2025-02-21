'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import {
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  styled,
  Theme,
  Typography
} from '@mui/material'

import { AddMore } from '@/components/employer'
import CreateGroupModal from '@/components/employer/dashboard/create-group/CreateGroupModal'
import CreatePositionModal from '@/components/employer/dashboard/create-position/CreatePositionModal'
import InterviewProcessModal from '@/components/employer/interviews/modals/InterviewProcessModal'
import { HeaderLogoBurger } from '@/components/layout/Header/HeaderLogoBurger'
import { CustomBadge } from '@/components/shared'
import CustomSearchInput from '@/components/shared/customSearchInput'
// import {
//   useCreateJob,
//   useCreatePosition,
//   useGetEmployerJobs,
// } from '@/hooks/employer/useEmployer';
// import { Position, useEmployerContext } from '@/contexts/employerContext';
import { EmployerPositionsItemDTO } from '@/hooks/employer/dtos'
import {
  useEmployerGroups,
  useEmployerPositions
} from '@/hooks/employer/employer-hooks'
// import { useEmployeeAuthContext } from '@/contexts/employerContext/authEmployeeContext';
import { useHeaderContext } from '@/contexts/headerContext'
import styles from './jobSideBar.module.scss'
import CloseNav from '@/components/shared/icons/closenav'

const JobSideBar: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { sideBarOpen, screenSize } = useHeaderContext()
  const [jobDialog, setJobDialog] = useState(false)
  const [groupDialog, setGroupDialog] = useState(false)
  const [searchPosition, setSearchPosition] = useState('')
  const [searchGroup, setSearchGroup] = useState('')
  const [openInterviewModal, setOpenInterviewModal] = useState(false)
  const [posId, setPosId] = useState('')
  const isLargeScreen = screenSize === 'desktop'
  // const { employee, employer } = useEmployeeAuthContext();
  // const employerJob = useCreateJob();
  // const employerPosition = useCreatePosition();

  const positionId = searchParams.get('position') as string

  // employer context
  // const { setPositions, positions } = useEmployerContext();
  // const employerJobs = useGetEmployerJobs();
  const {
    data: jobPositionList,
    isPending: jobsLoading,
    refetch: refreshJobs,
    isFetching: jobsFetching
  } = useEmployerPositions({ search: searchPosition } as any)

  // set positions in emplyer context
  // setPositions(jobPositionList?.items);
  const drawerWidth = 270
  const drawerWidthMini = 270

  const {
    data: groupsList,
    isPending: groupsLoading,
    isFetching: groupsFetching,
    refetch: refrechingGroups
  } = useEmployerGroups({ searchQuery: searchGroup })

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidthMini,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open'
  })(({ theme, open }) => ({
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  }))

  const handlePositionClick = (position: EmployerPositionsItemDTO) => {
    // console.log('position:', position);
    router.push(`/employer/positions-search-result?position=${position?._id}`)
  }

  useEffect(() => {
    const bounce = setTimeout(() => {
      refreshJobs()
    }, 500)
    return () => clearTimeout(bounce)
  }, [refreshJobs, searchPosition])

  useEffect(() => {
    const bounce = setTimeout(() => {
      refrechingGroups()
    }, 500)
    return () => clearTimeout(bounce)
  }, [refrechingGroups, searchGroup])

  const onOpenInterviewModal = (id: string) => {
    setOpenInterviewModal(true)
    setPosId(id)
  }

  const Component = isLargeScreen ? Drawer : MuiDrawer

  // return null;
  return (
    <Component
      variant={isLargeScreen ? 'permanent' : undefined}
      anchor='left'
      open={sideBarOpen}
      id='aside'
      classes={{ paper: styles.sidebar_container }}
      sx={{
        // width: sideBarOpen ? drawerWidth : 0,
        width: { xxl: drawerWidth },
        // flexShrink: 0,
        transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        // position: { xs: 'absolute', xl: 'relative' },
        position: isLargeScreen ? 'relative' : 'absolute',
        zIndex: { xs: 100, lg: 100, xl: 7 },
        top: 0
      }}
    >
      {!isLargeScreen ? (
        <Stack direction='row' spacing={3} className={styles.vaurse_logo}>
          <HeaderLogoBurger
            showLabel={!isLargeScreen}
            haveSidebar
            isSmall={!isLargeScreen}
          />
          <CloseNav />
        </Stack>
      ) : null}
      {/* <div className={styles.search_candidate}>
        <CustomSearchInput
          placeholder="Search candidate"
          name="search"
          searchClass="employee_search"
        />
      </div> */}
      <aside className={styles.side_nav}>
        <div className={styles.position_group}>
          <div className={styles.div_group}>
            <ListItemText
              primary='Your Positions'
              className={styles.group_title}
            />
            <AddMore label='' onClick={() => setJobDialog(true)} />
          </div>

          {jobDialog ? (
            <CreatePositionModal
              open={jobDialog}
              onClose={() => setJobDialog(false)}
              onOpenInterviewModal={onOpenInterviewModal}
            />
          ) : null}
          {openInterviewModal ? (
            <InterviewProcessModal
              onClose={() => setOpenInterviewModal(false)}
              open={openInterviewModal}
              positionId={positionId}
            />
          ) : null}

          <CustomSearchInput
            placeholder='Search...'
            name='search'
            searchClass='positions_groups_aside'
            show={true}
            value={searchPosition}
            onChange={e => setSearchPosition(e.target.value)}
          />
          {jobsLoading || jobsFetching || groupsFetching ? (
            <LandingSkeletonLinst num={5} />
          ) : (
            <List className={styles.list_item}>
              {jobPositionList?.items
                ?.slice(0, 3)
                ?.map((job: EmployerPositionsItemDTO, index: number) => (
                  <li
                    key={index}
                    className={
                      job._id !== positionId
                        ? styles.item
                        : styles.item + ' ' + styles.item_selected
                    }
                    onClick={() => {
                      handlePositionClick(job)
                    }}
                  >
                    <ListItemButton className={styles.item_btn}>
                      <div className={styles.job_text}>
                        <ListItemText
                          primary={`${job.jobTitle} - ${job.jobType}`}
                          className={styles.item_title}
                        />
                        <ListItemText
                          primary={job.location.country}
                          className={styles.item_location}
                        />
                      </div>
                      <CustomBadge
                        count={job?.count}
                        name={job?.jobTitle}
                        iconBtnClass='aside_left_btn'
                        badgeClass='aside_badge'
                      />
                    </ListItemButton>
                  </li>
                ))}

              {jobPositionList?.items && jobPositionList?.items?.length > 3 && (
                <Typography className={styles.see_all_positions}>
                  <Link href='/employer/positions'>
                    <span> See all Position </span>
                    <ArrowOutwardIcon />
                  </Link>
                </Typography>
              )}

              {jobPositionList?.pageSize === 0 && (
                <Typography variant='body2' className={styles.no_found}>
                  No position found
                </Typography>
              )}
            </List>
          )}
        </div>

        <div className={styles.position_group}>
          <div className={styles.div_group}>
            <ListItemText
              primary='Your Groups'
              className={styles.group_title}
            />
            <AddMore label='' onClick={() => setGroupDialog(true)} />
          </div>

          {groupDialog ? (
            <CreateGroupModal
              open={groupDialog}
              onClose={() => setGroupDialog(false)}
            />
          ) : null}

          <CustomSearchInput
            placeholder='Search...'
            name='search'
            searchClass='positions_groups_aside'
            show
            value={searchGroup}
            onChange={e => setSearchGroup(e.target.value)}
          />
          {groupsLoading || groupsFetching ? (
            <LandingSkeletonLinst num={5} group />
          ) : (
            <List className={styles.list_item}>
              {groupsList?.data?.items
                ?.slice(0, 4)
                ?.map((group: any, index: number) => (
                  <ListItem key={index} disablePadding className={styles.item}>
                    <ListItemButton
                      className={styles.item_btn}
                      onClick={() => {
                        router.push(`/employer/groups/${group._id}`)
                      }}
                    >
                      <ListItemText
                        primary={group.name}
                        className={styles.item_name}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}

              {groupsList?.data?.items && groupsList?.data?.items?.length > 4 && (
                <Typography className={styles.see_all_positions}>
                  <Link href='/employer/groups'>
                    <span> See all Groups </span>
                    <ArrowOutwardIcon />
                  </Link>
                </Typography>
              )}

              {groupsList?.data?.pageSize === 0 && (
                <Typography variant='body2' className={styles.no_found}>
                  No group found
                </Typography>
              )}
            </List>
          )}
        </div>
      </aside>
      <footer className={`${styles.footer} ${!sideBarOpen && styles.small}`}>
        <Divider />
        <Typography
          component='p'
          classes={{ root: styles.side_footer_parag }}
          variant='body2'
        >
          About {''}
          <Link href='https://vaurse.com/terms-of-service'>Terms {''}</Link> ,
          <Link href='https://vaurse.com/privacy-policy'>Privacy{''} </Link>{' '}
          Help <br />
          &copy; Copyright 2023,{''}
          <Link href='https://vaurse.com'>Vaurse.com</Link>
        </Typography>
      </footer>
    </Component>
  )
}

const LandingSkeletonLinst = ({
  num,
  group = false
}: {
  num: number
  group?: boolean
}) => {
  const skeletonLines = Array.from(Array(num).keys())

  return (
    <List className={styles.list_item}>
      {skeletonLines?.map((job: number, index: number) => (
        <ListItem key={index} disablePadding className={styles.item}>
          <ListItemButton className={styles.item_btn}>
            <div className={styles.job_text}>
              <Skeleton animation='wave' width='90%' />
            </div>
            {!group && (
              <Skeleton
                variant='circular'
                animation='wave'
                width={22}
                height={22}
              />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default JobSideBar
