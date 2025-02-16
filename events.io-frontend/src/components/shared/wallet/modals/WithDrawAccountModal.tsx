import { ArrowUpwardOutlined, Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material"
import { MouseEvent, MouseEventHandler } from "react";

export interface IWithdrawFundsAccountModalProps {
  open: boolean,
  onClose: MouseEventHandler<HTMLElement>,
  onSaveClick: (event: MouseEvent<HTMLElement>) => void ,
  onWithdrawClick: (event: MouseEvent<HTMLElement>) => void ,
}
const WithdrawFundsAccountModal = ({ open, onClose, onSaveClick, onWithdrawClick }: IWithdrawFundsAccountModalProps) => {

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);
  }

  return (
    <Dialog open={open} maxWidth={'lg'} component={Box} sx={{ '& .MuiDialog-paper.MuiPaper-rounded ': { borderRadius: 5 } }}>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" fontWeight={600}>
            Withdraw Funds
          </Typography>
          <IconButton
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 700, maxWidth: '100%' ,px: {xs: 1, sm: 10} }} >
        <Typography fontWeight={600} marginTop={3} mb={1}>
          How much do you want to withdraw?
        </Typography>
        <FormControl fullWidth >
          <OutlinedInput
            sx={{ height: 45, borderRadius: 3 }}
            placeholder="0.00"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <Typography fontWeight={600} mt={3} mb={2}>
          Bank Account Details
        </Typography>
        <Grid container p={2} border={1} borderColor={'divider'} borderRadius={3}>
          <Grid item sm={6} xs={12} p={1} >
            <Typography variant="body1" fontWeight={500}>Bank</Typography>
            <OutlinedInput sx={{ borderRadius: 3, height: 45 }} size="medium" fullWidth placeholder="eg.James" />
          </Grid>
          <Grid item sm={6} xs={12} p={1} >
            <Typography variant="body1" fontWeight={500}>Name on Account</Typography>
            <OutlinedInput sx={{ borderRadius: 3, height: 45 }} fullWidth size="medium" placeholder="eg.James Doe" />
          </Grid>
          <Grid item xs={12} p={1}>
            <Typography fontWeight={600}> Account Number</Typography>
            <OutlinedInput sx={{ borderRadius: 3, height: 45 }} fullWidth placeholder="212441245521452" />
          </Grid>
          <Grid item xs={12} p={1}>
            <Button variant="outlined" sx={{ backgroundColor: '#CED4F2', borderRadius:3 }} fullWidth onClick={onSaveClick}>
              Save Account
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 5, borderRadius: 3, mb:6 }} startIcon={<ArrowUpwardOutlined />} fullWidth onClick={onWithdrawClick}>
          Withdraw funds
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawFundsAccountModal;