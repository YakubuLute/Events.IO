import React, { useState } from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { TConenction } from '@/@types/candidate/candidate';
import { ConnectionNav } from '@/@types/shared/type';
import { connectionReasonOptionsNav } from '@/constants';
import CustomDialog from '../dialog/CustomDialog';
import ForwardArrowIcon from '../SVG-components/ForwardArrowIcon';
import ConnectionForm from './ConnectionForm';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  open: boolean;
  connection: TConenction;
  predefinedSelectedNav?: ConnectionNav | null;
  onConnect?: () => any;
};

const ConnectionModal = ({ connection, onClose, open, predefinedSelectedNav = null, onConnect }: Props) => {
  const [selectedNav, setSelectedNav] = useState<ConnectionNav | null>(predefinedSelectedNav ?? null);

  return (
    <CustomDialog onClose={onClose} open={open} title="Connect">
      <div className={styles.connectionContainer}>
        <div className={styles.profileBox}>
          <Image
            src={
              connection?.profilePhoto ||
              '/assets/images/user-default-image-cir.svg'
            }
            alt={`${connection?.personalDetails?.firstName} Profile Picture`}
            width={80}
            height={80}
            priority
          />
          <Typography className={styles.headerText}>
            Ask{' '}
            <span>{connection?.personalDetails?.firstName?.toLowerCase()}</span>{' '}
            about...
          </Typography>
        </div>
        {!selectedNav ? (
          <div className={styles.optionsBox}>
            {connectionReasonOptionsNav.map((item) => (
              <button
                className={styles.itemBox}
                key={item.label}
                onClick={() => setSelectedNav(item)}
              >
                <div className={styles.box}>
                  {item.icon}
                  {item.label}
                </div>
                <ForwardArrowIcon />
              </button>
            ))}
          </div>
        ) : (
          <ConnectionForm
            connection={connection}
            selectedNav={selectedNav}
            setSelectedNav={setSelectedNav}
            onClose={onClose}
            allowClose={!predefinedSelectedNav}
            onConnect={onConnect}
          />
        )}
      </div>
    </CustomDialog>
  );
};

export default ConnectionModal;
