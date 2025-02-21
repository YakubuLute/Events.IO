'use client';
import HStack from '../stacks/HStack';
import styles from './verification.module.scss';
import ButtonSpacing from '../Button/ButtonSpacing';
import { TabVerificationOptions, useVerificationContext } from '@/contexts/verification';

const Tabs = () => {
  const { currTab, setCurrTab } = useVerificationContext();

  const handleTabsChange = (tab: TabVerificationOptions) => {
    setCurrTab(tab);
    window.history.pushState({}, '', `?tab=${tab}`);
  };

  return (
    <HStack
      className={styles.tabsContainer}
      sx={{
        backgroundColor: {
          xs: 'transparent',
          lg: 'white',
        },
        padding: { xs: '0px', lg: '1px 0px 0px 10px' },
        marginTop: { xs: '36px', lg: '20px' },
        justifyContent: { xs: 'space-between', lg: 'unset' },
      }}
    >
      <ButtonSpacing
        className={styles.tab}
        sx={{
          padding: { xs: '0px', lg: '8px 16px' },
          color: {
            xs: '#110C22',
            lg: currTab === 'requests' ? '#0C27BE' : '#071754',
          },
          borderBottom: {
            xs: 'none',
            lg:
              currTab === 'requests'
                ? '2px solid var(--blue, #0C27BE)'
                : 'none',
          },
        }}
        onClick={() => handleTabsChange(TabVerificationOptions.REQUESTS)}
      >
        Verification Requests
      </ButtonSpacing>
      <ButtonSpacing
        className={styles.tab}
        sx={{
          padding: { xs: '0px', lg: '8px 16px' },
          color: {
            xs: '#0C27BE',
            lg: currTab === 'settings' ? '#0C27BE' : '#071754',
          },
          borderBottom: {
            xs: 'none',
            lg:
              currTab === 'settings'
                ? '2px solid var(--blue, #0C27BE)'
                : 'none',
          },
        }}
        onClick={() => handleTabsChange(TabVerificationOptions.SETTINGS)}
      >
        Settings
      </ButtonSpacing>
    </HStack>
  );
};

export default Tabs;
