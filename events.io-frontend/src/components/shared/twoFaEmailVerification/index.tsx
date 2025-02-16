import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { OptInputs } from '@/components/auth/shared';
import { Constants } from '@/constants/shared/shared-constants';
import { CustomButton } from '../Button/Button';
import styles from './two-factor.module.scss';

interface Props {
  handleVerifyOtp: (values: string) => void;
  isVerifying: boolean;
  handleResentOtp: () => void;
  resendOTPSuccess: boolean;
}

export default function TwoFAEmailVerification({
  handleVerifyOtp,
  handleResentOtp,
  isVerifying,
  resendOTPSuccess,
}: Props) {
  const OTP_COUNTER = Constants.OTP_COUNTER_MAX_TIMER;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(Number(OTP_COUNTER) || 60);

  const onSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    handleVerifyOtp(otpCode);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (resendOTPSuccess) {
      setTimer(Number(OTP_COUNTER) || 60);
    }
  }, [resendOTPSuccess, OTP_COUNTER]);

  return (
    <Container
      component="section"
      maxWidth={false}
      disableGutters={true}
      className={styles.form_section}
    >
      <div className={styles.auth_container}>
        <Box className={styles.formWrapper}>
          <div className={styles.signin_logo}>
            <Image
              src="/icons/logo_alt.svg"
              alt="Vaurse Logo"
              width={130}
              height={60}
            />
          </div>
          <Box className={styles.form_body}>
            <form className={styles.form} onSubmit={onSubmit}>
              <Typography className={styles.signin_title}>
                2-factor Authentication
              </Typography>
              <Typography component="p" className={styles.two_factor_text}>
                You have activated 2-factor authentication on your account. To
                log in, please provide the one-time password sent to your device
              </Typography>
              <Box className={styles.otp_box}>
                <OptInputs otp={otp} setOtp={setOtp} />
              </Box>
              <Typography className={styles.altLink}>
                Didn&apos;t receive code?{' '}
                <CustomButton
                  label={`Resend Code ${timer !== 0 ? `in ( ${timer}s)` : ''}`}
                  variant="text"
                  size="small"
                  type="button"
                  buttonClass="text_link"
                  isLoading={isVerifying}
                  onClick={handleResentOtp}
                  className={styles.resend_btn}
                  disabled={timer !== 0}
                />
              </Typography>
              <div className={styles.signin_submit}>
                <CustomButton
                  type="submit"
                  label="Continue"
                  fullWidth={true}
                  disabled={otp.includes('')}
                  isLoading={isVerifying}
                  className={styles.submit_btn}
                />
              </div>
            </form>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
