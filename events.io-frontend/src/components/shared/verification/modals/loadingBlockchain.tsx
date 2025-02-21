'use client';
import { useVerificationContext } from '@/contexts/verification';
import { Modal, SxProps, Typography } from '@mui/material';
import React from 'react';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';
import ButtonSpacing from '../../Button/ButtonSpacing';
import Cancel from '../../icons/cancel';

import loadingBlockchain from '@/public/gifs/blockchain-loading.gif'
import Image from 'next/image';
// import { useUniversityContext } from '@/contexts/universityContext';
// import { useDeclineUniversityRequest } from '@/hooks/university/useVerificationRequestsUpdates';

type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

type Props = {
  loading?: boolean;
}

const BlochChainLoading: React.FC<Props> = () => {
  const { 
    setBlockChainLoading,
    blockChainLoading,
  } =
  useVerificationContext();


  const MiddleData = ({ sx }: MiddleDataProps) => {
    return (
      <VStack className={styles.verificationSuccContainer} sx={sx}>
         <ButtonSpacing
             className  ={styles.cancelBtn}
             onClick={(e) => {
               e.preventDefault();
               setBlockChainLoading(false);
             }}
             sx={{ display: { xs: 'none', lg: 'flex', width: "100%", justifyContent: "flex-end", padding: "20px"} }}
           >
             <Cancel />
           </ButtonSpacing>
        <div className={styles.blockchain_img}>
          <Image src={loadingBlockchain} alt="Logo" with="380px" height="500" />
        </div>
        <Typography className={styles.title}>
          Please wait, writing on blockchain...
        </Typography>        
      </VStack>
    );
  };
  return (
    <>
      <Modal
        open={blockChainLoading}
        onClose={() => setBlockChainLoading(false)}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MiddleData sx={{ maxWidth: '900px', borderRadius: '12px' }} />
      </Modal>
      <VStack
        className={styles.verifyDetailsMobileContainer}
        sx={{
          display: { xs: 'flex', lg: 'none' },
          transform: blockChainLoading ? 'translateY(0)' : 'translateY(100vh)',
          transition: 'transform 0.5s',
        }}
      >
        <MiddleData
          sx={{ height: '100%', backgroundColor: '#f7f8fa !important' }}
        />
      </VStack>
    </>
  );
};

export default BlochChainLoading;