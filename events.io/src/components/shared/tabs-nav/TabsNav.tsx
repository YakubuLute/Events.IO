'use client';

import React, { ReactNode, SyntheticEvent } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';

export interface TabOption {
  label: string | ReactNode;
  value: string;
  component: string | ReactNode;
}

interface TabsNavProps {
  value: string;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  options: Array<TabOption>;
  tail?: ReactNode;
  onChange?: (event: SyntheticEvent<Element, Event>, value: string) => void;
  padding?: string;
}

const TabsNav: React.FC<TabsNavProps> = ({
  tail,
  value,
  options,
  variant = 'standard',
  onChange = () => {},
  padding,
}) => {
  return (
    <TabContext value={value}>
      <Stack direction="row" justifyContent="space-between">
        <TabList
          onChange={(event, value) => onChange(event, value)}
          variant={variant}
          allowScrollButtonsMobile
          scrollButtons
          sx={{
            width: '100%',
            textTransform: 'capitalize',
            '.Mui-selected': {
              color: '#0C27BE !important',
            },
            '.MuiTabs-scrollButtons.Mui-disabled': {
              opacity: '0.9',
              display: 'none',
            },
            borderBottom: '1px solid #ECECED',
          }}
          TabIndicatorProps={{
            style: {
              background: '#0C27BE',
            },
          }}
        >
          {options.map((e, i) => {
            return (
              <Tab
                key={i + '_tab'}
                label={e.label}
                value={e.value}
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  color: '#8D8A95',
                }}
              />
            );
          })}
        </TabList>
        {tail && <Stack sx={{ textAlign: 'end' }}>{tail}</Stack>}
      </Stack>
      {options.map((e, i) => {
        return (
          <TabPanel
            sx={{ padding: padding || 0 }}
            key={i + '_panel'}
            value={e.value}
          >
            {e.component}
          </TabPanel>
        );
      })}
    </TabContext>
  );
};

export default TabsNav;
