import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import { useQueryClient } from '@tanstack/react-query';

import { loadCurrenciesOptions } from '@/utils/shared/loadOptions';
import { loadUniversityStaffOptions } from '@/utils/university/loadUniversityOptions';
import SelectAsyncPaginate from '@/components/shared/SelectAsyncPagination/SelectAsyncPagination';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import { defaultUserPicture } from '@/components/ui/images';
import {
  // useGetSettingTeam,
  useGetUniversitySettings,
  useUpdateUniversitySettings,
} from '@/hooks/university/university-hooks';
import { useVerificationContext } from '@/contexts/verification';
import { DashboardSettingsRequestDTO } from '@/hooks/university/dtos';
import { StaffFilterOuts } from '@/@types/shared/type';
import { StudentSetting } from '@/@types/university/university';
import { CustomButton } from '../Button/Button';
import HStack from '../stacks/HStack';
import VStack from '../stacks/VStack';
import styles from './verification.module.scss';
import LoadingTableSkeleton from './loading';
import { DeleteIcon } from '../SVG-components';

type TTeamData = {
  name: string;
  profilePhoto: string | null;
  value: string;
};

const inputSelectStyle = {
  menuList: (base) => ({
    ...base,
    maxHeight: '187px',
    zIndex: 1,
    fontWeight: 400,
    fontSize: '14px',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? 'white' : provided.backgroundColor,
  }),
};

const Settings = () => {
  const [team, setTeam] = useState<TTeamData | null>(null);
  const { currTab } = useVerificationContext();
  const [verificationCharge, setVerificationCharge] = useState(null);
  const [currency, setCurrency] = useState('USD');

  const { data: universityProfile, isPending: isLoading } =
    useGetUniversitySettings();
  const data = universityProfile?.setting as StudentSetting;
  // const universitySetting = universityProfile?.setting || {} as StudentSetting;

  const tableHeaderData = [
    "User",
    "Action"
  ];


  const { mutate: editUniversitySettings, isPending: isSavingSettings } =
    useUpdateUniversitySettings({
      onSuccess: () => {
        successAlert({
          message: 'Settings updated successfully',
        });
        setVerificationCharge(null);
        setCurrency('');
        setTeam(null);
        queryClient.invalidateQueries({ queryKey: ['universitySetting'] });
      },
      onError: (error) => {
        errorAlert({
          message: error?.response?.data?.message,
        });
      },
    });

  const [teamSelected, setTeamSelected] = useState<TTeamData[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && !isLoading) {
      setVerificationCharge(data?.verificationCharge);
      setCurrency(data?.currency);
      setTeamSelected(
        data?.verificationTeam.map((d) => ({
          name: `${d.firstName} ${d.lastName}`,
          profilePhoto: d?.profilePhoto ? d?.profilePhoto : defaultUserPicture,
          value: d?.id,
        }))
      );
    }
  }, [data, isLoading]);

  const CustomLabelOption = (option: TTeamData) => {
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

  const handleAddTeam = () => {
    if (team) {
      const teamSelec = teamSelected.filter((t) => t.value !== team.value);
      setTeamSelected([...teamSelec, team]);
    }
    setTeam(null);
  };

  const handleSubmitSettings = async () => {
    const submitData: DashboardSettingsRequestDTO = {
      verificationCharge,
      currency,
      verificationTeam: teamSelected.map((tm) => tm.value),
    };

    editUniversitySettings(submitData,);
  };
  const cureencyValue = currency ? { value: currency, label: currency } : null;

  console.log("currTab", currTab)

  return (
    <Stack
      className={styles.mainContainer}
      sx={{
        padding: {
          md: '58px 32px',
          sm: "58px 16px"
        },
        backgroundColor: 'white',
        // position: { xs: 'fixed', lg: 'static' },
        // height: { xs: '100vh', lg: 'auto' },
        // display: { xs: 'flex', lg: currTab === 'settings' ? 'flex' : 'none' },
        flexDirection: { md: "column", lg: "row" }
      }}
    >
      <VStack sx={{maxWidth: "450px"}}>
        <Typography className={styles.settingsTitle}>
          Verification settings
        </Typography>

        <Typography
          className={styles.settingsSubtitle}
          sx={{ marginBottom: '25px' }}
        >
          In here You can set verification amount which required for verifications
          and choose your verification team
        </Typography>
      </VStack>

      <VStack xs={{flex: 1}}>
        <VStack>
          <Typography
            className={styles.settingsLabel}
            sx={{ marginBottom: '8px' }}
          >
            Verification Amount
          </Typography>

          {isLoading || isSavingSettings ? (
            <Skeleton
              animation="wave"
              sx={{
                height: '40px',
              }}
              className={styles.input_select}
            />
          ) : (
              <Stack sx={{
                alignItems: {
                  sm: 'start',
                  md: 'center',
                },
                flexDirection: { sm: "column", md: "row" }
              }}>
                <VStack sx={{maxWidth: "300px", marginBottom: "24px"}}>
                  <p className={styles.descText}>
                    Set an amount to be charged for verifying students' credentials.
                  </p>
                </VStack>
                <Stack sx={{
                  gap: "8px",
                  flexDirection: "row",
                }}>
                  <SelectAsyncPaginate
                    loadOptions={loadCurrenciesOptions}
                    onChange={(e) => setCurrency(e.value)}
                    value={cureencyValue}
                    placeholder={'Currency'}
                    isDisabled={false}
                    className={styles.currencySelect}
                  />
                  <TextField
                    type="number" // Specify input type as number
                    value={verificationCharge}
                    onChange={(e) => setVerificationCharge(e.target.value)}
                    placeholder="Enter Amount"
                    className={styles.amountSelect}
                  />
                </Stack>
              </Stack>
          )}

          <Divider
            sx={{
              margin: '24px 0',
            }}
          />

          <Stack sx={{
            flexDirection: {
              sm: "column",
              md: "row",
            },
            gap: {
              sm: "16px",
              md: "4px",
            },
            marginBottom: "16px"
          }}>
            <VStack sx={{maxWidth: "300px", marginBottom: "16px"}}>
              <Typography
                className={styles.settingsLabel}
                sx={{ marginBottom: '8px' }}
              >
                Verification Team
              </Typography>
              <p className={styles.descText}>
                Assign users to be in charge of handling verification requests.
              </p>
            </VStack>
            <Stack direction="row" alignItems="center" gap={2} sx={{width: "100%"}}>
              <VStack sx={{flex: 1}}>
                <SelectAsyncPaginate
                  value={team}
                  onChange={(e) => setTeam(e)}
                  placeholder="Select Team"
                  getOptionLabel={CustomLabelOption}
                  getOptionValue={(option: TTeamData) => option.value}
                  filterOption={customTeamFilter}
                  loadOptions={(searchQuery, prevOptions, { page }) =>
                    loadUniversityStaffOptions(
                      searchQuery,
                      prevOptions,
                      { page },
                      StaffFilterOuts.VERIFICATION_TEAM
                    )
                  }
                  className={styles.input_select}
                  styles={inputSelectStyle}
                  isClearable
                />
              </VStack>
              <CustomButton
                type="button"
                label="Add"
                onClick={handleAddTeam}
                disabled={!team}
              />
            </Stack>
          </Stack>


          <VStack
            sx={{
              border: "1px solid #ECECED",
              borderRadius: "16px",
              overflow: "hidden"
            }}
          >
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

              {isLoading || isSavingSettings ? (
                <LoadingTableSkeleton />
              ) : (
                <TableBody>
                  {teamSelected?.map((item, index) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell
                        className={styles.listTableLabel}
                        sx={{
                          color: {
                            xs: 'blue !important',
                            md: '#110c22 !important',
                          },
                          cursor: 'pointer',
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="between"
                          sx={{gap: "8px"}}
                        >
                          <Image
                            width={32}
                            height={32}
                            src={
                              item.profilePhoto ? item.profilePhoto : defaultUserPicture
                            }
                            style={{ borderRadius: '32px' }}
                            alt={item.name}
                          />
                          <Typography>{item.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell
                        className={styles.listTableLabel}
                      >
                        <div
                          className={styles.teamDeleteIcon}
                          onClick={() =>
                            setTeamSelected(
                              teamSelected.filter((t) => t.value !== item.value)
                            )
                          }
                        >
                          <DeleteIcon color='#CF2A2A' />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {teamSelected?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ textAlign: 'center' }}>
                        No verification requests found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </VStack>

          <Box mt={2}>
            <CustomButton
              type="button"
              label="Apply"
              buttonClass="signup_submit"
              disabled={
                verificationCharge === null || isSavingSettings ? true : false
              }
              onClick={handleSubmitSettings}
            />
          </Box>
        </VStack>
      </VStack>

    </Stack>
  );
};

export default Settings;
