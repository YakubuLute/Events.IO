import { MouseEventHandler, useEffect, useState } from 'react';
import {
  ArrowDownward,
  // ContentCopyRounded,
  TrendingDown,
  TrendingUp,
} from '@mui/icons-material';
// import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  Grid,
  // IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
// import { useCopyToClipboard } from 'usehooks-ts';

import Token from '@/components/shared/icons/token';
import WalletCard from '@/components/shared/wallet/WalletCard';
// import { truncateAddress } from '@/utils/truncateAddress';
// import CopyIcon from '@/components/ui/icons/copyIcon';
import SalesIcon from '@/components/ui/icons/salesIcon';
import {
  useGetDigitalTransactionSummary,
  useGetDigitalWallet,
} from '@/hooks/shared/wallet-hook';

interface WalletStatusCardProps {
  onWithdrawClick: MouseEventHandler<HTMLElement>;
  sector?: 'employer' | 'university' | 'candidate';
}
export default function WalletStatusCard({
  onWithdrawClick,
  sector,
}: WalletStatusCardProps) {
  const isCandidate = sector === 'candidate';
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const [_, copyAddress] = useCopyToClipboard();
  const { data: walletData, isPending: isLoadingBalance } =
    useGetDigitalWallet();

  const { data: summaryData, isPending: isLoadSummary } =
    useGetDigitalTransactionSummary();

  const handleWithdrawClick = (e: any) => {
    onWithdrawClick(e);
  };

  // const handleCopyAddress = (address: string) => {
  //   copyAddress(address);
  //   setIsCopied(true);
  // };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <Grid
      container
      mt={4}
      alignItems={'center'}
      justifyContent={'space-between'}
      spacing={2.5}
    >
      {/* Cash Balance */}
      <Grid item xs={12} md={isCandidate && 12} lg={5} xxl={isCandidate ? 4 : 5}>
        <Box>
          {isLoadingBalance ? (
            <DigitalBalanceItemSkeleton />
          ) : (
            <WalletCard>
              <Stack
                padding={'2rem'}
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Stack gap={'1.5rem'}>
                  <Typography fontSize={14} color={'#FFFFFFC2'}>
                    Cash Balance
                  </Typography>
                  <Stack gap={'1rem'}>
                    <Stack>
                      <Typography fontSize={24} color={'white'}>
                        {walletData?.localCurrency}{' '}
                        <strong>{walletData?.amountInLocalCurrency}</strong>
                      </Typography>
                      <Typography fontSize={14} color={'#FFFFFFC2'}>
                        {walletData?.currency} {walletData?.balance}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'}>
                      <Button
                        variant="outlined"
                        fullWidth
                        endIcon={<ArrowDownward />}
                        size={'small'}
                        sx={{
                          borderRadius: 2,
                          borderColor: '#CED4F2',
                          background: '#F2F4FF',
                          height: 36,
                          '&:hover': { backgroundColor: '#CED4F2' },
                        }}
                        onClick={handleWithdrawClick}
                        disabled
                      >
                        Withdraw Funds
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack>
                  <Stack
                    sx={{
                      borderRadius: '50%',
                      background: '#FFFFFF1F',
                      width: '48px',
                      height: '48px',
                      padding: 1,
                    }}
                  >
                    <SalesIcon />
                  </Stack>
                </Stack>
              </Stack>
            </WalletCard>
          )}
        </Box>
      </Grid>

      {/* Total Transaction */}
      <Grid item xs={12} md={isCandidate && 8} lg={7} xxl={isCandidate ? 5 : 7} py={1}>
        <Box
          borderRadius={'1rem'}
          sx={{ background: 'white', padding: { xs: 1, sm: 3 } }}
        >
          <Typography color={'black'} fontSize={18} fontWeight={600}>
            Total Transaction
          </Typography>
          <Grid container marginTop={1}>
            <Grid item xs={12} sm={12} md={6} padding={1}>
              {isLoadSummary ? (
                <TransactionItemSkeleton />
              ) : (
                <Box
                  height="100%"
                  padding={2}
                  border={'1px solid lightgrey'}
                  borderRadius={'1rem'}
                >
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography color={'grey'}>Total Earnings</Typography>
                    <Box
                      sx={{ borderRadius: '50%', backgroundColor: 'lightGrey' }}
                    >
                      <TrendingUp sx={{ height: '1rem' }} />
                    </Box>
                  </Stack>
                  <Stack direction={'row'} marginTop={1} gap={1}>
                    <Typography variant={'h5'} fontSize={22} fontWeight={500}>
                      {summaryData?.localCurrency}
                    </Typography>
                    <Typography variant="h5" fontSize={22} fontWeight={700}>
                      {summaryData?.inflow.amountInLocalCurrency}
                    </Typography>
                  </Stack>
                  <Typography color={'grey'} fontSize={14}>
                    {summaryData?.currency} {summaryData?.inflow.amount}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} padding={1}>
              {isLoadSummary ? (
                <TransactionItemSkeleton />
              ) : (
                <Box
                  height="100%"
                  padding={2}
                  border={'1px solid lightgrey'}
                  borderRadius={'1rem'}
                >
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography color={'grey'}>Total Withdrawls</Typography>
                    <Box
                      sx={{ borderRadius: '50%', backgroundColor: 'lightGrey' }}
                    >
                      <TrendingDown sx={{ height: '1rem' }} />
                    </Box>
                  </Stack>
                  <Stack direction={'row'} marginTop={1} gap={1}>
                    <Typography variant={'h5'} fontSize={22} fontWeight={500}>
                      {summaryData?.localCurrency}
                    </Typography>
                    <Typography variant="h5" fontSize={22} fontWeight={700}>
                      {summaryData?.outflow.amountInLocalCurrency}
                    </Typography>
                  </Stack>
                  <Typography color={'grey'} fontSize={14}>
                    {summaryData?.currency} {summaryData?.outflow.amount}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Credit Balance */}
      {isCandidate && (
        <Grid item xs={12} sm={12} md={4} lg={5} xxl={3}>
          <Box height="100%">
            {isLoadingBalance ? (
              <DigitalBalanceItemSkeleton />
            ) : (
              <WalletCard sx={{ backgroundColor: '#F2F4FF !important' }}>
                <Stack
                  padding={'2rem'}
                  direction={'row'}
                  justifyContent={'space-between'}
                  minHeight={215}
                >
                  <Stack gap={'1.2rem'}>
                    <Typography fontSize={14} color={'#8D8A95'}>
                      Credit Balance
                    </Typography>
                    <Stack>
                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant={'h5'} fontSize={22} fontWeight={500}>
                          {walletData?.symbol}
                        </Typography>
                        <Typography variant="h5" fontSize={22} fontWeight={700}>
                          {walletData?.creditBalance}
                        </Typography>
                      </Stack>

                      <Typography fontSize={14} color={'#8D8A95'}>
                        {walletData?.currency} {walletData?.creditBalance}
                      </Typography>

                      {/* <Stack
                      direction={'row'}
                      alignItems={'center'}
                      spacing={1}
                      width={'fit-content'}
                      gap={1}
                      sx={{ background: '#E7E9F9', borderRadius: '100px' }}
                      padding={1}
                      px={2}
                    >
                      <Typography color={'#110C22'} fontSize={14} sx={{ wordWrap: 'break-word' }}>
                        {truncateAddress(vosTokenBalance?.address)}
                      </Typography>
                      <IconButton
                        onClick={() => handleCopyAddress(vosTokenBalance?.address) }
                      >
                        {' '}
                        {isCopied ? (
                          <CheckIcon color="primary" className="text-xl" height={14} />
                        ) : (
                          <CopyIcon color="#110C22" className="text-xl" height={14} />
                        )}
                      </IconButton>
                    </Stack> */}
                    </Stack>
                  </Stack>
                  <Stack>
                    <Stack
                      sx={{
                        borderRadius: '50%',
                        background: '#FFFFFF1F',
                      }}
                    >
                      <Token width={33} height={33} />
                    </Stack>
                  </Stack>
                </Stack>
              </WalletCard>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

const TransactionItemSkeleton = () => {
  return (
    <Box padding={2} border={'1px solid lightgrey'} borderRadius={'1rem'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="circular" width={30} height={30} />
      </Stack>
      <Stack direction={'row'} marginTop={1}>
        <Skeleton variant="text" width={100} height={40} />
        <Skeleton variant="text" width={100} height={20} />
      </Stack>
      <Skeleton variant="text" width={100} height={20} />
    </Box>
  );
};

const DigitalBalanceItemSkeleton = () => {
  return (
    <Stack
      padding={'2rem'}
      direction={'row'}
      justifyContent={'space-between'}
      className="bg-white"
    >
      <Stack gap={'1.5rem'}>
        <Skeleton variant="text" width={100} height={20} />
        <Stack gap={'1rem'}>
          <Stack>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={100} height={20} />
          </Stack>
          <Stack direction={'row'}>
            <Skeleton variant="text" width={100} height={40} />
          </Stack>
        </Stack>
      </Stack>
      <Skeleton variant="circular" width={40} height={40} />
    </Stack>
  );
};
