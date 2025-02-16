import { useRef, useState } from 'react';

import CandidateGlobalSearchModal from '@/components/candidate/globalCandidateSearchModal';
import InputSearchFiled from '../inputSearchFiled';

export const CandidateHeaderSearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isElementFocused, setIsElementFocused] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <InputSearchFiled
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      platform="candidate"
      placeholder="Search"
      setIsElementFocused={setIsElementFocused}
      isElementFocused={isElementFocused}
      modalRef={modalRef}
    >
      <CandidateGlobalSearchModal
        ref={modalRef}
        searchValue={searchValue}
        setIsElementFocused={setIsElementFocused}
        isElementFocused={isElementFocused}
        setSearchValue={setSearchValue}
        platform='candidate'
      />
    </InputSearchFiled>
  );
};
