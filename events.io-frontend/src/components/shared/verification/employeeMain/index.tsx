'use client';

import React, { useState } from 'react';

import { useGetEmployerVerifications } from '@/hooks/employer/useEmployer';
import { useVerificationContext } from '@/contexts/verification';
import HStack from '../../stacks/HStack';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';
import TableView from './TableView';
import VerificationSearch from './VerificationSearch';

export type Employee = {
  _id: string;
  fullName: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  jobTitle: string;
  description: string;
  status: string;
  experienceLevels: string;
};

const EmployeeMain = () => {
  const { currTab } = useVerificationContext();

  const [sort, setSort] = useState('PENDING');
  const sortItems = ['PENDING', 'DECLINED', 'VERIFIED'];
  const [search, setSearch] = useState('');

  const { data } = useGetEmployerVerifications();

  return (
    <HStack
      className={styles.mainContainer}
      sx={{
        paddingBottom: { xs: '50px', lg: '0px' },
        borderRadius: { xs: '16px', lg: '0px' },
        display: { xs: 'flex', lg: currTab === 'requests' ? 'flex' : 'none' },
      }}
    >
      <VStack className={styles.listContainer}>
        <VerificationSearch
          setSearch={setSearch}
          setSort={setSort}
          sort={sort}
          sortItems={sortItems}
        />
        <TableView data={data?.data?.items} search={search} />
      </VStack>
    </HStack>
  );
};

export default EmployeeMain;
