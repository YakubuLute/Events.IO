import { useRef, useState } from 'react';

import UniversityGlobalSearchModal from '@/components/university/globalSearchModal';
import InputSearchFiled from '../inputSearchFiled';

export const UniversityHeaderSearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isElementFocused, setIsElementFocused] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <InputSearchFiled
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      platform="university"
      placeholder="Search"
      setIsElementFocused={setIsElementFocused}
      isElementFocused={isElementFocused}
      modalRef={modalRef}
    >
      <UniversityGlobalSearchModal
        ref={modalRef}
        searchValue={searchValue}
        setIsElementFocused={setIsElementFocused}
        isElementFocused={isElementFocused}
        setSearchValue={setSearchValue}
      />
    </InputSearchFiled>
  );
};
