import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import CustomPopover from '@/components/shared/popover';
import {
  BlockchainWriteStatus,
  VerificationDashboardStudent,
  VerificationStatus,
} from '@/hooks/university/dtos';
import { useVerificationContext } from '@/contexts/verification';
import { useAlumniProfileStore } from '@/store/university';
import ButtonSpacing from '../Button/ButtonSpacing';
import HStack from '../stacks/HStack';
// import VerifiedIcon from '@mui/icons-material/Verified';
import MiniMenu from './icons/miniMenu';
import styles from './verification.module.scss';
import { ShieldMoonOutlined, VerifiedOutlined } from '@mui/icons-material';
import { CustomButton } from '../Button/Button';

type VerfyRequestProps = {
  student: VerificationDashboardStudent;
};

const VerifyRequestStudent = ({ student }: VerfyRequestProps) => {
  const { handleSelectAlumni } = useAlumniProfileStore();
  const {
    setVerifyDetailsOpen,
    setVerifyDetailsUserInfo,
    setDeclineDetailsOpen,
    setMobileOptionsOpen,
  } = useVerificationContext();
  const [anchorVerifyEl, setAnchorVerifyEl] = useState<HTMLElement | null>(
    null
  );

  const notStarted =
    student?.blockchainWriteStatus === BlockchainWriteStatus.NOT_STARTED;
  const inProgress =
    student?.blockchainWriteStatus === BlockchainWriteStatus.IN_PROGRESS;
  const completed =
    student?.blockchainWriteStatus === BlockchainWriteStatus.COMPLETED;
  const failed =
    student?.blockchainWriteStatus === BlockchainWriteStatus.FAILED;

  const studentStatus = (status: string) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'Verified';
      case VerificationStatus.PENDING:
        return 'Verify';
      case VerificationStatus.DECLINED:
        return 'Update';
      default:
        return 'Verify';
    }
  };

  return (
    <>
      <TableRow
      >
        <TableCell
          className={styles.listTableLabel}
          sx={{
            display: {
              xs: 'none',
              md: 'table-cell',
              lg: 'none',
              xl: 'table-cell',
            },
          }}
        >
          {dayjs(student.dateCreated).format('MMM DD, YYYY')}
        </TableCell>
        <TableCell
          className={styles.listTableLabel}
          sx={{
            color: {
              xs: 'blue !important',
              md: '#110c22 !important',
            },
            cursor: 'pointer',
          }}
          onClick={() => handleSelectAlumni(student?.candidateId)} // OR ._id
        >
          {student.fullName}
        </TableCell>
        <TableCell
          className={styles.listTableLabel}
          sx={{
            display: {
              xs: 'none',
              md: 'table-cell',
            },
          }}
        >
          {student?.studentId}
        </TableCell>
        <TableCell className={styles.listTableLabel}>
          {dayjs(student?.startDate).format('MMM DD, YYYY')} -{' '}
          {dayjs(student?.endDate).format('MMM DD, YYYY')}
        </TableCell>
        <TableCell className={styles.listTableLabel}>
          {student?.credential}
        </TableCell>
        <TableCell className={styles.listTableLabel}>
          {student?.discipline}
        </TableCell>
        <TableCell className={styles.listTableLabelGPA}>
          {student?.cgpa}
        </TableCell>
        <TableCell
          sx={{
            display: {
              xs: 'none',
              sm: 'table-cell',
            },
          }}
        >
          <HStack sx={{ gap: '20px' }}>
            {student?.status === VerificationStatus.VERIFIED ? (
              <ButtonSpacing
                role="label"
                className={styles.listTableDeleteButton}
                sx={{ backgroundColor: "transparent", color: '#110C22', fontWeight: '600', display: "flex", alignItems: "center" }}
              >
                <VerifiedOutlined fontSize='small' color='primary' />
                &nbsp;
                VERIFIED
              </ButtonSpacing>
            ) : (
              <>
                <ButtonSpacing
                  className={styles.listTableDeleteButton}
                  sx={
                    student?.status !== VerificationStatus.PENDING
                      ? { color: '#cf2a2acf', fontWeight: '400' }
                      : { color: '#cf2a2a', fontWeight: '600' }
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setVerifyDetailsUserInfo(student);
                    setDeclineDetailsOpen(true);
                  }}
                  disabled={student?.status !== VerificationStatus.PENDING}
                >
                  {student?.status === VerificationStatus.DECLINED
                    ? 'Declined'
                    : 'Decline'}
                </ButtonSpacing>

                <CustomButton
                  label={studentStatus(student?.status)}
                  size="small"
                  startIcon={(
                    <ShieldMoonOutlined />
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (student?.status === VerificationStatus.VERIFIED) return;
                    setVerifyDetailsUserInfo(student);
                    setVerifyDetailsOpen(true);
                  }}
                  onMouseEnter={(e) => {
                    if (student?.status === VerificationStatus.DECLINED) return;
                    if (student?.status === VerificationStatus.PENDING) return;
                    setAnchorVerifyEl(e.currentTarget);
                  }}
                />

              </>
            )}
          </HStack>
        </TableCell>
        <TableCell
          sx={{
            display: {
              xs: 'table-cell',
              sm: 'none',
            },
          }}
        >
          <ButtonSpacing
            onClick={(e) => {
              e.preventDefault();
              setVerifyDetailsUserInfo(student);
              setMobileOptionsOpen(true);
            }}
          >
            <MiniMenu />
          </ButtonSpacing>
        </TableCell>
      </TableRow>

      <CustomPopover
        anchorEl={anchorVerifyEl}
        handleClose={() => setAnchorVerifyEl(null)}
        open={Boolean(anchorVerifyEl)}
      >
        <Typography className={styles.viewBlockchain}>
          {student?.status === VerificationStatus.PENDING &&
            'Upon verification, this will be recorded on blockchain'}
          {student?.status === VerificationStatus.VERIFIED && (
            <>
              {notStarted && 'This verification will be recorded on blockchain'}
              {inProgress &&
                'Recording on blockchain. This could take few moments'}
              {failed &&
                "Failed to record on blockchain. We'd retry again in few moments"}
              {/* {completed && (
                <>
                  <Link target="_blank" href={student?.verificationBlockchainUrl || ''}>
                    view on blockchain
                  </Link>
                </>
              )} */}
            </>
          )}
        </Typography>
      </CustomPopover>
    </>
  );
};

export default VerifyRequestStudent;
