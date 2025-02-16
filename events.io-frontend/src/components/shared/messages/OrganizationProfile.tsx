import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarRounded } from '@mui/icons-material'
import { IconButton, Rating, Typography } from '@mui/material'

import ShowMoreButton from '@/components/candidate/ob-submit-profile/experience/ShowMoreButton'
import { useHeaderContext } from '@/contexts/headerContext'
import { MessageContext } from '@/contexts/messageContext'
import { TOrganization } from '@/@types/shared/organization'
import { TUser, UserTypes } from '@/@types/shared/type'
import { SocialIcons } from '@/constants/shared/shared-constants'
import { getCurrentUser, truncateString } from '@/utils'
import { CustomButton } from '../Button/Button'
import { LocationCircleIcon } from '../SVG-components'
import EmailAltIcon from '../SVG-components/EmailAltIcon'
import OfficeIcon from '../SVG-components/OfficeIcon'
import ReviewIcon from '../SVG-components/ReviewIcon'
import ShortBackArrowIcon from '../SVG-components/ShortBackArrowIcon'
import TelephoneIcon from '../SVG-components/TelephoneIcon'
import UserGroupAltIcon from '../SVG-components/UserGroupAltIcon'
import ProfileSkeleton from './ProfileSkeleton'
import styles from './styles.module.scss'

type Props = {
  orgProfile: TOrganization | undefined
  loading: boolean
}

const OrganizationProfile = ({ orgProfile, loading }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const activeUser = getCurrentUser()
  const { selectedChat, setInfoTabOpen } = useContext(MessageContext)
  const { screenSize } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'

  const getSocialLinks = () => {
    const socialLinks: React.ReactNode[] = []

    if (orgProfile) {
      Object.keys(orgProfile.socialLinks).forEach(social => {
        const link = (
          <Link
            href={orgProfile.socialLinks[social] || ''}
            target='_blank'
            rel='noreferrer'
            key={social}
          >
            <IconButton
              aria-label={`${social} logo`}
              size='small'
              className={styles.socialBtn}
            >
              {SocialIcons[social.toUpperCase()]}
            </IconButton>
          </Link>
        )
        socialLinks.push(link)
      })
    }
    return socialLinks.length ? socialLinks : null
  }

  const onShowMore = () => {
    setShowMore(state => !state)
  }

  const str = (str: string) => {
    return !showMore ? truncateString(str, 300) : str
  }

  // Function to get the redirect path based on the user type
  const getRedirectPath = (user: TUser, institutionId: string) => {
    switch (user?.userType) {
      case UserTypes.EMPLOYEE:
        return `/employer/schools?schoolId=${institutionId}`
      case UserTypes.CANDIDATE:
        return `/candidate/schools?schoolId=${institutionId}`
      case UserTypes.STAFF:
        return `/university/education?schoolId=${institutionId}`
      default:
        return '/candidate/signin'
    }
  }

  if (loading) {
    return <ProfileSkeleton />
  }

  const renderSocial = (orgProfile: TOrganization) => {
    switch (orgProfile.type) {
      case 'institution':
        return <div className={styles.socialWrapper}>{getSocialLinks()}</div>
      case 'employer':
        return null
      default:
        return null
    }
  }

  const renderRating = (orgProfile: TOrganization) => {
    switch (orgProfile.type) {
      case 'employer':
        return (
          <div className={styles.ratingWrapper}>
            <Typography className={styles.ratingText}>
              {orgProfile.rating.averageRating}
            </Typography>
            <Rating
              name='rate'
              value={Math.floor(orgProfile?.rating.averageRating)}
              emptyIcon={
                <StarRounded style={{ opacity: 0.55 }} fontSize='inherit' />
              }
              icon={
                <StarRounded className={styles.ratingStar} fontSize='inherit' />
              }
              className={styles.rating}
            />
          </div>
        )
      case 'institution':
        return null
      default:
        return null
    }
  }

  const renderEmployerLocation = (orgProfile: TOrganization) => {
    switch (orgProfile.type) {
      case 'employer':
        return (
          <div className={styles.locContainer}>
            <div className={styles.locaBox}>
              <div className={styles.locWrapper}>
                <LocationCircleIcon />
                <Typography className={styles.locText}>
                  {orgProfile?.location.city},{' '}
                  {orgProfile?.location.countryIsoCode}
                </Typography>
              </div>
              <div className={styles.locWrapper}>
                <UserGroupAltIcon />
                <Typography className={styles.locText}>
                  {orgProfile?.companySize} <span>employees</span>
                </Typography>
              </div>
            </div>
            <div className={styles.locaBox}>
              <div className={styles.locWrapper}>
                <OfficeIcon />
                <Typography className={styles.locText}>
                  {orgProfile?.industry}
                </Typography>
              </div>
              <div className={styles.locWrapper}>
                <ReviewIcon />
                <Typography className={styles.locText}>
                  {orgProfile?.rating.totalReviews} Reviews
                </Typography>
              </div>
            </div>
          </div>
        )
      case 'institution':
        return null
      default:
        return null
    }
  }

  const renderInstitutionLocation = (orgProfile: TOrganization) => {
    switch (orgProfile.type) {
      case 'institution':
        return (
          <div className={styles.addressBox}>
            <div className={styles.box}>
              <LocationCircleIcon />
              <Typography className={styles.text}>
                {orgProfile?.location.city}, {orgProfile?.location.country}
              </Typography>
            </div>
            <div className={styles.box}>
              <TelephoneIcon />
              <Typography className={styles.text}>
                {orgProfile?.phoneNumber}
              </Typography>
            </div>
            <div className={styles.box}>
              <EmailAltIcon />
              <Typography className={styles.text}>
                {orgProfile?.email}
              </Typography>
            </div>
          </div>
        )
      case 'employer':
        return null
      default:
        return null
    }
  }

  return orgProfile ? (
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
            src={orgProfile?.logo || '/assets/icons/organization_alt.svg'}
            width={120}
            height={120}
            alt='profile picture'
            priority
            className={styles.profileImg}
          />
          <div className={styles.nameBox}>
            <Typography variant='h2'>{orgProfile?.name}</Typography>
          </div>
          <div className={styles.codeBox}>
            <Typography variant='body2' className={styles.code}>
              {orgProfile?.accountId}
            </Typography>
          </div>

          {renderSocial(orgProfile)}
          {renderRating(orgProfile)}
        </div>
        {renderEmployerLocation(orgProfile)}

        <div className={styles.aboutContainer}>
          <Typography className={styles.aboutText}>About</Typography>
          {str(orgProfile?.about || '')
            .split('. ')
            .map((p, i) => (
              <Typography
                variant='body2'
                component='p'
                className={styles.about}
                key={i}
              >
                {p.replace('.', '')}.
              </Typography>
            ))}
          {orgProfile?.about && orgProfile?.about.length > 300 ? (
            <ShowMoreButton onShowMore={onShowMore} showMore={showMore} />
          ) : null}
        </div>
        {renderInstitutionLocation(orgProfile)}
      </div>
      <Link
        href={getRedirectPath(activeUser, selectedChat!.recipientId)}
        target='_blank'
      >
        <CustomButton
          variant='text'
          className={styles.profileBtn}
          label='View Full Profile'
          fullWidth
        />
      </Link>
    </>
  ) : null
}

export default OrganizationProfile
