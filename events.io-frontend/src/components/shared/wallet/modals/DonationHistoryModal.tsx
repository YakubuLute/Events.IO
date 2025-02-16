import { AccessTimeOutlined, Close, Search } from "@mui/icons-material";
import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Stack, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Grid, LinearProgress, Button, OutlinedInput } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Image from "next/image";
import { MouseEvent, MouseEventHandler } from "react";
import Chip2 from "@/components/shared/Chip2";
import { CalendarIcon } from "@/components/ui/icons";

interface IDonationHistoryModal {
  onClose: MouseEventHandler<HTMLElement>,
  open: boolean,
  onRowClick?: (e: MouseEvent<HTMLElement>, rowData: TDonationTxData) => void,
}

const tableData: TDonationTxData[] = [
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Failed",
    fee: "$ 5.00",
  },
  {
    donor: "Henry Sam",
    payment: "Paypal",
    transactionId: "TRX0211124",
    date: "12/07/2023",
    gross: "$ 200.00",
    netAmount: "$ 200.00",
    status: "Completed",
    fee: "$ 5.00",
  },
];

export type TDonationTxData = {
  donor: string,
  payment: string,
  gross: string,
  fee: string,
  netAmount: string,
  transactionId: string,
  date: string,
  status: "Completed" | "Pending" | "Failed",
}

const DonationHistoryModal = ({ onClose, onRowClick, open }: IDonationHistoryModal) => {

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);
  }

  const handleRowClick = (rowData: TDonationTxData) => (e: any) => {
    onRowClick && onRowClick(e, rowData)
  }

  return (
    <Dialog open={open} component={Box} sx={{ '& .MuiDialog-paper.MuiPaper-rounded ': { borderRadius: 5, maxWidth: '100%', width: 1200 } }}>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" fontWeight={600}>
            Project Donation History
          </Typography>
          <IconButton
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: '100%', padding: { sm: 4, xs: 1 } }} >
        <Box padding={2}>
          <Box sx={{ display: { xs: 'block', sm: "flex" } }} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} maxWidth={'100%'}>
              <Image src={require('@/public/assets/images/project.png')} alt="project image" width={120} height={96} />
              <Box flex={1} pl={2} maxWidth={'calc(100% - 120px)'}>
                <Typography variant="h5" fontWeight={600}> Child Education Project</Typography>
                <Typography color={'gray'} fontSize={12} width={305} maxWidth={'100%'}> Project to enable less privileged children get quality education .</Typography>
              </Box>
            </Stack>
            <Box minWidth={179} py={1}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={500} variant="body2"> $1,224 Raised</Typography>
                <Typography color={'gray'} variant="body2"> 24.6 %</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={75} sx={{ color: '#0C27BE' }} />
              <Stack direction={'row'}>
                <AccessTimeOutlined sx={{ color: 'grey', fontSize: 12 }} />
                <Typography fontSize={11} color={'grey'}>
                  18 Days Left
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Stack mt={3} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6" fontWeight={600}>Donations </Typography>
              <Typography color={'grey'} fontSize={12}> Data of All Donations</Typography>
            </Box>

            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'} gap={1}>
              <OutlinedInput
                startAdornment={<Search />}
                placeholder={'Search'}
                fullWidth
                sx={{ borderColor: 'divider', height: 32, borderRadius: 2, width: { xs: '100%', sm: 200, mx: 1 } }}
              />
              <Button variant="outlined" endIcon={<CalendarIcon color="#0C27BE" />} size={'small'} sx={{ borderRadius: 2, width: { xs: '100%', sm: 120, mx: 1 } }}>
                Sort by Date
              </Button>
            </Stack>
          </Stack>
        </Box>
        <TableContainer component={Box} padding={2} maxHeight={400}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell>Donor</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Gross Amount</TableCell>
                <TableCell>
                  <Tooltip
                    title={`This fee covers all transaction fees from third-party systems we're associated with. No hidden costs`}
                    placement="top"
                    arrow
                    componentsProps={{ tooltip: { sx: { width: 200, color: 'white', backgroundColor: '#2E293D' } } }}
                  >
                    <Typography>
                      Fees
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>Net Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((rowData: TDonationTxData, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  onClick={handleRowClick(rowData)}
                >
                  <TableCell>{rowData.donor}</TableCell>
                  <TableCell>{rowData.transactionId}</TableCell>
                  <TableCell>{rowData.payment}</TableCell>
                  <TableCell>{rowData.date}</TableCell>
                  <TableCell>{rowData.gross}</TableCell>
                  <TableCell>{rowData.fee}</TableCell>
                  <TableCell>{rowData.netAmount}</TableCell>
                  <TableCell><Chip2 sx={{ height: 20 }} label={rowData.status} color={rowData.status === 'Completed' ? 'success' : rowData.status === 'Failed' ? 'error' : 'warning'} /></TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent >
    </Dialog >
  )
}

export default DonationHistoryModal;