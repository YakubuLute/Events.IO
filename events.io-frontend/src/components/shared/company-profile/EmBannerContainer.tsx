import React from 'react';

import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import EmBanner from './EmBanner';
import EmBannerSkeleton from './skeletons/EmBannerSkeleton';

type Props = {
  emProfile: EmployerDetailsDataDTO | undefined;
  loading: boolean;
  emId: string;
  showFollowButton?: boolean;
};

const EmBannerContainer = ({ emProfile, loading, emId, showFollowButton = false }: Props) => {
  return loading ? (
    <EmBannerSkeleton />
  ) : emProfile ? (
    <EmBanner emProfile={emProfile} emId={emId} showFollowButton={showFollowButton} />
  ) : null;
};

export default EmBannerContainer;
