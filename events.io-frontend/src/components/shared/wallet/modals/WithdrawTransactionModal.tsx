import { MouseEventHandler } from 'react';
import { Close } from '@mui/icons-material';
import {
  Box,
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
import { TCashTransactionData } from '../CashTransactionsTable';

interface IWithdrawTransactionModal {
  onClose: MouseEventHandler<HTMLElement>;
  open: boolean;
  transactionSelect: TCashTransactionData;
}

const WithdrawTransactionModal = ({
  onClose,
  open,
  transactionSelect,
}: IWithdrawTransactionModal) => {
  const { data: transactionData, isPending: isLoading } =
    useGetDigitalTransactionById(transactionSelect?._id);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);
  };

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
          <WithdrawTransactionModalLoader />
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
                  <Typography color={'#8D8A95'} fontWeight={500}>
                    {' '}
                    Withdrawal to
                  </Typography>
                  <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                    {' '}
                    Bank : {transactionData?.reference}
                  </Typography>

                  <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                    {' '}
                    Total Amount
                  </Typography>
                  <Typography fontWeight={600} marginTop={1} variant={'body1'}>
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
                    {' '}
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
                    <Grid item xs={6} md={8}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Transaction ID
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {transactionData?._id}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
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
                    <Grid item xs={6} md={8}>
                      <Typography color={'#8D8A95'} fontWeight={500}>
                        {' '}
                        Transaction Time
                      </Typography>
                      <Typography
                        fontWeight={600}
                        marginTop={1}
                        variant={'body1'}
                      >
                        {dayjs(transactionData?.timestamp).format('HH:mm:ss')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
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
                        {transactionData?.paymentMethod}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
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

const WithdrawTransactionModalLoader = () => {
  return (
    <Box sx={{ padding: { sm: 5, xs: 1 } }}>
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Box border={1} padding={2} borderColor={'divider'} borderRadius={3}>
            <Typography color={'#8D8A95'} fontWeight={500}>
              {' '}
              Withdrawal to
            </Typography>
            <Skeleton variant="text" width={150} height={20} />

            <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
              {' '}
              Total Amount
            </Typography>
            <Skeleton variant="text" width={150} height={20} />

            <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
              {' '}
              Platform Fees
            </Typography>
            <Skeleton variant="text" width={150} height={20} />

            <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
              {' '}
              Net Amount
            </Typography>
            <Skeleton variant="text" width={150} height={20} />
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box sx={{ px: { sm: 4, xs: 0 } }} py={2}>
            <Grid container rowSpacing={3}>
              <Grid item xs={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction ID
                </Typography>
                <Skeleton variant="text" width={150} height={20} />
              </Grid>
              <Grid item xs={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction Date
                </Typography>
                <Skeleton variant="text" width={150} height={20} />
              </Grid>
              <Grid item xs={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Transaction Time
                </Typography>
                <Skeleton variant="text" width={150} height={20} />
              </Grid>
              <Grid item xs={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Payment Method
                </Typography>
                <Skeleton variant="text" width={150} height={20} />
              </Grid>

              <Grid item xs={6}>
                <Typography color={'#8D8A95'} fontWeight={500}>
                  {' '}
                  Status
                </Typography>
                <Skeleton variant="rectangular" width={100} height={20} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WithdrawTransactionModal;
