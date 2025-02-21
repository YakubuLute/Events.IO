import React from 'react';

import { UniversityFullProfileResponseDTO } from '@/hooks/university';
import UniBannerSkeleton from './skeletons/UniBannerSkeleton';
import UniBanner from './UniBanner';

type Props = {
  uniProfile: UniversityFullProfileResponseDTO | undefined;
  loading: boolean;
  platform?: 'candidate' | 'university' | 'employer';
};

const UniBannerContainer = ({ loading, uniProfile, platform }: Props) => {
  return loading ? (
    <UniBannerSkeleton />
  ) : uniProfile ? (
    <UniBanner uniProfile={uniProfile} platform={platform} />
  ) : null;
};

export default UniBannerContainer;
