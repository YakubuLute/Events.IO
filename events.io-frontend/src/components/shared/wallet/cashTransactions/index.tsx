import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from 'usehooks-ts';
import { Dayjs } from 'dayjs';

import { Search } from '@mui/icons-material';
import { DateRange, TabContext, TabList } from '@mui/lab';
import { Box, Grid, Tab, Typography } from '@mui/material';

import useScreenView from '@/utils/useScreenView';
import { CustomInput, CustomTabPanel } from '@/components/shared';
import SelectRangeDate from '@/components/shared/selectRangeDate';

// import CalendarIcon from '@/components/ui/icons/calendarIcon';
import { useGetAllDigitalWalletTransactions } from '@/hooks/shared/wallet-hook';
import {
  TPayloadQueryWalletTransaction,
  TWalletTransaction,
} from '@/@types/shared/wallet';
import CashTransactionTable from '../CashTransactionsTable';
import DonationDetailsModal from '../modals/DonationDetailsModal';
import DonationHistoryModal, {
  TDonationTxData,
} from '../modals/DonationHistoryModal';
import EarningTransactionModal from '../modals/EarningModal';
import WithdrawTransactionModal from '../modals/WithdrawTransactionModal';
import { TabWalletOptions } from '@/hooks/candidate/dtos';
import { formatIsoDate } from '@/utils';

type TabsList = {
  label: string;
  value: TabWalletOptions;
};

const tabsList: TabsList[] = [
  {
    label: 'All Transactions',
    value: TabWalletOptions.TRANSACTIONS,
  },
  {
    label: 'Earnings',
    value: TabWalletOptions.EARNING,
  },
  {
    label: 'Withdrawals',
    value: TabWalletOptions.WITHDRAWAL,
  },
];

type TransactionsProps = {
  sector?: 'employer' | 'university' | 'candidate';
}

const CashTransactionsCard = ({ sector }: TransactionsProps) => {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab') as TabWalletOptions;

  const isCandidate = sector === 'candidate';
  const [tab, setTab] = useState<TabWalletOptions>(tabQuery || TabWalletOptions.TRANSACTIONS);
  const [searchValue, setSearchValue] = useState<string>('');
  const [daysValue, setDaysValue] = useState<DateRange<Dayjs>>(() => ['', '']);
  // dayjs('2022-04-17'), dayjs('2022-04-17')

  const handleTabChange = (e: React.SyntheticEvent, tab: TabWalletOptions) => {
    setTab(tab);
    window.history.pushState({}, '', `?tab=${tab}`);
  };

  const [earningModalOpen, setEarningfromModalOpen] = useState<boolean>(false);
  const [donationDetailsOpen, setDonationDetailsOpen] =
    useState<boolean>(false);
  const [donationHistoryOpen, setDonationHistoryOpen] =
    useState<boolean>(false);
  const [widthDrawTxModalOpen, setWithdrawTxModalOpen] =
    useState<boolean>(false);
  const [selectedCashTxData, setSelectedCashTxData] =
    useState<TWalletTransaction>();

  const bottomRef = useRef<HTMLDivElement>(null);
  const isReachedBottom = useScreenView(bottomRef);

  const debouncedSearchValue = useDebounce<string>(searchValue, 300);

  const debounceData: TPayloadQueryWalletTransaction = {
    category: '',
    // date: '',
    startDate: formatIsoDate(daysValue[0], 'YYYY-MM-DD'),
    endDate: formatIsoDate(daysValue[1], 'YYYY-MM-DD'),
    search: debouncedSearchValue,
    status: '',
    type: tab === TabWalletOptions.TRANSACTIONS ? '' : tab,
  };

  const {
    data,
    isPending: isLoadingTransactions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetAllDigitalWalletTransactions(debounceData);

  const transactionDataPage = data?.pages.map((page) => page.items);
  // console.log('transactionDataPage', transactionDataPage);

  const handleTransactionClick = (transactionData: TWalletTransaction) => {
    setSelectedCashTxData(transactionData);
    if (transactionData?.category !== 'withdrawal') {
      setEarningfromModalOpen(true);
    } else {
      setWithdrawTxModalOpen(true);
    }
  };

  const handleDonationHistoryView = (
    event: MouseEvent<HTMLElement>,
    transactionData: TWalletTransaction
  ) => {
    setEarningfromModalOpen(false);
    setDonationHistoryOpen(true);
  };

  const DonationHistoryRowClick = (
    e: MouseEvent<HTMLElement>,
    donationTxData: TDonationTxData
  ) => {
    setDonationHistoryOpen(false);
    setDonationDetailsOpen(true);
  };

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [debouncedSearchValue, isReachedBottom]);

  return (
    <Box borderRadius={'1rem'} sx={{ background: 'white' }} marginTop={3}>
      <Grid container padding={3} alignItems="center" sx={{ justifyContent: { sx: 'flex-between', xxl: 'flex-end' } }}>
        <Grid item xs={12} lg={4} xl={4}>
          <Typography variant="h6" fontWeight={600}>
            Cash Transactions
          </Typography>
          <Typography color={'#676472'} fontSize={12}>
            Data of All Cash transactions
          </Typography>
        </Grid>
        <Grid
          item
          // xxl={6}
          md={12}
          lg={8}
          xl={8}
          alignItems={'center'}
          marginTop={2}
        >
          <Grid container rowSpacing={2} sx={{ justifyContent: { sx: 'flex-between', xxl: 'flex-end' } }}>
            <Grid item xs={12} md={7} lg={7} xxl={isCandidate && 6} pl={1.5}>
              <CustomInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                startAdornment={<Search />}
              />
            </Grid>
            <Grid xs={12} md={5} lg={5} xxl={isCandidate && 6} item>
              <SelectRangeDate
                value={daysValue}
                onChange={(newValue) => {
                  const [startDate, endDate] = newValue as [Dayjs, Dayjs];
                  setDaysValue([startDate, endDate]);
                  console.log('OutPut =>', formatIsoDate(newValue[0], 'YYYY-MM-DD'), '=>', formatIsoDate(newValue[1], 'YYYY-MM-DD'));
                }}
                format='DD/MM/YYYY'
                range
                placeholder="Select Date Range"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange}>
            {tabsList?.map((item: TabsList, index) => (
              <Tab key={index} label={item.label} value={item.value} />
            ))}
          </TabList>
        </Box>
      </TabContext>
      {
        tabsList?.map((item: TabsList, index) => (
          <CustomTabPanel key={index} index={item.value} value={tab}>
            <CashTransactionTable
              onRowClick={handleTransactionClick}
              transactionDataPage={transactionDataPage}
              isLoading={isLoadingTransactions}
              isFetchingNextPage={isFetchingNextPage}
              bottomRef={bottomRef}
            />
          </CustomTabPanel>
        ))
      }

      <EarningTransactionModal
        transactionSelect={selectedCashTxData!}
        open={earningModalOpen}
        onClose={() => setEarningfromModalOpen(false)}
        onViewDetailClick={handleDonationHistoryView}
      />
      <DonationHistoryModal
        open={donationHistoryOpen}
        onClose={() => setDonationHistoryOpen(false)}
        onRowClick={DonationHistoryRowClick}
      />
      <DonationDetailsModal
        open={donationDetailsOpen}
        onClose={() => setDonationDetailsOpen(false)}
      />
      <WithdrawTransactionModal
        transactionSelect={selectedCashTxData!}
        open={widthDrawTxModalOpen}
        onClose={() => setWithdrawTxModalOpen(false)}
      />
    </Box >
  );
};

export default CashTransactionsCard;
