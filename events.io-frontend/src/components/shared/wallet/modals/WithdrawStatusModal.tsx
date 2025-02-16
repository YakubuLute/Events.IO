import { ErrorAlertIcon } from "@/components/ui/icons";
import SuccessAlertIcon from "@/components/ui/icons/successAlertIcon";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Stack, Button } from "@mui/material";
import { MouseEvent, MouseEventHandler } from "react";

type TWithdrawStatus = 'success' | 'failed'

interface IWithdrawStatusModalProps {
  onClose: MouseEventHandler<HTMLElement>,
  open: boolean,
  onWithDrawAgain: (e: MouseEvent<HTMLElement>) => void,
  onGoToWallet: (e: MouseEvent<HTMLElement>) => void,
  onTryAgain: (e: MouseEvent<HTMLElement>) => void,
  status: TWithdrawStatus,
}


const WithdrawStatusModal = ({ onClose, open, onWithDrawAgain, onTryAgain, onGoToWallet, status }: IWithdrawStatusModalProps) => {

  const handleTryAgain = (e: any) => {
    onTryAgain && onTryAgain(e);
  }

  const handleWithdrawAgain = (e: any) => {
    onWithDrawAgain && onWithDrawAgain(e);
  }

  const handleCancel = (e: any) => {
    onClose(e);
  }

  const handleGoToWallet = (e: any) => {
    onGoToWallet && onGoToWallet(e);
  }

  return (
    <Dialog open={open} maxWidth={'lg'} component={Box} sx={{ '& .MuiDialog-paper.MuiPaper-rounded ': { borderRadius: 5 } }}>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" fontWeight={600}>
            Withdraw Funds
          </Typography>
          <IconButton
            onClick={handleCancel}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 650, maxWidth: '100%', padding: 5, paddingTop: 1 }} >
        <Box>
          {status === 'success' && (
            <Box display={'flex'} justifyContent={'center'} padding={4}>

              <Stack maxWidth={{ md: 310, xs: '100%' }} alignItems={'center'}>
                <SuccessAlertIcon />
                <Typography variant="h5" fontWeight={700} marginTop={1}>
                  All Good!
                </Typography>
                <Typography color={'#4F4B5C'} align="center">
                  Congratulations! Your withdrawal was successful.
                </Typography>

                <Button variant="contained" fullWidth sx={{ marginTop: 3, borderRadius: 3 }} onClick={handleWithdrawAgain}>
                  Withdraw Again
                </Button>
                <Button variant={'outlined'} fullWidth sx={{ marginTop: 1, borderRadius: 3, marginBottom: 3 }} onClick={handleCancel}>
                  Go to Wallet
                </Button>
              </Stack>
            </Box>
          )}
          {status === 'failed' && (
            <Box display={'flex'} justifyContent={'center'} padding={4}>
              <Stack maxWidth={{ md: 310, xs: '100%' }} alignItems={'center'}>
                <ErrorAlertIcon />
                <Typography variant="h5" fontWeight={700} marginTop={1}>
                  Something went wrong
                </Typography>
                <Typography color={'#4F4B5C'} align="center">
                  The operation was unsuccessful. Please verify that all details are accurate
                </Typography>

                <Button variant="contained" fullWidth sx={{ marginTop: 3, borderRadius: 3 }} onClick={handleTryAgain}>
                  Try again
                </Button>
                <Button variant={'outlined'} fullWidth sx={{ marginTop: 1, borderRadius: 3, marginBottom: 3 }} onClick={handleCancel}>
                  Cancel Withdrawl
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>

  )
}

export default WithdrawStatusModal;