import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useOnClickOutside } from 'usehooks-ts';

import SearchIcon from '@/components/shared/icons/search';
import styles from './searchBar.module.scss';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));

const SearchIconDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.5rem',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xl')]: {},
  },
  fontSize: '14px',
}));

const MAX_WIDTH_ON_FOCUS = 400;

interface InputSearchFiledProps {
  placeholder: string;
  children?: React.ReactNode | JSX.Element;
  searchValue: string;
  setSearchValue: (value: string) => void;

  isElementFocused: boolean;
  setIsElementFocused: (value: boolean) => void;

  modalRef: React.MutableRefObject<HTMLDivElement | null>;

  platform: 'university' | 'employer' | 'candidate';
}

export default function InputSearchFiled({
  placeholder,
  searchValue,
  setSearchValue,
  platform,
  isElementFocused,
  setIsElementFocused,
  modalRef,
  children,
}: InputSearchFiledProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useOnClickOutside(modalRef, () => setIsElementFocused(false));

  const handleFocusChange = (event) => {
    if (event.type === 'focus') {
      setIsElementFocused(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      setIsElementFocused(false);
    }
    if (event.key === 'Enter') {
      router.push(`/${platform}/search?filterBy=&query=${searchValue}`);
      setIsElementFocused(false);
    }
  };

  useEffect(() => {
    if (query && !searchValue) {
      setSearchValue(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <Search className={` ${styles.search_wrapper} ${styles.employee_search}`}>
        <SearchIconDiv>
          <SearchIcon className={styles.search_icon} />
        </SearchIconDiv>
        <StyledInputBase
          fullWidth
          placeholder={placeholder}
          inputProps={{ 'aria-label': `${name}` }}
          value={searchValue}
          sx={{
            '& .MuiOutlinedInput-root': {
              position: 'relative',
              width: isElementFocused ? MAX_WIDTH_ON_FOCUS : 160,
              top: 0,
              right: 0,
              transition: 'all  .4s',

              '&.Mui-focused': {
                width: MAX_WIDTH_ON_FOCUS,
                top: 0,
              },
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocusChange}
          onKeyDown={handleKeyPress}
          autoComplete="off"
        />
        <Box
          className={`${
            isElementFocused
              ? 'absolute top-0 right-0 left-0 bg-transparent'
              : 'hidden'
          } h-[100vh] mt-[60px] animate-fade `}
        >
          {children}
        </Box>
      </Search>
    </div>
  );
}
