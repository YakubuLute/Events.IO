import { RefObject } from 'react';
import dayjs from 'dayjs';
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
import Chip2 from '@/components/shared/Chip2';

import { NoMatchIcon } from '@/components/ui/icons';
// import { TVosTokenTransaction } from '@/@types/shared/vosToken';
import { TWalletTransaction } from '@/@types/shared/wallet';

export type TTokenTransactionData = {
  category: string;
  summary: string;
  amount: string;
  date: string;
};

interface Props {
  // data: TVosTokenTransaction[] | undefined;
  data: TWalletTransaction[] | undefined;
  isLoading: boolean;
  bottomRef: RefObject<HTMLDivElement>;
  isFetchingNextPage: boolean;
}

const TokenTransactionsTable = ({
  data,
  isLoading,
  bottomRef,
  isFetchingNextPage,
}: Props) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{
          // height: '100%',
          height: 410,
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
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ textTransform: "capitalize" }}>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <VosTokenItemLoader />
            ) : data?.length ? (
              data?.map((rowData, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, textTransform: "capitalize" }}
                >
                  <TableCell>{rowData.category}</TableCell>
                  <TableCell>{rowData.amount}</TableCell>
                  <TableCell>
                    {dayjs(rowData.timestamp).format('DD/MM/YYYY')}
                  </TableCell>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Container>
                    <Stack alignItems={'center'} py={4} px={1} maxWidth={480} mx="auto">
                      <NoMatchIcon width={100} height={100} />
                      <Typography variant="h6" fontSize={16} fontWeight={600} marginTop={3}>
                        No Data Available yet
                      </Typography>
                      <Typography fontSize={14} marginTop={1} color={'#4F4B5C'} align="center">
                        Access all your token transactions conveniently displayed
                        here. Keep a close eye on your tokens and enjoy seamless
                        tracking!
                      </Typography>
                    </Stack>
                  </Container>
                </TableCell>
              </TableRow>
            )}
            {isFetchingNextPage && <VosTokenItemLoader rowNumber={2} />}
            <div ref={bottomRef} />
          </TableBody>
        </Table>
      </TableContainer >
    </Paper >
  );
};

const VosTokenItemLoader = ({ rowNumber = 5 }: { rowNumber?: number }) => {
  return (
    <>
      {Array.from({ length: rowNumber }).map((_, index) => (
        <TableRow key={index}>
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
        </TableRow>
      ))}
    </>
  );
};

export default TokenTransactionsTable;
