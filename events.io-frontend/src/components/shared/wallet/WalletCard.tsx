import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { borderRadius, BoxTypeMap } from '@mui/system';

import style from './wallet.module.scss';

const WalletCard = (props: DefaultComponentProps<BoxTypeMap>) => {
  return (
    <Box {...props} className={style.walletCardContainer}>
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <svg
          width="175"
          height="184"
          viewBox="0 0 175 184"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_13875)">
            <circle
              cx="105.621"
              cy="21.1238"
              r="74.7908"
              stroke="lightgrey"
              strokeOpacity="0.24"
              strokeWidth="1.14184"
            />
            <circle
              cx="100.482"
              cy="29.6883"
              r="100.482"
              stroke="lightgrey"
              strokeOpacity="0.24"
              strokeWidth="1.14184"
            />
            <circle
              cx="153.578"
              cy="67.9397"
              r="101.053"
              stroke="lightgrey"
              strokeOpacity="0.24"
              strokeWidth="1.14184"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_13875">
              <rect width="175" height="184" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
      {props.children}
    </Box>
  );
};

export default WalletCard;
