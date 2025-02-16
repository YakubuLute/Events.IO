import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Button, Rating, Typography, useMediaQuery } from '@mui/material'

import { useGetCandidatePublicProfile } from '@/hooks/candidate'
import { useGetOrganizationProfileHook } from '@/hooks/shared'
import { MessageContext } from '@/contexts/messageContext'
import styles from '@/styles/messages.module.scss'
import ArrowBack from './icons/arrowBack'
import Company from './icons/company'
import Facebook from './icons/facebook'
import FileHeart from './icons/file-heart'
import Instagram from './icons/instagram'
import Linkedin from './icons/linkedin'
import Mail from './icons/mail'
import People from './icons/people'
import PhoneCall from './icons/phone-call'
import Pin from './icons/pin'
import Twitter from './icons/twitter'
import Wifi from './icons/wifi'
import Work from './icons/work'

const InfoTab = () => {
  const isMobile = useMediaQuery('(max-width:800px)')
  const { infoTabOpen, setInfoTabOpen, selectedChat } =
    useContext(MessageContext)
  const { data: senderProfile } = useGetCandidatePublicProfile(
    selectedChat?.recipientId || ''
  )
  const { data: organizationProfile } = useGetOrganizationProfileHook(
    selectedChat?.recipientOrganizationId || ''
  )
  return (
    <Box
      sx={{
        width: infoTabOpen ? '100%' : '0% !important',
        '&::-webkit-scrollbar': {
          width: !infoTabOpen ? '0 !important' : 'auto'
        }
      }}
      className={`${styles.infoContainer} ${
        isMobile && infoTabOpen && styles.modal
      }`}
    >
      <button
        className={styles.infoButton}
        onClick={() => setInfoTabOpen(false)}
      >
        <ArrowBack />
      </button>
      {senderProfile?.data && (
        <>
          {' '}
          <Box className={styles.infoChildContainer1}>
            <Image
              src={
                senderProfile?.data?.profilePhoto ||
                '/assets/images/user-default-image.png'
              }
              alt={''}
              width={128}
              height={128}
              className={styles.infoImg}
            />

            <Typography className={styles.infoName}>
              {`${senderProfile?.data?.personalDetails?.firstName} ${senderProfile?.data?.personalDetails?.lastName}`}
            </Typography>
            <Typography className={styles.pill}>
              {senderProfile?.data?.accountId}
            </Typography>

            <Typography className={styles.infoPos}>
              {senderProfile?.data?.workDetails?.jobTitles}
            </Typography>

            <Box className={styles.infoSocials}>
              {senderProfile?.data?.socialLinks.map((item, idx) => {
                if (item.network === 'linkedin') {
                  return (
                    <Link key={idx} href={item.url}>
                      <Box className={styles.socialIconWrapper}>
                        <Linkedin />
                      </Box>
                    </Link>
                  )
                }
                if (item.network === 'facebook') {
                  return (
                    <Link key={idx} href={item.url}>
                      <Box className={styles.socialIconWrapper}>
                        <Facebook />
                      </Box>
                    </Link>
                  )
                }
                if (item.network === 'twitter') {
                  return (
                    <Link key={idx} href={item.url}>
                      <Box className={styles.socialIconWrapper}>
                        <Twitter />
                      </Box>
                    </Link>
                  )
                }
              })}
            </Box>
          </Box>
          <Box className={styles.infoChildContainer2}>
            <Box className={styles.infoChild2Item}>
              <Typography className={styles.infoChild2ItemTitle}>
                {senderProfile?.data?.workDetails?.yearsOfExperience + 'Years'}
              </Typography>
              <Typography className={styles.infoChild2ItemSubtitle}>
                Experience
              </Typography>
            </Box>

            <Box
              sx={{
                borderLeft: '1px solid rgba(135, 150, 165, 0.10)',
                borderRight: '1px solid rgba(135, 150, 165, 0.10)'
              }}
              className={styles.infoChild2Item}
            >
              <Typography className={styles.infoChild2ItemTitle}>
                {senderProfile?.data?.workDetails?.monthlySalary}
                {senderProfile?.data?.workDetails?.currency}/M
              </Typography>
              <Typography className={styles.infoChild2ItemSubtitle}>
                Min. salary
              </Typography>
            </Box>

            <Box className={styles.infoChild2Item}>
              <Typography className={styles.infoChild2ItemTitle}>
                {senderProfile?.data?.workDetails?.hourlyRate}
                {senderProfile?.data?.workDetails?.currency}/h
              </Typography>
              <Typography className={styles.infoChild2ItemSubtitle}>
                Min. rate
              </Typography>
            </Box>
          </Box>
          <Box className={styles.infoChild3Container}>
            <Typography className={styles.infoChild3Title}>About</Typography>
            <Typography className={styles.infoChild3Desc}>
              {senderProfile?.data?.summary}
            </Typography>
          </Box>
          <Box className={styles.infoChild4Container}>
            {senderProfile?.data?.employmentHistory?.length !== 0 && (
              <Box className={styles.infoChild4Item}>
                <Box sx={{ flex: 1, paddingTop: '3.5px' }}>
                  <Work />
                </Box>

                <Box sx={{ flex: 6 }}>
                  <Typography className={styles.infoChild4Text}>
                    Open to:
                  </Typography>
                  <Box className='flex items-center gap-2 flex-wrap'>
                    {senderProfile?.data?.workDetails?.jobTypes?.map(
                      (item: string, index: number) => {
                        return (
                          <Typography
                            key={index}
                            sx={{
                              paddingInline: '15px',
                              backgroundColor: '#F8F8F8',
                              borderRadius: '100px'
                            }}
                            className={styles.infoChild4Text}
                          >
                            {item}
                          </Typography>
                        )
                      }
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {senderProfile?.data?.workDetails.locations?.length !== 0 && (
              <Box className={styles.infoChild4Item}>
                <Box sx={{ flex: 1, paddingTop: '3.5px' }}>
                  <Pin />
                </Box>

                <Box sx={{ flex: 6 }}>
                  <Typography className={styles.infoChild4Text}>
                    On-site in or near:
                  </Typography>
                  <Box className='flex items-center gap-2 flex-wrap'>
                    {senderProfile?.data?.workDetails?.locations?.map(
                      (item, index: number) => {
                        return (
                          <Typography
                            key={index}
                            sx={{
                              paddingInline: '15px',
                              backgroundColor: '#F8F8F8',
                              borderRadius: '100px'
                            }}
                            className={styles.infoChild4Text}
                          >
                            {item.country} {item.city}
                          </Typography>
                        )
                      }
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {senderProfile?.data?.workDetails?.timezones?.length !== 0 && (
              <Box className={styles.infoChild4Item}>
                <Box sx={{ flex: 1, paddingTop: '3.5px' }}>
                  <Wifi />
                </Box>

                <Box sx={{ flex: 6 }}>
                  <Typography className={styles.infoChild4Text}>
                    Remote in timezone:
                  </Typography>
                  <Box className='flex items-center gap-2 flex-wrap'>
                    {senderProfile?.data?.workDetails.timezones?.map(
                      (item, index: number) => {
                        return (
                          <Typography
                            key={index}
                            sx={{
                              paddingInline: '15px',
                              backgroundColor: '#F8F8F8',
                              borderRadius: '100px'
                            }}
                            className={styles.infoChild4Text}
                          >
                            {item}
                          </Typography>
                        )
                      }
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            <Button type='button' className={styles.infoView_btn}>
              View Full Profile
            </Button>
          </Box>
        </>
      )}

      {organizationProfile?.data && (
        <>
          <Box className={styles.infoChildContainer1}>
            <Image
              src={
                organizationProfile?.data?.logo ||
                '/assets/images/user-default-image.png'
              }
              alt={''}
              width={128}
              height={128}
              className={styles.infoImg}
            />

            <Typography className={styles.infoName}>
              {organizationProfile?.data?.name}
            </Typography>
            {organizationProfile?.data?.type === 'employer' && (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={0}
                marginBottom={'5px'}
              >
                <Typography
                  fontSize={'16px'}
                  fontStyle={'bold'}
                  color={'#0A9C55'}
                >
                  {organizationProfile?.data?.rating?.averageRating}
                </Typography>
                <Rating
                  color='#0A9C55'
                  name='read-only'
                  value={organizationProfile?.data?.rating?.averageRating}
                  readOnly
                />
              </Box>
            )}
            <Typography className={styles.pill}>
              {organizationProfile?.data.accountId}
            </Typography>

            {organizationProfile?.data?.type === 'institution' && (
              <Box className={styles.infoSocials}>
                <Link href={organizationProfile.data?.socialLinks.linkedin}>
                  <Box className={styles.socialIconWrapper}>
                    <Linkedin />
                  </Box>
                </Link>

                <Link href={organizationProfile?.data?.socialLinks.facebook}>
                  <Box className={styles.socialIconWrapper}>
                    <Facebook />
                  </Box>
                </Link>

                <Link href={organizationProfile?.data?.socialLinks.twitter}>
                  <Box className={styles.socialIconWrapper}>
                    <Twitter />
                  </Box>
                </Link>
                <Link href={organizationProfile?.data?.socialLinks.instagram}>
                  <Box className={styles.socialIconWrapper}>
                    <Instagram />
                  </Box>
                </Link>
              </Box>
            )}
          </Box>
          {organizationProfile?.data?.type === 'employer' && (
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={2}
              justifyContent={'space-between'}
              padding={'16px 17px'}
              borderBottom={'1px solid rgba(135, 150, 165, 0.1)'}
            >
              <Typography className={styles.infoChild14Title}>
                <Pin />
                {organizationProfile?.data?.location?.country},{' '}
                {organizationProfile?.data?.location?.city}
              </Typography>
              <Typography className={styles.infoChild14Title}>
                <Company />
                {organizationProfile?.data?.type}{' '}
              </Typography>
              <Typography className={styles.infoChild14Title}>
                <People />
                {organizationProfile?.data?.numberOfEmployees ||
                  '1-10 employess'}{' '}
              </Typography>
              <Typography className={styles.infoChild14Title}>
                <FileHeart />
                {organizationProfile?.data?.rating?.totalReviews} Reviews
              </Typography>
            </Box>
          )}
          <Box className={styles.infoChild3Container}>
            <Typography className={styles.infoChild3Title}>About</Typography>
            <Typography className={styles.infoChild3Desc}>
              {organizationProfile?.data?.about}
            </Typography>
          </Box>
          {organizationProfile.data?.type === 'institution' && (
            <Box className={styles.infoChild3Container}>
              <Box
                sx={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: '8px'
                }}
              >
                <Typography className={styles.infoChild13Title}>
                  <Pin />
                  {organizationProfile?.data?.location?.country}{' '}
                  {organizationProfile?.data?.location?.city}
                </Typography>
                <Typography className={styles.infoChild13Title}>
                  <PhoneCall />
                  {organizationProfile?.data?.phoneNumber}{' '}
                </Typography>
                <Typography className={styles.infoChild13Title}>
                  <Mail />
                  {organizationProfile?.data?.email}{' '}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default InfoTab
