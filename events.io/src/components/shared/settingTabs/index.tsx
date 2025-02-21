import styled from '@emotion/styled';
import { Tab, Tabs } from '@mui/material';
import React from 'react';

interface props {
  actualTab: string;
  setActualTab: React.Dispatch<React.SetStateAction<string>>;
  options: {
    label: string;
    value: string;
  }[];
}

const SettingTabs = ({ actualTab, setActualTab, options }: props) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActualTab(newValue);
  };

  return (
    <TabsStyled value={actualTab} onChange={handleChange} aria-label="tabs">
      {options.map((tab, index) => (
        <Tab key={index} label={tab.label} value={tab.value} />
      ))}
    </TabsStyled>
  );
};

const TabsStyled = styled(Tabs)({
  marginBottom: '20px',
  '& .MuiButtonBase-root': {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 10,
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#0C27BE',
    color: '#0C27BE !important',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
  },
  '& .Mui-selected': {
    fontWeight: 600,
    color: '#071754',
    opacity: 0.8,
  },
});

export default SettingTabs;
