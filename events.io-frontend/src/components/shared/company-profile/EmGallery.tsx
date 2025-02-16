import React, { useState } from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { PaginationRounded } from '@/components/shared';
import {
  TEmployerGalleryData,
  TGalleryPayload,
} from '@/@types/employer/employer';
import { truncateString } from '@/utils';
import EmGalleryModal from './EmGalleryModal';
import styles from './styles.module.scss';

type Props = {
  galleryData: TEmployerGalleryData;
  filterDTO: TGalleryPayload;
  setFilterDTO: (values: TGalleryPayload) => void;
};

const EmGallery = ({ galleryData, filterDTO, setFilterDTO }: Props) => {
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [imgCurrentIndex, setImgCurrentIndex] = useState(0);

  const onClickModal = (imgId: string) => {
    const findIndex = galleryData.items.findIndex((g) => g._id === imgId);
    setImgCurrentIndex(findIndex > -1 ? findIndex : 0);
    setOpenGalleryModal(true);
  };

  return (
    <>
      <div className={styles.galleryContainer}>
        <Typography className={styles.titleText}>
          Photos({galleryData?.totalItems})
        </Typography>

        <div className={styles.photoGallery}>
          <div className={styles.column}>
            {galleryData.items.slice(0, 3).map((imageItem) => (
              <div
                className={styles.photo}
                key={imageItem._id}
                role="button"
                onClick={() => onClickModal(imageItem._id)}
                aria-label="Open Gallery Modal"
              >
                <Image
                  src={imageItem?.image}
                  alt={`${imageItem?.caption} Image`}
                  width={286}
                  height={200}
                  unoptimized
                  priority
                  className={styles.imageItem}
                />
                <div className={styles.overlay}></div>
                <Typography component="span" className={styles.imageCaption}>
                  {truncateString(imageItem?.caption || 'No Caption', 50)}
                </Typography>
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {galleryData.items.slice(3, 6).map((imageItem) => (
              <div
                className={styles.photo}
                key={imageItem._id}
                onClick={() => onClickModal(imageItem._id)}
                aria-label="Open Gallery Modal"
              >
                <Image
                  src={imageItem?.image}
                  alt={`${imageItem?.caption} Image`}
                  width={286}
                  height={200}
                  unoptimized
                  priority
                  className={styles.imageItem}
                />
                <div className={styles.overlay}></div>
                <Typography component="span" className={styles.imageCaption}>
                  {truncateString(imageItem?.caption || 'No Caption', 50)}
                </Typography>
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {galleryData.items.slice(6).map((imageItem) => (
              <div
                className={styles.photo}
                key={imageItem._id}
                onClick={() => onClickModal(imageItem._id)}
                aria-label="Open Gallery Modal"
              >
                <Image
                  src={imageItem?.image}
                  alt={`${imageItem?.caption} Image`}
                  width={286}
                  height={200}
                  unoptimized
                  priority
                  className={styles.imageItem}
                />
                <div className={styles.overlay}></div>
                <Typography component="span" className={styles.imageCaption}>
                  {truncateString(imageItem?.caption || 'No Caption', 50)}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {galleryData.totalPages > 1 ? (
          <div className="pagination-container">
            <PaginationRounded
              count={galleryData?.totalPages || 0}
              siblingCount={1}
              variant="outlined"
              shape="rounded"
              page={galleryData?.currentPage || 0}
              onChange={(_, page) => {
                setFilterDTO({
                  ...filterDTO,
                  page: page,
                });
              }}
              sx={{
                '& .Mui-selected': {
                  backgroundColor: '#0b2fb6 !important',
                  color: 'white !important',
                },
              }}
            />
          </div>
        ) : null}
      </div>
      {openGalleryModal ? (
        <EmGalleryModal
          galleryData={galleryData}
          onClose={() => setOpenGalleryModal(false)}
          open={openGalleryModal}
          imgCurrentIndex={imgCurrentIndex}
          setImgCurrentIndex={setImgCurrentIndex}
        />
      ) : null}
    </>
  );
};

export default EmGallery;
