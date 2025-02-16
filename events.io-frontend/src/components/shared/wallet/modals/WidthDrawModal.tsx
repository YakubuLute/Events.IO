import { BankIcon } from "@/components/ui/icons";
import { ArrowUpwardOutlined, Close, FiberManualRecordOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material"
import { MouseEvent, MouseEventHandler } from "react";

export interface WithDrawMFundsModalProps {
  open: boolean,
  onClose: MouseEventHandler<HTMLElement>,
  onAddClick: (event: MouseEvent<HTMLElement>) => void,
  onWithdrawClick: (event: MouseEvent<HTMLElement>) => void,
}
const WithDrawMFundsModal = ({ open, onClose, onAddClick, onWithdrawClick }: WithDrawMFundsModalProps) => {

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);
  }
  const banks = [
    {
      name: 'barclayBank',
      useName: 'Jame Doe',
      number: '123456487545'
    },
    {
      name: 'barclayBank',
      useName: 'Jame Doe',
      number: '123456487545'
    },
  ]
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
      <DialogContent dividers sx={{ width: 700, maxWidth: '100%', px: { xs: 1, sm: 10 } }} >
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
          Select Saved Bank
        </Typography>
        <Box p={2} border={1} borderColor={'divider'} borderRadius={3}>
          {banks.map((data, index) => (
            <Stack direction={'row'} border={2} borderColor={'divider'} mt={1} borderRadius={3} justifyContent={'space-between'} p={1}>
              <Box display={'flex'} alignItems={'center'}>
                <Box borderRight={1} borderColor={'divider'} pr={1} mr={1}>
                  <Box
                    sx={{ width: 32, height: 32, }}
                    borderRadius={'50%'}
                    border={1}
                    borderColor={'divider'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <BankIcon color={'#0C27BE'} width={16} height={16} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={500}> {data.name}</Typography>
                  <Typography variant="body2"> {`${data.useName} | ${data.number}`}</Typography>
                </Box>
              </Box>
              <FiberManualRecordOutlined sx={{ color: '#0C27BE' }} fontSize="small" />
            </Stack>
          ))}

          <Button variant="outlined" sx={{ backgroundColor: '#CED4F2', borderRadius: 3, m: 1 }} fullWidth onClick={onAddClick}>
            Add New Account
          </Button>
        </Box>

        <Button variant="contained" sx={{ mt: 5, borderRadius: 3, mb: 6 }} startIcon={<ArrowUpwardOutlined />} fullWidth onClick={onWithdrawClick}>
          Withdraw funds
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default WithDrawMFundsModal;