import { FC, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TextField, TextFieldProps } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useOnClickOutside } from 'usehooks-ts';

import SearchIcon from '@/components/shared/icons/search';
import UniversityGlobalSearchModal from '@/components/university/globalSearchModal';
import styles from './searchBar.module.scss';

interface SearchProps {
  id?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  placeholder: string;
  searchClass: string;
  children?: React.ReactNode | JSX.Element;
  show?: boolean;
  platform: 'university' | 'employer' | 'candidate';
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xl')]: {
      // width: '20ch',
    },
  },
  fontSize: '14px',
}));

const MAX_WIDTH_ON_FOCUS = 400;

export const HeaderSearchBar: React.FC<SearchProps> = (props: SearchProps) => {
  const { name, placeholder, platform, searchClass } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [isElementFocused, setIsElementFocused] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => setIsElementFocused(false));

  const router = useRouter();

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
      console.log('Enter click');
      if (platform === 'university') {
        router.push(`/university/search?filterBy=&query=${searchValue}`);
        setIsElementFocused(false);
      }
    }
  };

  return (
    <div className="relative">
      <Search
        className={` ${styles.search_wrapper} ${
          searchClass ? styles[searchClass] : ''
        }`}
      >
        <SearchIconDiv>
          {name == 'location' ? (
            <LocationOnIcon className={styles.location_icon} />
          ) : (
            <SearchIcon className={styles.search_icon} />
          )}
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
          {platform === 'university' && (
            <UniversityGlobalSearchModal
              ref={modalRef}
              searchValue={searchValue}
              setIsElementFocused={setIsElementFocused}
              isElementFocused={isElementFocused}
              setSearchValue={setSearchValue}
            />
          )}
        </Box>
      </Search>
    </div>
  );
};
