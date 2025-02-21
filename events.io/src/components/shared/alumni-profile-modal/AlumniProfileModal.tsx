import React, { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

import PersonalWrapper from '@/components/candidate/ob-submit-profile/PersonalWrapper'
import ProfileContentWrapper from '@/components/candidate/ob-submit-profile/ProfileContentWrapper'
import ProfileWrapper from '@/components/candidate/ob-submit-profile/ProfileWrapper'
import Recommendations from '@/components/candidate/ob-submit-profile/Recommendations'
import Reviews from '@/components/candidate/ob-submit-profile/Reviews'
import PersonalWrapperSkeleton from '@/components/candidate/ob-submit-profile/skeletons/PersonalWrapperSkeleton'
import ProfileWrapperSkeleton from '@/components/candidate/ob-submit-profile/skeletons/ProfileWrapperSkeleton'
import SkillsWrapperSkeleton from '@/components/candidate/ob-submit-profile/skeletons/SkillsWrapperSkeleton'
import WorkPreferenceWrapperSkeleton from '@/components/candidate/ob-submit-profile/skeletons/WorkPreferenceWrapperSkeleton'
import WorthWrapperSkeleton from '@/components/candidate/ob-submit-profile/skeletons/WorthWrapperSkeleton'
import SkillsWrapper from '@/components/candidate/ob-submit-profile/SkillsWrapper'
import WorkPreferenceWrapper from '@/components/candidate/ob-submit-profile/WorkPreferenceWrapper'
import WorthWrapper from '@/components/candidate/ob-submit-profile/WorthWrapper'
import { CustomButton, EmptyRequestsTemplates } from '@/components/shared'
import TabsNav from '@/components/shared/tabs-nav/TabsNav'
import {
  useGetCandidateAuthenticatedProfile,
  useGetCandidateProfileRecommendations,
  useGetCandidateProfileReviews
} from '@/hooks/candidate'
import { ReviewQueryParams, TabMenuOptions } from '@/hooks/candidate/dtos'
import { useHeaderContext } from '@/contexts/headerContext'
import { TCandidateProfile } from '@/@types/candidate/auth/candidate-auth'
import { ErrorCodes } from '@/enums/shared'
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore'
import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore'
import { getCurrentUser } from '@/utils'
import ConnectionModal from '../connect-candidate/ConnectionModal'
import styles from './alumnProfileModal.module.scss'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  // return <Zoom timeout={500} ref={ref} {...props} />;
  return <Slide direction='left' ref={ref} {...props} />
})

type AlumniProfileProps = {
  sector: 'university' | 'employer' | 'candidate'
  isMessagePage?: boolean
  redirectUrl?: string
}

const AlumniProfileModal: React.FC<AlumniProfileProps> = ({
  sector,
  isMessagePage,
  redirectUrl
}) => {
  const [activeTab, setActiveTab] = useState<string>(TabMenuOptions.PROFILE)
  const [fetchParams, setFetchParams] = useState({
    page: 1,
    itemsPerPage: 10
  })
  const [reviewFilter, setReviewFilter] = useState<ReviewQueryParams>({
    itemsPerPage: 10,
    page: 1,
    sortBy: undefined
  })

  // Hooks
  const { showProfileModal, setShowProfileModal, alumniId } =
    useAlumniProfileStore()
  const { handleOpenChat } = useChatStickyMessageStore()
  const [openConnectionModal, setOpenConnectionModal] = useState(false)
  const router = useRouter()
  const { screenSize } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop' || screenSize === 'laptop'

  const {
    data: candidateProfileData,
    isPending: isLoading,
    error: profileError
  } = useGetCandidateAuthenticatedProfile(alumniId as string)
  const candidateProfile = candidateProfileData?.data as TCandidateProfile
  const errorCode = (profileError as any)?.response?.data?.errCode as ErrorCodes

  const { data: recommendations, isPending: loadingRecommendations } =
    useGetCandidateProfileRecommendations(alumniId as string)

  const { data: reviews, isPending: loadingReviews } =
    useGetCandidateProfileReviews(alumniId, reviewFilter)

  // Functions
  const handleTabsChange = (_: SyntheticEvent<Element, Event>, tab: string) => {
    setActiveTab(tab)
  }

  const onClose = () => {
    setShowProfileModal(false)
  }

  const handleClickMessageBtn = () => {
    if (isLargeScreen) {
      handleOpenChat('chat', candidateProfile?.connectionId, {
        _id: candidateProfile.connectionId,
        recipientProfilePhoto: candidateProfile?.profilePhoto,
        recipientName: `${candidateProfile?.personalDetails.firstName} ${candidateProfile?.personalDetails.lastName}`
      })
    } else {
      const connectData = {
        _id: candidateProfile.connectionId,
        recipientProfilePhoto: candidateProfile?.profilePhoto,
        recipientName: `${candidateProfile?.personalDetails.firstName} ${candidateProfile?.personalDetails.lastName}`
      }
      localStorage.setItem('connectData', JSON.stringify(connectData))
      router.push(`/${sector}/messages`)
    }
  }

  return (
    <>
      <Dialog
        open={showProfileModal}
        fullWidth
        maxWidth='md'
        onClose={onClose}
        transitionDuration={700}
        TransitionComponent={Transition}
        aria-describedby='candidates-profile-dialog-slide-data'
        classes={{ root: styles.dialog_root, paper: styles.dialog_paper }}
        disableEnforceFocus
      >
        <DialogTitle className={styles.dialog_header}>
          <div className={styles.title_interview}>
            <Typography component='h3' className={styles.title}>
              Profile
            </Typography>
            {isMessagePage ||
            Boolean(
              errorCode === ErrorCodes.PROFILE_NOT_VISIBLE
            ) ? null : candidateProfile?.alreadyConnected ||
              sector === 'university' ? (
              <CustomButton
                label='Send Message'
                onClick={handleClickMessageBtn}
                className={styles.messageBtn}
                disabled={isLoading}
                variant='contained'
              />
            ) : !candidateProfile?.alreadyConnected &&
              candidateProfile?._id !== getCurrentUser()?._id &&
              sector !== 'employer' ? (
              <CustomButton
                label='Connect'
                onClick={() =>
                  redirectUrl
                    ? router.push(redirectUrl)
                    : setOpenConnectionModal(true)
                }
                className={styles.connectBtn}
                disabled={isLoading}
                variant='outlined'
              />
            ) : null}
            <IconButton
              aria-label='close dialog'
              onClick={onClose}
              className={styles.close_dialog_btn}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent
          className={'full-width ' + styles.candidate_Profile_container}
        >
          <div className={styles.profileContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {errorCode === ErrorCodes.PROFILE_NOT_VISIBLE ? (
                  <EmptyRequestsTemplates
                    component={
                      <Typography
                        component='h4'
                        sx={{ fontSize: 20, fontWeight: 600, my: 2 }}
                        className='text-auth-primary'
                      >
                        Oops, This Profile is private.
                      </Typography>
                    }
                    imageType='noOffers'
                    altName='Private profile'
                    sx={{
                      my: { xs: '72px', sm: '98px', lg: '120px' },
                      mx: 'auto'
                    }}
                    imgClass='max-w-[200px] h-[200px]'
                  />
                ) : (
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <div className={styles.personContainer}>
                        {isLoading ? (
                          <>
                            <ProfileWrapperSkeleton isPublic />
                            <WorthWrapperSkeleton />
                            <WorkPreferenceWrapperSkeleton isPublic />
                            <PersonalWrapperSkeleton isPublic />
                            <SkillsWrapperSkeleton isPublic />
                          </>
                        ) : candidateProfile ? (
                          <>
                            <ProfileWrapper
                              candidateProfileData={candidateProfile}
                              sector={sector}
                              isPublic
                              isProfileModal
                            />
                            <WorthWrapper
                              candidateProfileData={candidateProfile}
                            />
                            <WorkPreferenceWrapper
                              candidateProfileData={candidateProfile}
                              isPublic
                            />
                            <PersonalWrapper
                              candidateProfileData={candidateProfile}
                              isPublic
                            />
                            <SkillsWrapper
                              candidateProfileData={candidateProfile}
                              isPublic
                            />
                          </>
                        ) : null}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                      <div className={styles.experienceContainer}>
                        <TabsNav
                          value={activeTab}
                          onChange={handleTabsChange}
                          padding='24px 0px'
                          options={[
                            {
                              label: 'Profile',
                              value: TabMenuOptions.PROFILE,
                              component: (
                                <ProfileContentWrapper
                                  candidateProfileData={candidateProfile}
                                  isProfileLoading={isLoading}
                                  isPublic
                                />
                              )
                            },
                            {
                              label: `Recommendations(${
                                recommendations?.items?.length || 0
                              })`,
                              value: TabMenuOptions.RECOMMENDATIONS,
                              component: (
                                <Recommendations
                                  recommendations={recommendations}
                                  recommendationsLoading={
                                    loadingRecommendations
                                  }
                                  setFetchParams={setFetchParams}
                                  fetchParams={fetchParams}
                                  isPublic
                                />
                              )
                            },
                            {
                              label: `Reviews (${reviews?.items?.length || 0})`,
                              value: TabMenuOptions.REVIEWS,
                              component: (
                                <Reviews
                                  fetchParams={reviewFilter}
                                  reviews={reviews}
                                  reviewsLoading={loadingReviews}
                                  setFetchParams={setReviewFilter}
                                  isPublic
                                  noProfileModal
                                />
                              )
                            }
                          ]}
                        />
                      </div>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
      {openConnectionModal ? (
        <ConnectionModal
          connection={{
            _id: candidateProfile?._id,
            personalDetails: {
              firstName: candidateProfile?.personalDetails?.firstName || '',
              lastName: candidateProfile?.personalDetails?.lastName || ''
            },
            profilePhoto: candidateProfile?.profilePhoto
          }}
          onClose={() => setOpenConnectionModal(false)}
          open={openConnectionModal}
        />
      ) : null}
    </>
  )
}

export default AlumniProfileModal
