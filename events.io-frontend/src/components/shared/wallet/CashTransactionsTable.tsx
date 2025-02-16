import { RefObject } from 'react';
import { VisibilityOutlined } from '@mui/icons-material';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Container, Stack } from '@mui/system';
import dayjs from 'dayjs';

import Chip2 from '@/components/shared/Chip2';
import { NoMatchIcon } from '@/components/ui/icons';
import { TWalletTransaction } from '@/@types/shared/wallet';

export interface ICashTransactionTable {
  onRowClick: (rowData: TWalletTransaction) => void;
  transactionDataPage: TWalletTransaction[] | undefined;
  isLoading: boolean;
  bottomRef: RefObject<HTMLDivElement>;
  isFetchingNextPage: boolean;
}

export default function CashTransactionTable({
  onRowClick,
  transactionDataPage,
  isLoading,
  bottomRef,
  isFetchingNextPage,
}: ICashTransactionTable) {
  const handleRowClick = (rowData: TWalletTransaction) => {
    onRowClick(rowData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{
          height: 400,
          '&.MuiPaper-root': {
            border: '1px solid #020826',
            borderRadius: 0,
          },
          '&::-webkit-scrollbar': {
            width: 4,
            height: '1px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#ececec',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#a8abae',
            borderRadius: '50px',
          },
        }}
      >
        <Table sx={{ minWidth: 570 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ textTransform: "capitalize" }}>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-full pb-5">
            {isLoading ? (
              <TransactionItemLoader />
            ) : (
              transactionDataPage?.map((page, index) =>
                page?.length > 0 ? (
                  page?.map((rowData, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, textTransform: "capitalize" }}
                      hover
                      onClick={() => handleRowClick(rowData)}
                    >
                      <TableCell>{rowData.reference}</TableCell>
                      <TableCell>
                        <span className="capitalize">{rowData.category}</span>
                      </TableCell>
                      <TableCell>
                        {dayjs(rowData.timestamp).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{rowData.amount}</TableCell>
                      <TableCell>
                        <Chip2
                          sx={{ height: 20 }}
                          classes={{ label: 'capitalize' }}
                          label={rowData.status}
                          color={
                            rowData.status === 'completed'
                              ? 'success'
                              : rowData.status === 'failed'
                                ? 'error'
                                : 'warning'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <VisibilityOutlined sx={{ height: 20 }} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={index}>
                    <TableCell colSpan={6}>
                      <Container>
                        <Stack alignItems={'center'} py={4} px={1} maxWidth={480} mx="auto">
                          <NoMatchIcon width={100} height={100} />
                          <Typography
                            variant="h6"
                            fontSize={16}
                            fontWeight={600}
                            marginTop={3}
                          >
                            No Data Available yet
                          </Typography>
                          <Typography fontSize={14} marginTop={1} color={'#4F4B5C'} align="center">
                            Find all your cash transaction details conveniently
                            displayed here. Stay informed and track your
                            finances hassle-free!
                          </Typography>
                        </Stack>
                      </Container>
                    </TableCell>
                  </TableRow>
                )
              )
            )}

            {isFetchingNextPage ? (
              <TransactionItemLoader rowNumber={2} />
            ) : null}
            <div ref={bottomRef} className="h-[1px] mt-auto mb-3" />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const TransactionItemLoader = ({ rowNumber = 5 }: { rowNumber?: number }) => {
  return (
    <>
      {Array.from({ length: rowNumber }).map((_, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          hover
        >
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[100px]" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[100px]" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[100px]" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[100px]" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[60px]" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton variant="text" className="h-[40px] w-[60px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
