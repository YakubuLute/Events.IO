'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Error } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import TokenBuyModal from '@/components/candidate/wallet/modals/TokenBuyModal';
import CustomPopover from '@/components/shared/popover';
import CashTransactionsCard from '@/components/shared/wallet/cashTransactions';
import WidthDrawMFundsModal from '@/components/shared/wallet/modals/WidthDrawModal';
import WithdrawFundsAccountModal from '@/components/shared/wallet/modals/WithDrawAccountModal';
import WithdrawStatusModal from '@/components/shared/wallet/modals/WithdrawStatusModal';
import WalletStatusCard from '@/components/shared/wallet/WalletStatusCard';
import { BuyIcon } from '@/components/ui/icons';
import TokenTransactionsCard from './tokenTransactions';

// type Tab = 'Ledger' | 'Earned' | 'Spend';

const WalletComponentView = () => {
  const pathname = usePathname().replaceAll('/en', '').replaceAll('/fr', '');
  const sector = pathname.split('/')[1];

  const [showWithdrawAccountModal, setShowWithdrawAccountModal] =
    useState<boolean>(false);
  const [showWithdrawFundsModal, setShowWithdrawFundsModal] =
    useState<boolean>(false);
  const [showWithdrawStatusModal, setShowWithdrawStatusModal] =
    useState<boolean>(false);
  const [showBuyTokenModal, setShowBuyTokenModal] = useState<boolean>(false);
  const [withdrawStatus, setWithDrawStatus] = useState<'success' | 'failed'>(
    'success'
  );

  const widthdrawInAccountModal = () => {
    setShowWithdrawAccountModal(false);
    setShowWithdrawStatusModal(true);
  };

  const handleSaveAccount = () => {
    setShowWithdrawAccountModal(false);
    setShowWithdrawFundsModal(true);
  };

  const handleAddAccount = () => {
    setShowWithdrawFundsModal(false);
    setShowWithdrawAccountModal(true);
  };

  const handleWidthDraw = () => {
    setShowWithdrawFundsModal(false);
    setShowWithdrawStatusModal(true);
  };

  const handleWithDrawAgain = () => {
    setShowWithdrawStatusModal(false);
    setShowWithdrawAccountModal(true);
  };

  const handleBuyTokenClick = () => {
    setShowBuyTokenModal(true);
  };

  const handleWithdrawClick = (e: any) => {
    setShowWithdrawAccountModal(true);
  };
  const handleGoToWallet = (e: any) => {
    setShowWithdrawStatusModal(false);
  };
  const handleTryAgain = (e: any) => {
    setShowWithdrawStatusModal(false);
    setShowWithdrawFundsModal(true);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onViewExperienceLevel = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopper = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ px: { sm: '16px', lg: '24px' } }} mb={10}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={1} alignItems={'end'}>
          <Typography fontSize={22} fontWeight={600} color="#110C22">
            Wallet
          </Typography>
        </Stack>
        {sector !== 'university' && (
          <Stack direction={'row'} gap={1}>
            {/* <Stack
              sx={{
                alignItems: 'end', gap: 1, marginRight: 3,
                display: { sm: 'flex', xs: 'none', flexDirection: 'row' },
              }}
            >
              <Typography fontSize={22} fontWeight={600} color="#110C22">
                VSC
              </Typography> */}
            <Stack
              direction={'row'}
              alignItems={'center'}
              onMouseEnter={(e) => onViewExperienceLevel(e)}
            >
              <Error
                sx={{ height: 16, color: { md: '#2B46D9', xs: '#4F4B5C' } }}
              />
              {/* <Typography
                  fontSize={10}
                  sx={{ color: { md: '#2B46D9', xs: '#4F4B5C' } }}
                >
                  info
                </Typography>
              </Stack> */}
            </Stack>
            <Button
              variant={'contained'}
              startIcon={<BuyIcon />}
              sx={{ borderRadius: 2 }}
              onClick={handleBuyTokenClick}
            >
              Buy VSC Credit
            </Button>
          </Stack>
        )}
      </Stack>

      <WalletStatusCard onWithdrawClick={handleWithdrawClick} sector={sector} />

      <Grid container mb={5}>
        {sector === 'candidate' ? (
          <>
            <Grid item xs={12} lg={12} xxl={7}>
              <CashTransactionsCard sector={sector} />
            </Grid>
            <Grid item xs={12} lg={12} xxl={5} pl={2}>
              <TokenTransactionsCard />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} lg={12}>
            <CashTransactionsCard />
          </Grid>
        )}
      </Grid>

      <WithdrawFundsAccountModal
        open={showWithdrawAccountModal}
        onClose={() => setShowWithdrawAccountModal(false)}
        onSaveClick={handleSaveAccount}
        onWithdrawClick={widthdrawInAccountModal}
      />
      <TokenBuyModal
        onClose={() => setShowBuyTokenModal(false)}
        open={showBuyTokenModal}
      />
      <WidthDrawMFundsModal
        open={showWithdrawFundsModal}
        onClose={() => {
          setShowWithdrawFundsModal(false);
        }}
        onAddClick={handleAddAccount}
        onWithdrawClick={handleWidthDraw}
      />
      <WithdrawStatusModal
        status={withdrawStatus}
        onClose={() => setShowWithdrawStatusModal(false)}
        open={showWithdrawStatusModal}
        onGoToWallet={handleGoToWallet}
        onWithDrawAgain={handleWithDrawAgain}
        onTryAgain={handleTryAgain}
      />

      <CustomPopover
        anchorEl={anchorEl}
        handleClose={onClosePopper}
        open={Boolean(anchorEl)}
        transformOrigin={{ vertical: 50, horizontal: 'center' }}
      >
        <Typography sx={{ width: 200, fontSize: 10.5, font: 500, color: '#fff', textAlign: 'center' }}>
          VSC Credits are use to pay for some services on vaurse
        </Typography>
      </CustomPopover>
    </Box>
  );
};

export default WalletComponentView;
