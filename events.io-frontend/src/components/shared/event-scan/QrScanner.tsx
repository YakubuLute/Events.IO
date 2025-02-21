import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QRScanner from 'qr-scanner';

import { errorAlert } from '../toastAlert';
import styles from './styles.module.scss';

type Props = {
  onScanSuccess: (result: QRScanner.ScanResult) => void;
};

const QrScannerComponent = ({ onScanSuccess }: Props) => {
  const scannerRef = useRef<QRScanner>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrBoxRef = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanFail = (err: string) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoRef.current && !scannerRef.current) {
      scannerRef.current = new QRScanner(videoRef?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxRef?.current || undefined,
      });

      scannerRef?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((_) => setQrOn(false));
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!videoRef?.current) {
        scannerRef?.current?.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!qrOn) {
      errorAlert({
        message:
          'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.',
      });
    }
  }, [qrOn]);

  return (
    <div className={styles.qrReader}>
      <video ref={videoRef}></video>
      <div ref={qrBoxRef} className={styles.qrBox}>
        <Image
          alt="QR Code Box"
          src={`/qr-frame.svg`}
          width={256}
          height={256}
          className={styles.qrFrame}
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default QrScannerComponent;
