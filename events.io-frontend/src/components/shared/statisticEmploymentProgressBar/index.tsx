import React from 'react';
import { Grid } from '@mui/material';

import VStack from '@/components/shared/stacks/VStack';
import { useGetUniversityStudentStatisticsByEmployment } from '@/hooks/university';
import styles from '@/app/university/dashboard/dashboard.module.scss';
import { OptionType } from '@/utils';
import StatisticItem from '../totalProgress/statisticItem';

type Props = {
  defaultClassYear: string;
  qualification: OptionType | null;
};

const containerStyles = {
  backgroundColor: 'transparent !important',
  padding: '24px 0px !important',
  boxShadow: 'none !important',
};

const itemStyles = {
  backgroundColor: 'white !important',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05) !important',
};

const employmentOption = [
  {
    label: 'Employed',
    value: 'employed',
  },
  {
    label: 'Self Employed',
    value: 'selfEmployed',
  },
  {
    label: 'Unemployed',
    value: 'unemployed',
  },
  {
    label: 'Further Studies',
    value: 'furtherStudies',
  },
];

export default function StatisticEmploymentProgress(props: Props) {
  const { defaultClassYear, qualification } = props;

  const { data } = useGetUniversityStudentStatisticsByEmployment({
    classYear: defaultClassYear,
    credential: qualification?.value || '',
  });

  const statisticData = data?.data;

  return (
    <VStack
      className={[styles.compContainer, styles.whiteContainerShadow].join(' ')}
      sx={containerStyles}
    >
      <Grid container columnSpacing={'16px'} rowSpacing={'24px'}>
        {employmentOption?.map((item, key) => (
          <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
            <StatisticItem
              title={item.label}
              item={statisticData?.[item.value] || 0}
              itemStyles={itemStyles}
              value={item.value}
            />
          </Grid>
        ))}
      </Grid>
    </VStack>
  );
}
