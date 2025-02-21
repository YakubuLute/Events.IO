import React from 'react';
import Image from 'next/image';

import { SchoolEventResponseDTO } from '@/hooks/university';
import styles from './styles.module.scss';

type Props = {
  event: SchoolEventResponseDTO;
};

const EventsBanner = ({ event }: Props) => {
  return (
    <div className={styles.sliderContainer}>
      <Image
        src={event?.coverImage || '/images/banner.jpeg'}
        alt="Default Cover Ptoto"
        width={652}
        height={180}
        className={styles.defaultImg}
      />
    </div>
  );
};

export default EventsBanner;
