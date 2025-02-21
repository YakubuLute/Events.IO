'use client';
import React, { useState } from 'react';
import VStack from '../stacks/VStack';
import styles from './verification.module.scss';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import HStack from '../stacks/HStack';
import ButtonSpacing from '../Button/ButtonSpacing';
import { useVerificationContext } from '@/contexts/verification';
import ArrowBack from '../icons/arrowBackBlack';

type SelectType = {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  items: string[];
};

const CustomSelect = (props: SelectType) => {
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
          {props?.items?.map((item: string, index: number) => {
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

const EmployeeFilters = () => {
  const [company, setCompany] = useState('none');
  const [year, setYear] = useState('none');
  const [position, setPosition] = useState('none');
  const { filterOpen, setFilterOpen } = useVerificationContext();
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
            <Typography className={styles.filterDateField}>
              01 / 08 / 22
            </Typography>
          </VStack>

          <VStack className={styles.filterDateItem}>
            <Typography className={styles.filterDateLabel}>To</Typography>
            <Typography className={styles.filterDateField}>
              01 / 08 / 22
            </Typography>
          </VStack>
        </HStack>
        {
          // Make Custom Date Component later
        }

        <VStack className={styles.filterFiltersContainer}>
          <CustomSelect
            items={['test', 'test2']}
            label="Company"
            placeholder="Choose company"
            value={company}
            setValue={setCompany}
          />

          <CustomSelect
            items={['2000', '2002']}
            label="Work dates"
            placeholder="Choose year"
            value={year}
            setValue={setYear}
          />

          <CustomSelect
            items={['Marketing Coordinator', 'Medical Assistant']}
            label="Positions"
            placeholder="Choose position"
            value={position}
            setValue={setPosition}
          />

          <ButtonSpacing
            className={styles.filterButton}
            sx={{ display: { xs: 'none', lg: 'block' } }}
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

export default EmployeeFilters;
