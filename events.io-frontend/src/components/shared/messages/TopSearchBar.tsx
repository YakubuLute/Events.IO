import React, { useContext } from 'react';

import { MessageContext } from '@/contexts/messageContext';
import SearchIcon from '../SVG-components/SearchIcon';
import styles from './styles.module.scss';

const TopSearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(MessageContext);

  return (
    <div className={styles.topBarWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <SearchIcon />
    </div>
  );
};

export default TopSearchBar;
