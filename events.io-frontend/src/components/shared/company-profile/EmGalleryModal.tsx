import React from 'react';
import Image from 'next/image';
import { Grid, IconButton, Typography } from '@mui/material';

import { CustomDialog } from '@/components/shared';
import CancelIcon from '@/components/shared/SVG-components/CancelIcon';
import NextIcon from '@/components/shared/SVG-components/NextIcon';
import PreviousIcon from '@/components/shared/SVG-components/PreviousIcon';
import { TEmployerGalleryData } from '@/@types/employer/employer';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  galleryData: TEmployerGalleryData;
  imgCurrentIndex: number;
  setImgCurrentIndex: (value: number) => void;
};

const EmGalleryModal = ({
  galleryData,
  onClose,
  open,
  imgCurrentIndex,
  setImgCurrentIndex,
}: Props) => {
  const renderTop = () => {
    return (
      <div className={styles.modalTop}>
        <IconButton className={styles.closeBtn} onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </div>
    );
  };

  const onNextClick = () => {
    if (imgCurrentIndex < galleryData.items.length - 1) {
      setImgCurrentIndex(imgCurrentIndex + 1);
    } else {
      setImgCurrentIndex(0);
    }
  };

  const onPrevClick = () => {
    if (imgCurrentIndex > 0) {
      setImgCurrentIndex(imgCurrentIndex - 1);
    } else {
      setImgCurrentIndex(galleryData.items.length - 1);
    }
  };

  return (
    <CustomDialog
      onClose={onClose}
      open={open}
      headContent={renderTop()}
      noBorder
      width="lg"
      bgBlack
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className={styles.arrowsContainer}>
            <IconButton className={styles.arrowBtn} onClick={onPrevClick}>
              <PreviousIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className={styles.imgContainer}>
            <Image
              src={galleryData.items[imgCurrentIndex].image}
              alt={`${galleryData.items[imgCurrentIndex].caption} Image`}
              width={500}
              height={100}
              unoptimized
              priority
            />
            <Typography className={styles.captionText}>
              {galleryData.items[imgCurrentIndex]?.caption || 'No Caption'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={styles.arrowsContainer}>
            <IconButton className={styles.arrowBtn} onClick={onNextClick}>
              <NextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default EmGalleryModal;
