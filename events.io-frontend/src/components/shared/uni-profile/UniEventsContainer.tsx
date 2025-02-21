import React from 'react';
import Link from 'next/link';
import { Grid, Typography } from '@mui/material';

import { CustomButton, PaginationRounded } from '@/components/shared';
import EmptyBox from '@/components/shared/empty';
import ForwardArrowIcon from '@/components/shared/SVG-components/ForwardArrowIcon';
import {
  EventQueryParams,
  SchoolAllEventsResponseDTO,
  UniversityFullProfileResponseDTO,
  UpdateQueryParams,
} from '@/hooks/university';
import AddIcon from '../SVG-components/AddIcon';
import UniEventCardSkeleton from './skeletons/UniEventCardSkeleton';
import styles from './styles.module.scss';
import UniEventCard from './UniEventCard';

type Props = {
  loading: boolean;
  uniEventsData: SchoolAllEventsResponseDTO | undefined;
  uniProfile: UniversityFullProfileResponseDTO | undefined;
  setFilterDTO?: (value: EventQueryParams) => void;
  filterDTO?: UpdateQueryParams;
  isAll?: boolean;
  platform: 'candidate' | 'university' | 'employer';
};

const UniEventsContainer = ({
  uniProfile,
  loading,
  uniEventsData,
  filterDTO,
  setFilterDTO,
  isAll,
  platform,
}: Props) => {
  return (
    <div className={styles.updatesContainer}>
      {!isAll ? (
        <div className={styles.headerBox}>
          <div className={styles.header}>
            <Typography className={styles.titleText}>
              Upcoming Events
            </Typography>
            <Typography className={styles.descriptionText}>
              See whats happening at {uniProfile?.institutionName}
            </Typography>
          </div>
          {platform === 'candidate' ? (
            uniEventsData && uniEventsData.totalPages > 1 ? (
              <Link href={`/candidate/schools/events?uId=${uniProfile?._id}`}>
                <CustomButton
                  label="View All Events"
                  className={styles.viewMoreBtn}
                  endIcon={<ForwardArrowIcon />}
                  variant="contained"
                />
              </Link>
            ) : null
          ) : null}
          {platform === 'university' ? (
            <Link href={`/university/edit/events/new`}>
              <CustomButton
                label="Create Event"
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
          Array.from({ length: 2 })
            .fill('')
            .map((_, idx) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={idx}>
                <UniEventCardSkeleton />
              </Grid>
            ))
        ) : uniEventsData && uniEventsData.items.length ? (
          uniEventsData.items.map((event) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={event._id}>
              <UniEventCard
                event={event}
                filterDTO={filterDTO}
                platform={platform}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <EmptyBox message="Events will show here" />
          </Grid>
        )}
      </Grid>
      {isAll &&
      uniEventsData &&
      uniEventsData.totalPages > 1 &&
      setFilterDTO ? (
        <div className="pagination-container">
          <PaginationRounded
            count={uniEventsData?.totalPages || 0}
            siblingCount={1}
            variant="outlined"
            shape="rounded"
            page={uniEventsData?.currentPage || 0}
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

export default UniEventsContainer;
