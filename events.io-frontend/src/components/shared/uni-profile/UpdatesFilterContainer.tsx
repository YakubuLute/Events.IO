import React from 'react';

import { UpdateOptionsType } from '@/hooks/university';
import styles from './styles.module.scss';

type Props = {
  handleFilter: (value: UpdateOptionsType) => void;
  selected: UpdateOptionsType;
};

const UpdatesFilterContainer = ({ handleFilter, selected }: Props) => {
  return (
    <div className={styles.listBox}>
      <button
        className={[styles.listItem, selected === 'all' && styles.active].join(
          ' '
        )}
        onClick={() => handleFilter('all')}
      >
        All
      </button>
      <button
        className={[styles.listItem, selected === 'news' && styles.active].join(
          ' '
        )}
        onClick={() => handleFilter('news')}
      >
        News
      </button>
      <button
        className={[
          styles.listItem,
          selected === 'update' && styles.active,
        ].join(' ')}
        onClick={() => handleFilter('update')}
      >
        Update
      </button>
      <button
        className={[
          styles.listItem,
          selected === 'announcement' && styles.active,
        ].join(' ')}
        onClick={() => handleFilter('announcement')}
      >
        Announcement
      </button>
    </div>
  );
};

export default UpdatesFilterContainer;
