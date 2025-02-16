import { useEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';
// import { useDebounce } from 'usehooks-ts';
import { DateRange, TabContext, TabList } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';

import useScreenView from '@/utils/useScreenView';
import { CustomTabPanel } from '@/components/shared';
// import { useGetAllVosTokenTransactions } from '@/hooks/shared/vosToken-hook';
import TokenTransactionsTable from '../TokenTransactionsTable';
import { formatIsoDate } from '@/utils';
import SelectRangeDate from '../../selectRangeDate';

import { TabWalletOptions } from '@/hooks/candidate/dtos';
import { useGetAllDigitalWalletTransactions } from '@/hooks/shared/wallet-hook';
import { TPayloadQueryWalletTransaction } from '@/@types/shared/wallet';

// type Tab = 'ledger' | 'earned' | 'spent';

type TabsList = {
  label: string;
  value: TabWalletOptions;
};

const tabsList: TabsList[] = [
  {
    label: 'Ledger',
    value: TabWalletOptions.TRANSACTIONS,
  },
  {
    label: 'Earnings',
    value: TabWalletOptions.EARNING,
  },
  {
    label: 'Spendings',
    value: TabWalletOptions.WITHDRAWAL,
  },
];

const TokenTransactionsCard = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isReachedBottom = useScreenView(bottomRef);

  const [tab, setTab] = useState<TabWalletOptions>(TabWalletOptions.TRANSACTIONS);
  const [daysValue, setDaysValue] = useState<DateRange<Dayjs>>(() => ['', '']);
  // const [searchValue, setSearchValue] = useState<string>('');
  // const debouncedSearchValue = useDebounce<string>(searchValue, 300);

  const debounceData: TPayloadQueryWalletTransaction = {
    category: '',
    startDate: formatIsoDate(daysValue[0], 'YYYY-MM-DD'),
    endDate: formatIsoDate(daysValue[1], 'YYYY-MM-DD'),
    // search: debouncedSearchValue,
    for: 'credit',
    type: tab === TabWalletOptions.TRANSACTIONS ? '' : tab,

  };

  const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage,
  } = useGetAllDigitalWalletTransactions(debounceData);

  // const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
  //   useGetAllVosTokenTransactions({
  //     category: tab === 'ledger' ? '' : tab,
  //     search: '',
  //     for: 'credit',
  //     type: tab === TabWalletOptions.TRANSACTIONS ? '' : tab,

  //   });
  const vosTokenData = data?.pages.map((page) => page.items)[0];

  const handleTabChange = (e: React.SyntheticEvent, tab: TabWalletOptions) => {
    setTab(tab);
  };

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [isReachedBottom]);

  return (
    <Box borderRadius={'1rem'} sx={{ background: 'white' }} marginTop={3}>
      <Grid container padding={3} alignItems="center" sx={{ justifyContent: { sx: 'flex-between', xxl: 'flex-end' } }}>
        <Grid item xs={12} sm={8} md={8} xl={6}>
          <Typography variant="h6" fontWeight={600}>
            Credit Transactions
          </Typography>
          <Typography color={'#676472'} fontSize={12}>
            Data of All Credits transactions
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={4} xl={6} justifyContent={'end'} marginTop={1}>
          <SelectRangeDate
            value={daysValue}
            onChange={(newValue) => {
              const [startDate, endDate] = newValue as [Dayjs, Dayjs];
              setDaysValue([startDate, endDate]);
              console.log('OutPut =>', formatIsoDate(newValue[0], 'YYYY-MM-DD'), '=>', formatIsoDate(newValue[1], 'YYYY-MM-DD'));
            }}
            format='DD/MM/YYYY'
            range
            placeholder="Sort by Date"

          />
        </Grid>
      </Grid>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange}>
            {tabsList.map((item: TabsList, index) => (
              <Tab key={index} label={item.label} value={item.value} />
            ))}
          </TabList>
        </Box>
      </TabContext>
      {tabsList.map((item, index) => (
        <CustomTabPanel key={index} index={item.value} value={tab}>
          <TokenTransactionsTable
            data={vosTokenData}
            isLoading={isPending}
            isFetchingNextPage={isFetchingNextPage}
            bottomRef={bottomRef}
          />
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default TokenTransactionsCard;
