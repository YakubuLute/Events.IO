import React from 'react';
import { CircularProgress } from '@mui/material';
import QRScanner from 'qr-scanner';

import SelfieBorderIcon from '../SVG-components/SelfieBorderIcon';
import QrScannerComponent from './QrScanner';
import styles from './styles.module.scss';

type Props = {
  openCamera: boolean;
  setQrString: (value: string) => void;
  isSubmitting: boolean;
};

const ScanBox = ({ openCamera, setQrString, isSubmitting }: Props) => {
  const onScanSuccess = (result: QRScanner.ScanResult) => {
    const qrString = result?.data;
    if (qrString) {
      setQrString(qrString);
    }
  };

  return (
    <>
      {openCamera ? (
        <QrScannerComponent onScanSuccess={onScanSuccess} />
      ) : (
        <div className={styles.scanBoxInit}>
          {isSubmitting ? <CircularProgress /> : <SelfieBorderIcon />}
        </div>
      )}
    </>
  );
};

export default ScanBox;
