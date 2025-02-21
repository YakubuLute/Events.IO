'use client';

import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore';
import {
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import DeclineDetails from '@/components/shared/verification/modals/declineDetails';
import VerifyDetails from '@/components/shared/verification/modals/verifyDetails';
import useGetUniversityVerificationRequests from '@/hooks/university/getUniversityVerificationRequests';
import { useGetUniversityVerificationStatistics } from '@/hooks/university/university-hooks';
import { useDeclineUniversityRequest } from '@/hooks/university/useVerificationRequestsUpdates';
import { useVerificationContext } from '@/contexts/verification';
import { VerificationDashboardStudent } from '@/hooks/university/dtos';

import ButtonSpacing from '../Button/ButtonSpacing';
import Search from '../icons/search';
import SelectRangeDate from '../selectRangeDate';
import HStack from '../stacks/HStack';
import VStack from '../stacks/VStack';
import { errorAlert, successAlert } from '../toastAlert';
// import Filters from './filters';
import LoadingTableSkeleton from './loading';
import VerifyRequestStudent from './verifyRequestStudent';
import styles from './verification.module.scss';

const tableHeaderData = [
  'Dates',
  'Full name',
  'Student ID',
  'Duration',
  'Qualifications',
  'Descipline',
  'Overall GPA',
  'Status',
];


interface Props {
  verificationRequestsLoading?: boolean;
}

const MainVerification: React.FC<Props> = ({ verificationRequestsLoading }) => {
  const [sort, setSort] = useState('All');
  const sortItems = ['All', 'Pending', 'Verified', 'Declined'];
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState(['', '']);
  const [query, setQuery] = useState(null);
  const [onSearch, setOnSearch] = useState(false);

  const queryClient = useQueryClient();
  // const { handleSelectAlumni } = useAlumniProfileStore();

  const {
    setVerifyDetailsOpen,
    setDeclineDetailsOpen,
    verificationRequests,
    currTab,
    setBlockChainLoading,
    setVerificationSuccessOpen,
    verifyDetailsUserInfo,
  } = useVerificationContext();

  const {
    isPending: isLoading,
    isFetching,
    refetch,
  } = useGetUniversityVerificationRequests(query);
  const {
    data: verificationStatistics,
    isPending: verificationStatisticsLoading,
  } = useGetUniversityVerificationStatistics();

  const { mutate: declineRequest, isPending: isVerifying } =
    useDeclineUniversityRequest({
      onSuccess: () => {
        setVerifyDetailsOpen(false);
        setBlockChainLoading(false);
        setVerificationSuccessOpen(true);
        setDeclineDetailsOpen(false);
        //   setSuccessData({
        //     heading: 'credentials have been verified!',
        //     message: `${verifyDetailsUserInfo?.fullName}'s credentials have been successfully verified and securely recorded on the blockchain.`,
        //     buttons: true,
        //   });

        successAlert({
          message: 'Update request done successfully',
        });

        queryClient.invalidateQueries({ queryKey: ['verificationRequests'] });
        queryClient.invalidateQueries({
          queryKey: ['universityVerificationStatistics'],
        });
      },
      onError: (error) => {
        errorAlert({
          message: error?.response?.data?.message || 'Something Wrong',
        });
      },
    });

  const handleSubmitVerification = () => {
    declineRequest({
      verificationRequestId: verifyDetailsUserInfo?._id || '',
      payload: {
        status: 'VERIFIED',
        declineReason: '',
      },
    });
  };

  const handleSubmitDeclination = ({ reason }: { reason: string }) => {
    declineRequest({
      verificationRequestId: verifyDetailsUserInfo?._id || '',
      payload: {
        status: 'DECLINED',
        declineReason: reason,
      },
    });
  };

  const handleSort = async (val) => {
    const queryParams = { sortBy: val };
    if (values[0] && values[1]) {
      queryParams['startDate'] = values[0];
      queryParams['endDate'] = values[1];
    }
    if (search) {
      queryParams['search'] = search;
    }
    setQuery(queryParams);
  };

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  const handlePaginate = async () => {
    const queryParams = { itemsPerPage: 50 * pagination, page: 1 };
    setQuery(queryParams);
    refetch();
  };

  useEffect(() => {
    setOnSearch(true);
    const bounce = setTimeout(() => {
      const queryParams = { search };
      if (values[0] && values[1]) {
        queryParams['startDate'] = values[0];
        queryParams['endDate'] = values[1];
      }
      setQuery(queryParams);
      setOnSearch(false);
    }, 500);
    return () => clearTimeout(bounce);
  }, [search]);

  return (
    <>
      <HStack
        className={styles.mainContainer}
        sx={{
          paddingBottom: { xs: '50px', lg: '0px' },
          borderRadius: { xs: '16px', lg: '0px' },
          display: { xs: 'flex', lg: currTab === 'requests' ? 'flex' : 'none' },
          minHeight: { xs: '100vh', lg: '60vh' },
        }}
      >
        {/* <Filters mutateAsync={mutateAsync} isLoading={isLoading} /> */}
        <VStack
          className={styles.listContainer}
          sx={{
            minHeight: { xs: '100vh', lg: '60vh' },
            gap: { xs: '20px', lg: '20px' },
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={2}
            flexWrap={'wrap'}
            px={2}
          >
            <Typography
              className={styles.listHeaderTitle}
              noWrap
              display={{ xs: 'none', lg: 'block' }}
            >
              {verificationStatisticsLoading ? (
                <Skeleton variant="text" width={200} height={20} />
              ) : (
                `Verification Requests (${verificationStatistics?.total})`
              )}
            </Typography>

            <Stack
              direction={{ sx: 'column', md: 'row' }}
              alignItems={{ md: 'center' }}
              justifyContent={'space-between'}
              gap={2}
            // sx={{ width: '100%' }}
            >
              <TextField
                size="small"
                className={styles.listHeaderInput}
                InputProps={{
                  className: styles.listHeaderInput,
                  classes: { input: styles.listHeaderInputText },
                  startAdornment: <Search />,
                }}
                placeholder="Search"
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                spacing={1}
              >
                <Typography
                  className={styles.listHeaderSort}
                  noWrap
                  display={{ xs: 'none', lg: 'block' }}
                >
                  Sort By
                </Typography>
                <FormControl
                  className={styles.listHeaderSortSelect}
                  size="small"
                  sx={{
                    width: { xs: '180px', lg: '150px' },
                    backgroundColor: { xs: '#F2F4FF', lg: 'white' },
                    border: {
                      xs: '1px solid #CED4F2',
                      lg: '1px solid #ececed',
                    },
                  }}
                >
                  <Select
                    className={styles.listHeaderSortSelect}
                    value={sort}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSort(e.target.value);
                      handleSort(e.target.value.toUpperCase());
                    }}
                    placeholder="Select"
                    renderValue={(value: string) => (
                      <Typography
                        className={styles.listHeaderSortSelectText}
                        sx={{
                          '&::before': {
                            content: { xs: `"Sort by "`, lg: `''` },
                          },
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  >
                    {sortItems.map((item: string, index: number) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={-1}>
                <Typography
                  className={styles.listHeaderSort}
                  noWrap
                  flexShrink={0}
                  display={{ xs: 'none', lg: 'block' }}
                >
                  By Date
                </Typography>
                <SelectRangeDate
                  value={values}
                  onChange={async (val) => {
                    if (val) {
                      setValues(val);
                      const [startDate, endDate] = val;
                      const queryParams = {
                        startDate,
                        endDate,
                        sortBy: sort.toUpperCase(),
                      };
                      if (startDate && endDate) {
                        setQuery(queryParams);
                      }
                    } else setValues(['', '']);
                  }}
                  range
                  placeholder="Select Date Range"
                />
              </Stack>
            </Stack>
          </Stack>

          <Table
            sx={{
              '& .MuiTableCell-root': {
                margin: '20px 0',
              },
            }}
          >
            <TableHead>
              <TableRow>
                {tableHeaderData.map((heading, index) => (
                  <TableCell
                    key={index}
                    className={styles.listTableTitle}
                    sx={{
                      display: {
                        xs: 'none',
                        md: 'table-cell',
                        lg: 'none',
                        xl: 'table-cell',
                      },
                      fontSize: { xs: '11px', lg: '14px' },
                      textTransform: { xs: 'uppercase', lg: 'unset' },
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {isLoading || verificationRequestsLoading || isFetching || onSearch ? (
              <LoadingTableSkeleton />
            ) : (
              <TableBody>
                {verificationRequests?.items?.map((student: VerificationDashboardStudent) => (
                  <VerifyRequestStudent key={student._id} student={student} />
                ))}

                {verificationRequests?.totalItems === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: 'center' }}>
                      No verification requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>

          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            flexWrap={'wrap'}
            px={2}
            style={{
              marginTop: 'auto',
              display: verificationRequests?.pageSize < 20 ? 'none' : 'flex',
            }}
          >
            <ButtonSpacing
              className={styles.loadMoreBtn}
              onClick={() => {
                setPagination(pagination + 1);
                handlePaginate();
              }}
            >
              Load more
            </ButtonSpacing>
          </Stack>
        </VStack>
      </HStack>
      <DeclineDetails
        handleSubmitDeclination={handleSubmitDeclination}
        isDeclining={isVerifying}
      />
      <VerifyDetails
        handleSubmitVerification={handleSubmitVerification}
        isVerifying={isVerifying}
      />
    </>
  );
};

export default MainVerification;
