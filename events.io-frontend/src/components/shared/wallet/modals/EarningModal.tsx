import { MouseEventHandler } from 'react';
import { ArrowOutwardOutlined, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import Chip2 from '@/components/shared/Chip2';
import { useGetDigitalTransactionById } from '@/hooks/shared/wallet-hook';
import { TWalletTransaction } from '@/@types/shared/wallet';

interface IEarningTransactionModal {
  onClose: MouseEventHandler<HTMLElement>;
  onViewDetailClick: (
    event: React.MouseEvent<HTMLElement>,
    data: TWalletTransaction
  ) => void;
  transactionSelect: TWalletTransaction;
  open: boolean;
}

const EarningTransactionModal = ({
  onClose,
  onViewDetailClick,
  open,
  transactionSelect,
}: IEarningTransactionModal) => {
  const { data: transactionData, isPending: isLoading } = useGetDigitalTransactionById(
    transactionSelect?._id
  );

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);
  };

  const handleHistoryCLick = (event: React.MouseEvent<HTMLElement>) => {
    onViewDetailClick && onViewDetailClick(event, transactionSelect);
  };
  const progress = 70;

  return (
    <Dialog
      open={open}
      maxWidth={'lg'}
      component={Box}
      sx={{ '& .MuiDialog-paper.MuiPaper-rounded ': { borderRadius: 5 } }}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h6" fontWeight={600}>
            Transaction Details
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 850, maxWidth: '100%' }}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Box sx={{ padding: { sm: 5, xs: 1 } }}>
            <Grid container>
              <Grid item sm={4} xs={12}>
                <Box
                  border={1}
                  padding={2}
                  borderColor={'divider'}
                  borderRadius={3}
                >
                  {/* <Typography color={'#8D8A95'} fontWeight={500}>
                    {' '}
                    Earning From
                  </Typography>
                  <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                    {' '}
                    Child Education Project
                  </Typography>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="body2" fontWeight={600}>
                      {' '}
                      $1,224 Raised
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color={'grey'}>
                      {' '}
                      24.6 %
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={70}
                    sx={{ color: '#ECECED' }}
                  /> */}

                  <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                    {' '}
                    Total Amount
                  </Typography>
                  <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                    {' '}
                    {transactionData?.currency} {transactionData?.amount}
                  </Typography>

                  <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                    {' '}
                    Platform Fees
                  </Typography>
                  <Typography
                    fontWeight={600}
                    marginTop={1}
                    variant={'body1'}
                    color={'#F03D3D'}
                  >
                    {transactionData?.currency} {transactionData?.fee}
                  </Typography>

                  <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                    {' '}
                    Net Amount
                  </Typography>
                  <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                    {' '}
                    {transactionData?.currency} {transactionData?.netAmount}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={8} xs={12}>
                <Box sx={{ px: { sm: 4, xs: 0 } }} py={2}>
                  <Grid container rowSpacing={3}>
                    {/* <Grid item item xs={12} md={6}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Donor Name
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {' '}
                        Henry Sam
                      </Typography>
                    </Grid> */}
                    <Grid item xs={12} md={8}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Transaction Id
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {transactionData?._id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Transaction Date
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {dayjs(transactionData?.timestamp).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Transaction Time
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {dayjs(transactionData?.timestamp).format('hh:mm:ss A')} {/*('HH:mm:ss Z')} */}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Payment Method
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                        textTransform={'capitalize'}
                      >
                        {transactionData?.paymentMethod || 'N/A'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Status
                      </Typography>
                      <Chip2
                        color="success"
                        classes={{ label: 'capitalize' }}
                        label={transactionData?.status}
                      />
                    </Grid>

                    {/* <Grid item sm={6} xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<ArrowOutwardOutlined />}
                        sx={{ borderRadius: 3 }}
                        onClick={handleHistoryCLick}
                      >
                        {' '}
                        View Donation History
                      </Button>
                    </Grid> */}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const SkeletonLoader = () => {
  return (
    <Box sx={{ padding: { sm: 5, xs: 1 } }}>
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Box border={1} padding={2} borderColor={'divider'} borderRadius={3}>
            {/* <Typography color={'#8D8A95'} fontWeight={500}>
              Earning From
            </Typography>
            <Typography fontWeight={600} marginTop={1} variant={'body1'}>
              {' '}
              Child Education Project
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'} gap={1}>
              <Skeleton variant="text" width={160} height={20} />
              <Skeleton variant="text" width={160} height={20} />
            </Stack> */}

            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={160} height={20} />

            <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
              {' '}
              Platform Fees
            </Typography>
            <Typography
              fontWeight={600}
              marginTop={1}
              variant={'body1'}
              color={'#F03D3D'}
            >
              <Skeleton variant="text" width={160} height={20} />
            </Typography>

            <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
              {' '}
              Net Amount
            </Typography>
            <Typography fontWeight={600} marginTop={1} variant={'body1'}>
              <Skeleton variant="text" width={160} height={20} />
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box sx={{ px: { sm: 4, xs: 0 } }} py={2}>
            <Grid container rowSpacing={3}>
              {/* <Grid item item xs={12} md={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Donor Name
                </Typography>
                <Skeleton variant="text" width={160} height={20} />
              </Grid> */}
              <Grid item xs={12} md={8}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction Id
                </Typography>
                <Skeleton variant="text" width={160} height={20} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction Date
                </Typography>
                <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                  <Skeleton variant="text" width={160} height={20} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction Time
                </Typography>
                <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                  <Skeleton variant="text" width={160} height={20} />
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Payment Method
                </Typography>
                <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                  <Skeleton variant="text" width={160} height={20} />
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Status
                </Typography>
                <Skeleton variant="rectangular" width={100} height={20} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Skeleton variant="rectangular" width={100} height={40} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarningTransactionModal;
