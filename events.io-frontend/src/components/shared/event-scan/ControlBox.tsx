import React from 'react';

import { CustomButton } from '../Button/Button';
import styles from './styles.module.scss';

type Props = {
  activeTab: 'scan' | 'list';
  setActiveTab: (value: 'scan' | 'list') => void;
};

const ControlBox = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className={styles.controlBox}>
      <div className={styles.btnBox}>
        <CustomButton
          label="Scan"
          fullWidth
          className={[styles.btn, activeTab === 'scan' && styles.active].join(
            ' '
          )}
          onClick={() => setActiveTab('scan')}
        />
        <CustomButton
          label="Scanned List"
          fullWidth
          className={[styles.btn, activeTab === 'list' && styles.active].join(
            ' '
          )}
          onClick={() => setActiveTab('list')}
        />
      </div>
    </div>
  );
};

export default ControlBox;
