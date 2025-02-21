import React from 'react';

import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import EmOverview from './EmOverview';
import EmOverviewSkeleton from './skeletons/EmOverviewSkeleton';

type Props = {
  emProfile: EmployerDetailsDataDTO | undefined;
  loading: boolean;
};

const EmOverviewContainer = ({ emProfile, loading }: Props) => {
  return loading ? (
    <EmOverviewSkeleton />
  ) : emProfile ? (
    <EmOverview emProfile={emProfile} />
  ) : null;
};

export default EmOverviewContainer;
