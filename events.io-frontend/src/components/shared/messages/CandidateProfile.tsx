import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VerifiedIcon from '@mui/icons-material/Verified'
import { IconButton, Typography } from '@mui/material'

import ShowMoreButton from '@/components/candidate/ob-submit-profile/experience/ShowMoreButton'
import { CandidateKycLevels } from '@/hooks/candidate/dtos'
import { useHeaderContext } from '@/contexts/headerContext'
import { MessageContext } from '@/contexts/messageContext'
import { TCandidateProfile } from '@/@types/candidate/auth/candidate-auth'
import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore'
import { getSocialLink, truncateString } from '@/utils'
import AlumniProfileModal from '../alumni-profile-modal/AlumniProfileModal'
import { CustomButton } from '../Button/Button'
import { BagIcon, LocationCircleIcon, TimeIcon } from '../SVG-components'
import ShortBackArrowIcon from '../SVG-components/ShortBackArrowIcon'
import ProfileSkeleton from './ProfileSkeleton'
import styles from './styles.module.scss'

type Props = {
  profileData: TCandidateProfile | undefined
  loading: boolean
}

const CandidateProfile = ({ profileData, loading }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const { setInfoTabOpen } = useContext(MessageContext)
  const { screenSize } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'
  const { setShowProfileModal, setAlumniId } = useAlumniProfileStore()

  const onShowMore = () => {
    setShowMore(state => !state)
  }

  const str = (str: string) => {
    return !showMore ? truncateString(str, 300) : str
  }

  useEffect(() => {
    if (profileData) {
      setAlumniId(profileData._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData])

  return loading ? (
    <ProfileSkeleton />
  ) : profileData ? (
    <>
      <div className={styles.detailsContainer}>
        {isLargeScreen ? (
          <IconButton
            className={styles.backArrowBtn}
            onClick={() => setInfoTabOpen(false)}
          >
            <ShortBackArrowIcon />
          </IconButton>
        ) : null}
        <div className={styles.profileWrapper}>
          <Image
            src={
              profileData?.profilePhoto ||
              '/assets/images/user-default-image-sq.svg'
            }
            width={120}
            height={120}
            alt='profile picture'
            priority
            className={styles.profileImg}
          />
          <div className={styles.nameBox}>
            <Typography variant='h2'>
              {profileData?.personalDetails?.firstName}{' '}
              {profileData?.personalDetails?.lastName}
            </Typography>
            {profileData?.kycLevel ===
            CandidateKycLevels.ADDRESS_VERIFICATION ? (
              <IconButton className={styles.iconBtn}>
                <VerifiedIcon className={styles.verifiedIcon} />
              </IconButton>
            ) : null}
          </div>
          <div className={styles.codeBox}>
            <Typography variant='body2' className={styles.code}>
              {profileData?.accountId}
            </Typography>
          </div>
          <Typography variant='h4'>
            {profileData?.workDetails?.jobTitles?.join(' ')}
          </Typography>
          <div className={styles.socialWrapper}>
            {profileData && profileData?.socialLinks.length
              ? profileData.socialLinks.map(social => {
                  const { link, Icon } = getSocialLink(
                    social.network,
                    profileData?.socialLinks
                  )
                  return (
                    <Link
                      href={link || ''}
                      target='_blank'
                      rel='noreferrer'
                      key={social._id}
                    >
                      <IconButton
                        aria-label={`${social.network} logo`}
                        size='small'
                        className={styles.socialBtn}
                      >
                        {Icon}
                      </IconButton>
                    </Link>
                  )
                })
              : null}
          </div>
        </div>

        <div className={styles.worthWrapper}>
          <div className={[styles.worthBox, styles.noBorder].join(' ')}>
            <Typography variant='h2'>
              {profileData?.workDetails?.yearsOfExperience || 'N/A'} Years
            </Typography>
            <Typography variant='h4'>Experience</Typography>
          </div>
          <div className={styles.worthBox}>
            <Typography variant='h2'>
              {`${profileData?.workDetails.monthlySalary ?? 'N/A'} ${
                profileData?.workDetails.currency || ''
              }/m `}
            </Typography>
            <Typography variant='h4'>Min. Salary</Typography>
          </div>
          <div className={[styles.worthBox, styles.noBorder].join(' ')}>
            <Typography variant='h2'>
              {`${profileData?.workDetails.hourlyRate ?? 'N/A'} ${
                profileData?.workDetails.currency || ''
              }/h `}
            </Typography>
            <Typography variant='h4'>Min. Rate</Typography>
          </div>
        </div>

        <div className={styles.aboutContainer}>
          <Typography className={styles.aboutText}>About</Typography>
          <Typography
            variant='body2'
            component='div'
            className={styles.about}
            dangerouslySetInnerHTML={{
              __html: str(
                profileData?.personalDetails.about || 'No About provided'
              )
            }}
          />
          {profileData?.personalDetails?.about &&
          profileData?.personalDetails?.about.length > 300 ? (
            <ShowMoreButton onShowMore={onShowMore} showMore={showMore} />
          ) : null}
        </div>

        <div className={styles.workPreferenceWrapper}>
          <div className={styles.jobTypeWrapper}>
            <div className={styles.jobTypeBox}>
              <div className={styles.miniBox}>
                <BagIcon />
                <Typography variant='h4'>Open To</Typography>
              </div>
              <div className={styles.mainBox}>
                <BagIcon />
                <div className={styles.chipBox}>
                  {profileData?.workDetails?.jobTypes?.map(jobType => (
                    <div className={styles.chip} key={jobType}>
                      <Typography variant='subtitle2'>{jobType}</Typography>
                    </div>
                  ))}
                  {profileData?.workDetails?.experienceLevels?.map(el => (
                    <div className={styles.chip} key={el}>
                      <Image
                        src={`/assets/icons/${el}.svg`}
                        alt='experience level icon'
                        width={16}
                        height={16}
                      />
                      <Typography variant='subtitle2'>{el}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {profileData?.workDetails?.locations &&
          profileData?.workDetails?.locations?.length > 0 ? (
            <div className={styles.jobTypeWrapper}>
              <div className={styles.jobTypeBox}>
                <div className={styles.miniBox}>
                  <LocationCircleIcon />
                  <Typography variant='h4'>On Site in or near</Typography>
                </div>
                <div className={styles.mainBox}>
                  <LocationCircleIcon />
                  <div className={styles.chipBox}>
                    {profileData?.workDetails?.locations?.map(
                      (location, idx) => (
                        <div className={styles.chip} key={idx}>
                          <Typography variant='subtitle2'>
                            {location.state && `${location.state},`}{' '}
                            {location.country}
                          </Typography>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {profileData?.workDetails?.timezones ? (
            <div className={styles.jobTypeWrapper}>
              <div className={styles.jobTypeBox}>
                <div className={styles.miniBox}>
                  <TimeIcon />
                  <Typography variant='h4'>Remote in Timezone</Typography>
                </div>
                <div className={styles.mainBox}>
                  <TimeIcon />
                  <div className={styles.chipBox}>
                    {profileData?.workDetails?.timezones?.map(
                      (timezone, idx) => (
                        <div className={styles.chip} key={idx}>
                          <Typography variant='subtitle2'>
                            {timezone}
                          </Typography>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <CustomButton
        variant='text'
        className={styles.profileBtn}
        label='View Full Profile'
        fullWidth
        onClick={() => setShowProfileModal(true)}
      />
      <AlumniProfileModal sector='candidate' isMessagePage />
    </>
  ) : null
}

export default CandidateProfile
