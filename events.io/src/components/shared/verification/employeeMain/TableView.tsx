'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';

import { useVerificationContext } from '@/contexts/verification';
import { Employee } from '.';
import ButtonSpacing from '../../Button/ButtonSpacing';
import HStack from '../../stacks/HStack';
import MiniMenu from '../icons/miniMenu';
import styles from '../verification.module.scss';
import { tableStyles } from './styles';

function TableView({
  search,
  data = [],
}: {
  search: string;
  data: Employee[];
}) {
  const {
    setVerifyDetailsOpen,
    setVerifyDetailsEmployeeInfo,
    setDeclineDetailsOpen,
    setMobileOptionsOpen,
  } = useVerificationContext();

  return (
    <Table sx={tableStyles.table}>
      <TableHead sx={tableStyles.tableHead}>
        <TableRow>
          <TableCell
            className={styles.listTableTitle}
            sx={tableStyles.firstName.head}
          >
            First name
          </TableCell>
          <TableCell
            className={styles.listTableTitle}
            sx={tableStyles.firstName.head}
          >
            Last name
          </TableCell>
          <TableCell
            className={[styles.noWrap, styles.listTableTitle].join(' ')}
            sx={tableStyles.employeeId.head}
          >
            Employee ID
          </TableCell>
          <TableCell
            className={styles.listTableTitle}
            sx={tableStyles.duration.head}
          >
            Duration
          </TableCell>
          <TableCell
            className={styles.listTableTitle}
            sx={tableStyles.position}
          >
            Positions
          </TableCell>
          <TableCell
            className={styles.listTableTitle}
            sx={tableStyles.status.head}
          >
            Status
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data
          ?.filter((item) =>
            search == ''
              ? item
              : item?.fullName?.toLowerCase()?.startsWith(search)
          )
          ?.map((employee: Employee, index: number) => {
            return (
              <TableRow
                sx={{
                  backgroundColor: index % 2 == 1 ? ' #F3F3F4' : 'transparent',
                }}
                key={index}
              >
                <TableCell
                  className={styles.listTableLabel}
                  sx={tableStyles.firstName.body}
                >
                  {employee.fullName?.split(' ')?.[0]}
                </TableCell>
                <TableCell
                  className={styles.listTableLabel}
                  sx={tableStyles.firstName.body}
                >
                  {employee.fullName?.split(' ')?.[1]}
                </TableCell>
                <TableCell
                  className={styles.listTableLabel}
                  sx={tableStyles.employeeId.body}
                >
                  {employee.employeeId}
                </TableCell>
                <TableCell
                  className={styles.listTableLabel}
                  sx={tableStyles.duration.body}
                >
                  {dayjs(employee.startDate).format('MMM DD, YYYY') +
                    ' - ' +
                    dayjs(employee.endDate).format('MMM DD, YYYY')}
                </TableCell>
                <TableCell className={styles.listTableLabel}>
                  {employee.jobTitle}
                </TableCell>
                <TableCell sx={tableStyles.status.body}>
                  <HStack sx={{ gap: '20px' }}>
                    <ButtonSpacing
                      className={styles.listTableVerifyButton}
                      sx={
                        employee?.status === 'PENDING'
                          ? { color: 'white', backgroundColor: '#2B46D9' }
                          : {
                              color: '#0C27BE',
                              backgroundColor: '#F2F4FF',
                              border: '1px solid #CED4F2',
                            }
                      }
                      disabled={Boolean(employee?.status !== 'PENDING')}
                      onClick={(e) => {
                        if (employee?.status === 'PENDING') {
                          e.preventDefault();
                          setVerifyDetailsEmployeeInfo(employee);
                          setVerifyDetailsOpen(true);
                        }
                      }}
                    >
                      {employee?.status.toLocaleLowerCase()}
                    </ButtonSpacing>

                    <ButtonSpacing
                      className={styles.listTableDeleteButton}
                      onClick={(e) => {
                        e.preventDefault();
                        setVerifyDetailsEmployeeInfo(employee);
                        setDeclineDetailsOpen(true);
                      }}
                    >
                      Decline
                    </ButtonSpacing>
                  </HStack>
                </TableCell>
                <TableCell sx={tableStyles.decline.body}>
                  <ButtonSpacing
                    onClick={(e) => {
                      e.preventDefault();
                      setVerifyDetailsEmployeeInfo(employee);
                      setMobileOptionsOpen(true);
                    }}
                  >
                    <MiniMenu />
                  </ButtonSpacing>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default TableView;
