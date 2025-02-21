import React from 'react';

import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import EmProfileInfo from './EmProfileInfo';
import EmProfileInfoSkeleton from './skeletons/EmProfileInfoSkeleton';
import styles from './styles.module.scss';

type Props = {
  emProfile: EmployerDetailsDataDTO | undefined;
  loading: boolean;
};

const EmProfileContainer = ({ emProfile, loading }: Props) => {
  return (
    <aside className={styles.emInfoContainer}>
      {loading ? (
        <EmProfileInfoSkeleton />
      ) : emProfile ? (
        <EmProfileInfo emProfile={emProfile} />
      ) : null}
    </aside>
  );
};

export default EmProfileContainer;
