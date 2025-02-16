'use client';
import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import Search from '../../icons/search';
import HStack from '../../stacks/HStack';
import styles from '../verification.module.scss';

function VerificationSearch({ setSearch, setSort, sort, sortItems }) {
  return (
    <HStack className={styles.listHeader}>
      <Typography
        className={styles.listHeaderTitle}
        noWrap
        display={{ xs: 'none', lg: 'block' }}
      >
        Verification Requests
      </Typography>
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
      <HStack sx={{ gap: '14px' }}>
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
            border: { xs: '1px solid #CED4F2', lg: '1px solid #ececed' },
          }}
        >
          <Select
            className={styles.listHeaderSortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            placeholder="test"
            renderValue={(value: string) => (
              <Typography
                className={styles.listHeaderSortSelectText}
                sx={{
                  '&::before': { content: { xs: `"Sort by "`, lg: `''` } },
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
      </HStack>
    </HStack>
  );
}

export default VerificationSearch;
