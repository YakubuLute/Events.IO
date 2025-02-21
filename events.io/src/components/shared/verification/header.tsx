'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import { defaultUserPicture } from '@/components/ui/images';
import {
  // useGetSettingTeam,
  useGetUniversitySettings,
  useGetUniversityVerificationStatistics,
  useUpdateUniversitySettings,
} from '@/hooks/university/university-hooks';
import { loadUniversityStaffOptions } from '@/utils/university/loadUniversityOptions';
// import { useVerificationContext } from '@/contexts/verification';

import { StaffFilterOuts } from '@/@types/shared/type';
import { CustomButton } from '../Button/Button';
import ButtonSpacing from '../Button/ButtonSpacing';
import SelectAsyncPaginate from '../SelectAsyncPagination/SelectAsyncPagination';
import HStack from '../stacks/HStack';
import VStack from '../stacks/VStack';
import AddButton from './icons/addButton';
import styles from './verification.module.scss';
import { DashboardSettingsRequestDTO } from '@/hooks/university/dtos';
import { StudentSetting } from '@/@types/university/university';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

type TTeamData = {
  name: string;
  profilePhoto: string;
  value: string;
};

const inputSelectStyle = {
  menuList: (base) => ({
    ...base,
    maxHeight: '200px',
    zIndex: 1,
    fontWeight: 500,
    fontSize: '14px',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? 'white' : provided.backgroundColor,
  }),
};

const Header = () => {
  const queryClient = useQueryClient();
  // const { data: settingTeam, isPending: isLoading } = useGetSettingTeam();

  const {
    data: verificationStatistics,
    isPending: verificationStatisticsLoading,
  } = useGetUniversityVerificationStatistics();
  const { data: university, isPending: universitySettingLoading } =
    useGetUniversitySettings();
  const [team, setTeam] = useState<TTeamData | null>(null);
  const [settingForm, showSettingForm] = useState(false);
  const universitySetting = university?.setting || {} as StudentSetting;

  const { mutate: editUniversitySettings, isPending: settingsPending } =
    useUpdateUniversitySettings({
      onSuccess: () => {
        successAlert({
          message: 'Teamember added successfully',
        });
        showSettingForm(false);
        setTeam(null);
        queryClient.invalidateQueries({ queryKey: ['universitySetting'] });
      },
      onError: (error) => {
        errorAlert({
          message: error?.response?.data?.message,
        });
      },
    });

  const handleAddTeam = async () => {
    const submitData: DashboardSettingsRequestDTO = {
      verificationCharge: Number(universitySetting?.verificationCharge),
      currency: universitySetting?.currency || '',
      verificationTeam: [
        ...(universitySetting?.verificationTeam
          ? universitySetting.verificationTeam
            .filter((e) => team && e.id !== team.value)
            .map((e) => e.id)
          : []),
        team ? team.value : undefined,
      ],
    };

    editUniversitySettings(submitData,);
  };

  const CustomLabelOption = (option) => {
    return (
      <Stack direction="row" alignItems="center" gap={2}>
        <Stack style={{ height: '30px', width: '30px' }} alignItems="center">
          <Image
            src={option.profilePhoto || defaultUserPicture}
            width={30}
            height={30}
            alt={option.name}
            className={styles.headerImgRounded}
          />
        </Stack>
        <Typography>{option.name}</Typography>
      </Stack>
    );
  };

  const customTeamFilter = (option, searchText) => {
    if (option.data.name?.toLowerCase().includes(searchText?.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <VStack className={styles.headerContainer}>
      <HStack
        className={styles.headerRow}
        sx={{
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Typography className={styles.headerTitle}>
          Verification Center
        </Typography>

        <HStack
          className={styles.headerRightContainer}
          sx={{
            width: { xs: '100%', md: 'auto' },
            marginBottom: { xs: '32px', md: '0px' },
          }}
        >
          <Typography className={styles.headerRightTitle}>
            Verification Team
          </Typography>

          {universitySettingLoading || settingsPending ? (
            <HStack>
              {' '}
              <Skeleton animation="wave" className={styles.teamSkeleton} />{' '}
              <Skeleton animation="wave" className={styles.teamSkeleton} />
            </HStack>
          ) : (
            <HStack sx={{ position: 'relative', alignItems: "center" }}>
              {universitySetting?.verificationTeam?.slice(0,2)?.map(
                (team: any, index: number) => {
                  return (
                    <Image
                      key={index + team?.id}
                      src={team?.profilePhoto || defaultUserPicture}
                      width={32}
                      height={32}
                      alt={team.firstName}
                      className={styles.headerImgRounded}
                      style={{
                        right:
                          index !== 0 ? (index === 1 ? '10px' : '20px') : '',
                      }}
                    />
                  );
                }
                )}
                {universitySetting?.verificationTeam?.length > 2 ? (
                  <>
                    <div className={styles.headerImgCountRounded}>
                      +2
                    </div>
                    <div tabIndex={1} className={styles.dropdownWrapper}>
                      <KeyboardArrowDownOutlined />
                      <div className={styles.remainingTeam}>
                        {universitySetting?.verificationTeam?.slice(0, 2)?.map((team, index) => (
                          <div key={index + team?.id}>
                            <Image
                              src={team?.profilePhoto || defaultUserPicture}
                              width={32}
                              height={32}
                              alt={team.firstName}
                              className={styles.headerImg}
                              style={{
                                right:
                                  index !== 0 ? (index === 1 ? '10px' : '16px') : '',
                              }}
                            />

                            <h5>{team.firstName} {team.lastName}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
            </HStack>
          )}
        </HStack>
      </HStack>
      <Box
        position={'relative'}
        borderRadius={{ xs: '16px', md: '0px' }}
        className={styles.headerStatsContainer}
      >
        <Box className={styles.headerStatsCircle1} />
        <Box className={styles.headerStatsCircle2} />
        <HStack
          sx={{
            gap: { xs: '50px', xl: '100px' },
            zIndex: 5,
            position: 'relative',
            padding: '10px 20px',
          }}
        >
          <HStack
            className={styles.headerStatsLeftContainer}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            <Box>
              <Doughnut
                data={{
                  datasets: [
                    {
                      data: [
                        verificationStatistics?.pending.total,
                        verificationStatistics?.verified.total,
                        verificationStatistics?.declined.total,
                      ],
                      backgroundColor: ['#E09400', '#0C27BE', '#F03D3D'],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
                style={{ width: '150px', height: '150px' }}
              />
            </Box>
            <VStack className={styles.headerStatsBoxes}>
              <HStack className={styles.headerStatsMobileBox}>
                <HStack className={styles.headerStatsBoxContainer}>
                  <Box className={styles.headerStatsBox} bgcolor={'#E09400'} />
                  <Typography className={styles.headerStatsBoxLabel}>
                    Pending
                  </Typography>
                </HStack>
                <Typography
                  className={styles.headerStatsRightTitleSmall}
                  color={'#E09400'}
                  display={{ xs: 'flex', md: 'none' }}
                >
                  {verificationStatistics?.pending.total}
                </Typography>
              </HStack>
              <HStack className={styles.headerStatsMobileBox}>
                <HStack className={styles.headerStatsBoxContainer}>
                  <Box className={styles.headerStatsBox} bgcolor={'#560CAD'} />
                  <Typography className={styles.headerStatsBoxLabel}>
                    Verified
                  </Typography>
                </HStack>
                <Typography
                  className={styles.headerStatsRightTitleSmall}
                  color={'#0C27BE'}
                  display={{ xs: 'flex', md: 'none' }}
                >
                  {verificationStatistics?.verified.total}
                </Typography>
              </HStack>

              <HStack className={styles.headerStatsMobileBox}>
                <HStack className={styles.headerStatsBoxContainer}>
                  <Box className={styles.headerStatsBox} bgcolor={'#F03D3D'} />
                  <Typography className={styles.headerStatsBoxLabel}>
                    Declined
                  </Typography>
                </HStack>
                <Typography
                  className={styles.headerStatsRightTitleSmall}
                  display={{ xs: 'flex', md: 'none' }}
                  color="#F03D3D"
                >
                  {verificationStatistics?.declined.total}
                </Typography>
              </HStack>
            </VStack>
          </HStack>

          <HStack
            className={styles.headerStatsRightContainer}
            sx={{ display: { xs: 'none', md: 'flex' }, gap: "12px" }}
          >
            <VStack className={styles.headerStatsRightItem}>
              <Typography
                className={styles.headerStatsRightTitle}
                color="#110C22"
              >
                {verificationStatisticsLoading ? (
                  <Skeleton animation="wave" className={styles.teamSkeleton} />
                ) : (
                  verificationStatistics?.total
                )}
              </Typography>

              <Typography className={styles.headerStatsRightSubtitle}>
                Total Verifications
              </Typography>
            </VStack>

            <VStack className={styles.headerStatsRightItem}>
              <Typography
                className={styles.headerStatsRightTitle}
                color="#E09400"
              >
                {verificationStatisticsLoading ? (
                  <Skeleton animation="wave" className={styles.teamSkeleton} />
                ) : (
                  verificationStatistics?.pending.total
                )}
              </Typography>

              <Typography className={styles.headerStatsRightSubtitle}>
                Pending
              </Typography>
            </VStack>

            <VStack className={styles.headerStatsRightItem}>
              <Typography
                className={styles.headerStatsRightTitle}
                color="#0C27BE"
              >
                {verificationStatisticsLoading ? (
                  <Skeleton animation="wave" className={styles.teamSkeleton} />
                ) : (
                  verificationStatistics?.verified.total
                )}
              </Typography>

              <Typography className={styles.headerStatsRightSubtitle}>
                Verified
              </Typography>
            </VStack>

            <VStack className={styles.headerStatsRightItem}>
              <Typography
                className={styles.headerStatsRightTitle}
                color="#F03D3D"
              >
                {verificationStatisticsLoading ? (
                  <Skeleton animation="wave" className={styles.teamSkeleton} />
                ) : (
                  verificationStatistics?.declined.total
                )}
              </Typography>

              <Typography className={styles.headerStatsRightSubtitle}>
                Declined
              </Typography>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Header;
