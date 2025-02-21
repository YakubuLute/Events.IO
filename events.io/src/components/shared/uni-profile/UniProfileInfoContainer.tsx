import React from 'react';

import { UniversityFullProfileResponseDTO } from '@/hooks/university';
import UniProfileInfoSkeleton from './skeletons/UniProfileInfoSkeleton';
import styles from './styles.module.scss';
import UniProfileInfo from './UniProfileInfo';

type Props = {
  uniProfile: UniversityFullProfileResponseDTO | undefined;
  loading: boolean;
};

const UniProfileInfoContainer = ({ loading, uniProfile }: Props) => {
  return (
    <div className={styles.uniInfoContainer}>
      {loading ? (
        <UniProfileInfoSkeleton />
      ) : uniProfile ? (
        <UniProfileInfo uniProfile={uniProfile} />
      ) : null}
    </div>
  );
};

export default UniProfileInfoContainer;
