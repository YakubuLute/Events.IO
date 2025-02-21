import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';

import { SUCCESS_STATUS_CODE } from '@/utils/responseStatus';
import { COOKIES_KEY } from '@/utils/setCookies';
import { ErrorData } from '@/utils/shared/axiosError';
import { useScanQRCode } from '@/hooks/shared';
import {
  APISuccessResponse,
  ErrorResponse,
  ScanParams,
  ScanResponse,
} from '@/@types/shared/type';
import { CustomButton } from '../Button/Button';
import ExitIcon from '../SVG-components/ExitIcon';
import { errorAlert } from '../toastAlert';
import AccountIdModal from './AccountIdModal';
import ControlBox from './ControlBox';
import DeactivatedScannerModal from './DeactivatedScannerModal';
import EventBox from './EventBox';
import ListBox from './ListBox';
import PassCodeModal from './PassCodeModal';
import ScanBox from './ScanBox';
import ScanConfirmModal from './ScanConfirmModal';
import styles from './styles.module.scss';

type Props = {
  params: ScanParams;
};

const ScanContainer = ({ params }: Props) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'list'>('scan');
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [scanResponse, setScanResponse] = useState<ScanResponse | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(true);
  const [qrString, setQrString] = useState<string | null>(null);
  const [openDeactivatedScannerModal, setOpenDeactivatedScannerModal] =
    useState(false);
  const [openAccountIdModal, setOpenAccountIdModal] = useState(false);

  const onExit = () => {
    Cookies.remove(COOKIES_KEY.SCAN_AUTH_TOKEN);
    setOpenCamera(false);
    setOpenAuthModal(true);
  };

  const onCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setScanResponse(null);
  };

  const { mutate: scanQRCode, isPending: isSubmitting } = useScanQRCode({
    onSuccess: (data: APISuccessResponse) => {
      setScanResponse(data?.data as ScanResponse);
      setOpenConfirmModal(true);
      setQrString(null);
    },
    onError: (error: ErrorResponse) => {
      if (error && error.response && error.response?.status === 401) {
        onExit();
      }
      if (error && error.response && error.response.data) {
        const errorData = error.response.data as ErrorData;
        if (errorData.errCode === SUCCESS_STATUS_CODE.SCANNER_NOT_ACTIVATED) {
          setOpenDeactivatedScannerModal(true);
          setOpenConfirmModal(false);
        } else {
          errorAlert({ message: errorData?.message });
        }
      }
      setQrString(null);
    },
  });

  useEffect(() => {
    const authToken = Cookies.get(COOKIES_KEY.SCAN_AUTH_TOKEN);
    if (!authToken) {
      setOpenAuthModal(true);
    } else {
      setOpenCamera(true);
    }
  }, []);

  useEffect(() => {
    if (qrString) {
      const url = new URL(qrString);
      const path = url.pathname;
      const attendeeAccountId = path.slice(1);
      scanQRCode({
        attendeeAccountId,
        employerId: params?.employerId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrString]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <Typography className={styles.title}>
            Event Attendee Check-In
          </Typography>
          <EventBox eventId={params?.eventId} />
        </div>
        <div className={styles.scanContainer}>
          <ControlBox activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className={styles.mainBox}>
            {activeTab === 'scan' ? (
              <div className={styles.optionBox}>
                <ScanBox
                  openCamera={openCamera}
                  setQrString={setQrString}
                  isSubmitting={isSubmitting}
                />
                <CustomButton
                  label="Check In with ID Instead"
                  className={styles.submitBtn}
                  onClick={() => {
                    setOpenCamera(false);
                    setOpenAccountIdModal(true);
                  }}
                />
              </div>
            ) : (
              <ListBox params={params} />
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <CustomButton
            label="Exit"
            endIcon={<ExitIcon />}
            className={styles.exitBtn}
            fullWidth
            variant="outlined"
            onClick={onExit}
          />
        </div>
      </div>
      <PassCodeModal
        onClose={() => setOpenAuthModal(false)}
        open={openAuthModal}
        params={params}
        setOpenCamera={setOpenCamera}
        setOpenDeactivatedScannerModal={setOpenDeactivatedScannerModal}
      />
      <AccountIdModal
        onClose={() => {
          setOpenCamera(true);
          setOpenAccountIdModal(false);
        }}
        open={openAccountIdModal}
        params={params}
        setOpenDeactivatedScannerModal={setOpenDeactivatedScannerModal}
        onExit={onExit}
        setOpenConfirmModal={setOpenConfirmModal}
        setScanResponse={setScanResponse}
      />
      {openConfirmModal && scanResponse ? (
        <ScanConfirmModal
          onClose={onCloseConfirmModal}
          open={openConfirmModal}
          scanResponse={scanResponse}
        />
      ) : null}
      {openDeactivatedScannerModal ? (
        <DeactivatedScannerModal
          onClose={() => setOpenDeactivatedScannerModal(false)}
          open={openDeactivatedScannerModal}
        />
      ) : null}
    </>
  );
};

export default ScanContainer;
