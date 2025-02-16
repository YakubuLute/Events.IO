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
  Stack,
  Typography,
} from '@mui/material';

import Chip2 from '@/components/shared/Chip2';
import { TCashTransactionData } from '../CashTransactionsTable';

interface IDonationDetailsModal {
  onClose: MouseEventHandler<HTMLElement>;
  open: boolean;
}

const DonationDetailsModal = ({ onClose, open }: IDonationDetailsModal) => {
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
                />

                <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                  {' '}
                  Total Amount
                </Typography>
                <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                  {' '}
                  USD 2000.00
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
                  USD 50.00
                </Typography>

                <Typography color={'#8D8A95'} fontWeight={500} mt={2}>
                  {' '}
                  Net Amount
                </Typography>
                <Typography fontWeight={600} marginTop={1} variant={'body1'}>
                  {' '}
                  USD 450.00
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={8} xs={12}>
              <Box sx={{ px: { sm: 4, xs: 0 } }} py={2}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Candidate Name
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      {' '}
                      Henry Sam
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Candidate Id
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      542147
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Transaction Id
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      TRX0211124
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Transaction Date
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      12/04/2023
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Transaction Time
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      12:23:34 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Payment Method
                    </Typography>
                    <Typography
                      fontWeight={600}
                      marginTop={1}
                      variant={'body1'}
                    >
                      Paypal
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color={'#8D8A95'} fontWeight={500}>
                      {' '}
                      Status
                    </Typography>
                    <Chip2 color="success" label="completed" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDetailsModal;
