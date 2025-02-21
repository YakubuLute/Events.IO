'use client';

import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { CustomInput } from '@/components/shared';
// import DatePicker from '@mui/lab/DatePicker';
import CustomDatePicker from '@/components/shared/datePicker/customDatePicker';
import { useGetUniversityVerificationRequestsFilters } from '@/hooks/university/getUniversityVerificationRequests';
import {
  useGetCandidateAcademicDisciplines,
  useGetCandidateEducationCredentials,
} from '@/hooks/university/university-hooks';
import { useVerificationContext } from '@/contexts/verification';
import ButtonSpacing from '../Button/ButtonSpacing';
import ArrowBack from '../icons/arrowBackBlack';
import HStack from '../stacks/HStack';
import VStack from '../stacks/VStack';
import styles from './verification.module.scss';

type SelectType = {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  items: string[];
};

const CustomSelect = (props: SelectType) => {
  console.log(props.items);
  return (
    <VStack className={styles.form}>
      <Typography className={styles.formLabel}>{props?.label}</Typography>
      <FormControl className={styles.formSelect} size="small">
        <Select
          value={props?.value}
          className={styles.formSelect}
          sx={{ color: props?.value === 'none' ? '#8D8A95' : '' }}
          onChange={(e) => props?.setValue(e.target.value)}
        >
          {props?.value === 'none' && (
            <MenuItem disabled value="none">
              {props?.placeholder}
            </MenuItem>
          )}
          {props?.items.map((item: string, index: number) => {
            return (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </VStack>
  );
};

const Filters = ({ mutateAsync, isPending: isLoading }) => {
  const [institution, setInstitution] = useState('none');
  const [year, setYear] = useState('none');
  const [program, setProgram] = useState('none');
  const [qualification, setQualification] = useState('none');
  const [GPA, setGPA] = useState('none');
  const [startDate, setStartDate] = useState<Dayjs | null>('none');
  const [endDate, setEndDate] = useState<Dayjs | null>('none');
  const { filterOpen, setFilterOpen } = useVerificationContext();
  const { data: credentialsOptions, isPending: credentialsOptionsLoading } =
    useGetCandidateEducationCredentials();
  const { data: displineOptions, isPending: displineOptionsLoading } =
    useGetCandidateAcademicDisciplines();

  const handleFilter = async () => {
    const queryParams = {
      year,
      program: program?.toLowerCase(),
      qualification,
      gpa: GPA,
      institution,
      startDate,
      endDate,
    };
    await mutateAsync(queryParams);
  };

  const getQualifications = displineOptions?.items.map(
    (program: { name: string; value: string }) => program.name
  );
  const programOptions = credentialsOptions?.items.map(
    (qualification: { name: string; value: string }) => qualification.value
  );
  return (
    <VStack
      sx={{
        position: { xs: 'fixed', lg: 'static' },
        top: 0,
        left: 0,
        width: { xs: '100%', lg: 'auto' },
        alignItems: { xs: 'center', lg: 'unset' },
        backgroundColor: { xs: '#F7F8FA', lg: 'unset' },
        zIndex: { xs: 50, lg: 0 },
        height: { xs: '100vh', lg: 'auto' },
        transform: {
          xs: !filterOpen ? 'translateY(100vh)' : 'translateY(0)',
          lg: 'unset',
        },
        transition: { xs: 'transform 0.5s', lg: 'unset' },
      }}
    >
      <HStack
        sx={{
          paddingLeft: { xs: '20px', lg: '36px' },
          width: { xs: '100%', lg: 'auto' },
          backgroundColor: { xs: 'white', lg: 'unset' },
          paddingY: { xs: '14px', lg: '0px' },
          gap: '34px',
        }}
      >
        <ButtonSpacing
          sx={{
            display: { xs: 'flex', lg: 'none' },
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          onClick={() => setFilterOpen(false)}
        >
          <ArrowBack />
        </ButtonSpacing>
        <Typography className={styles.filterTitle}>Filters</Typography>
      </HStack>

      <VStack
        className={styles.filterContainer}
        sx={{
          maxWidth: { xs: '350px', lg: '400px' },
          borderRight: { xs: 'none', lg: '1px solid #f0f0f0' },
          padding: { xs: '20px 16px 68px 16px', lg: '0px 36px 50px 36px' },
          overflowY: { xs: 'auto', lg: 'unset' },
        }}
      >
        <Typography
          className={styles.filterSubtitle}
          fontSize={{ xs: '16px', lg: '12px' }}
          color={{ xs: '##110C22', lg: '#4f4b5c' }}
          marginTop={{ xs: '0px', lg: '33px' }}
        >
          Select a Date
        </Typography>
        <HStack className={styles.filterDateRow}>
          <VStack className={styles.filterDateItem}>
            <Typography className={styles.filterDateLabel}>From</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={isLoading}
                value={startDate}
                defaultValue={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
          </VStack>

          <VStack className={styles.filterDateItem}>
            <Typography className={styles.filterDateLabel}>To</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={isLoading}
                value={endDate}
                defaultValue={dayjs()}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </VStack>
        </HStack>
        {
          // Make Custom Date Component later
        }

        <VStack className={styles.filterFiltersContainer}>
          <CustomSelect
            disabled={isLoading}
            items={['2000', '2002']}
            label="Year"
            placeholder="Choose year"
            value={year}
            setValue={setYear}
          />

          <CustomSelect
            disabled={isLoading}
            items={programOptions || []}
            label="Program"
            placeholder="Choose program"
            value={program}
            setValue={setProgram}
          />

          <CustomSelect
            disabled={isLoading}
            items={getQualifications || []}
            label="Qualifications"
            placeholder="Choose qualifications"
            value={qualification}
            setValue={setQualification}
          />

          <VStack className={styles.form}>
            <Typography className={styles.formLabel}>GPA</Typography>
            <FormControl className={styles.formSelect} size="small">
              <CustomInput
                disabled={isLoading}
                placeholder="Enter GPA"
                value={GPA}
                onChange={(e) => setGPA(e.currentTarget.value)}
              />
            </FormControl>
          </VStack>

          <ButtonSpacing
            className={styles.filterButton}
            sx={{ display: { xs: 'none', lg: 'block' } }}
            onClick={handleFilter}
            disabled={isLoading}
          >
            Apply
          </ButtonSpacing>
        </VStack>
      </VStack>
      <ButtonSpacing
        className={styles.filterButtonMobile}
        sx={{ display: { xs: 'block', lg: 'none' } }}
      >
        Apply
      </ButtonSpacing>
    </VStack>
  );
};

export default Filters;
