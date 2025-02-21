import React from 'react';
import Link from 'next/link';
import { Grid, Typography } from '@mui/material';

import { CustomButton, PaginationRounded } from '@/components/shared';
import EmptyBox from '@/components/shared/empty';
import ForwardArrowIcon from '@/components/shared/SVG-components/ForwardArrowIcon';
import {
  SchoolAllUpdatesResponseDTO,
  UniversityFullProfileResponseDTO,
  UpdateQueryParams,
} from '@/hooks/university';
import AddIcon from '../SVG-components/AddIcon';
import UniUpdateCardSkeleton from './skeletons/UniUpdateCardSkeleton';
import styles from './styles.module.scss';
import UniUpdateCard from './UniUpdateCard';

type Props = {
  loading: boolean;
  uniUpdatesData: SchoolAllUpdatesResponseDTO | undefined;
  uniProfile: UniversityFullProfileResponseDTO | undefined;
  isAll?: boolean;
  setFilterDTO?: (value: UpdateQueryParams) => void;
  filterDTO?: UpdateQueryParams;
  platform: 'candidate' | 'university' | 'employer';
};

const UniUpdatesContainer = ({
  loading,
  uniUpdatesData,
  uniProfile,
  isAll,
  filterDTO,
  setFilterDTO,
  platform,
}: Props) => {
  return (
    <div className={styles.updatesContainer}>
      {!isAll ? (
        <div className={styles.headerBox}>
          <div className={styles.header}>
            <Typography className={styles.titleText}>School Updates</Typography>
            <Typography className={styles.descriptionText}>
              See whats happening at {uniProfile?.institutionName}
            </Typography>
          </div>
          {platform === 'candidate' ? (
            uniUpdatesData && uniUpdatesData.totalPages > 1 ? (
              <Link href={`/candidate/schools/updates?uId=${uniProfile?._id}`}>
                <CustomButton
                  label="View All Updates"
                  className={styles.viewMoreBtn}
                  endIcon={<ForwardArrowIcon />}
                  variant="contained"
                />
              </Link>
            ) : null
          ) : null}
          {platform === 'university' ? (
            <Link href={`/university/edit/updates/new`}>
              <CustomButton
                label="Create Update"
                className={styles.viewMoreBtn}
                startIcon={<AddIcon />}
                variant="contained"
              />
            </Link>
          ) : null}
        </div>
      ) : null}
      <Grid container spacing={1}>
        {loading ? (
          Array.from({ length: 4 })
            .fill('')
            .map((_, idx) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={isAll ? 12 : 6}
                key={idx}
              >
                <UniUpdateCardSkeleton />
              </Grid>
            ))
        ) : uniUpdatesData && uniUpdatesData.items.length ? (
          uniUpdatesData.items.map((update) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={isAll ? 12 : 6}
              key={update._id}
            >
              <UniUpdateCard update={update} platform={platform} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <EmptyBox message="Updates will show here" />
          </Grid>
        )}
      </Grid>
      {isAll &&
      uniUpdatesData &&
      uniUpdatesData.totalPages > 1 &&
      setFilterDTO ? (
        <div className="pagination-container">
          <PaginationRounded
            count={uniUpdatesData?.totalPages || 0}
            siblingCount={1}
            variant="outlined"
            shape="rounded"
            page={uniUpdatesData?.currentPage || 0}
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
  );
};

export default UniUpdatesContainer;
