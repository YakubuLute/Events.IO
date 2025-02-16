import React from 'react';
import { Grid, Typography } from '@mui/material';

import { loadUniversityClassYearOptions } from '@/utils/university/loadUniversityOptions';
import HStack from '@/components/shared/stacks/HStack';
import VStack from '@/components/shared/stacks/VStack';
import { useGetUniversityFullProfile } from '@/hooks/university';
import { ITOptions } from '@/@types/shared/type';
import styles from '@/app/university/dashboard/dashboard.module.scss';
import SelectAsyncPaginate from '../SelectAsyncPagination/SelectAsyncPagination';
import StatisticItem from './statisticItem';

type Props = {
  data: Array<Statistic>;
  title: string;
  numStudents: number;
  showTotalStudents: boolean;
  yearFilter?: ITOptions | null;
  setYearFilter?: (year: ITOptions) => void;
};

type Statistic = {
  title: string;
  number: number;
};

const itemStyles = {
  backgroundColor: 'rgba(12, 39, 190, 0.05)',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05) !important',
};

const TotalProgress = (props: Props) => {
  const {
    data,
    title,
    numStudents,
    showTotalStudents,
    yearFilter,
    setYearFilter,
  } = props;

  const { data: schoolProfile } = useGetUniversityFullProfile();

  const qualificationsOffered = schoolProfile?.qualificationsOffered;

  return (
    <VStack
      className={[styles.compContainer, styles.whiteContainerShadow].join(' ')}
    >
      {title && (
        <HStack className={styles.totalRow}>
          <Typography className={styles.totalTitle}>{title}</Typography>
          <SelectAsyncPaginate
            loadOptions={loadUniversityClassYearOptions as any}
            onChange={(option) =>
              setYearFilter && setYearFilter(option as ITOptions)
            }
            value={
              yearFilter
                ? { value: String(yearFilter.value), label: yearFilter.label }
                : null
            }
            placeholder="All Class Year"
            className="min-w-[160px]"
            isClearable
          />
        </HStack>
      )}
      {showTotalStudents && (
        <Typography className={styles.totalSubtitle}>{numStudents}</Typography>
      )}

      <Grid container columnSpacing={'16px'} rowSpacing={'24px'}>
        {qualificationsOffered?.map((item, key) => {
          const firstWordQualification = item.split(' ')[0];
          return (
            <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
              <StatisticItem
                title={item}
                item={data?.[firstWordQualification] || 0}
                itemStyles={itemStyles}
                value={firstWordQualification}
              />
            </Grid>
          );
        })}
      </Grid>
    </VStack>
  );
};

export default TotalProgress;
