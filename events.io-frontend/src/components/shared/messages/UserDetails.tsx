import React, { useContext } from 'react'

import { useGetCandidatePublicProfile } from '@/hooks/candidate'
import { useGetOrganizationProfileHook } from '@/hooks/shared'
import { MessageContext } from '@/contexts/messageContext'
import CandidateProfile from './CandidateProfile'
import OrganizationProfile from './OrganizationProfile'

const UserDetails = () => {
  const { selectedChat } = useContext(MessageContext)

  const { data: candidateProfile, isPending: candidateLoading } =
    useGetCandidatePublicProfile(selectedChat?.recipientId || '')

  const { data: organizationProfile, isPending: orgLoading } =
    useGetOrganizationProfileHook(selectedChat?.recipientOrganizationId || '')

  const renderView = () => {
    if (candidateProfile && candidateProfile.data) {
      const { data: profileData } = candidateProfile
      return (
        <CandidateProfile
          profileData={profileData}
          loading={candidateLoading}
        />
      )
    }
    if (organizationProfile && organizationProfile.data) {
      const { data: orgProfile } = organizationProfile
      return (
        <OrganizationProfile orgProfile={orgProfile} loading={orgLoading} />
      )
    }
    return null
  }

  return <>{renderView()}</>
}

export default UserDetails
