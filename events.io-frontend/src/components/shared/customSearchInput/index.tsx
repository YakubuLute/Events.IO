import { ChangeEvent } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TextField } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';

import SearchIcon from '@/components/shared/icons/search';
import styles from './customSearchInput.module.scss';

interface SearchProps {
  id?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  placeholder: string;
  searchClass: string;
  children?: React.ReactNode | JSX.Element;
  show?: boolean;
  platform?: 'university' | 'employer' | 'candidate';
  sx?: SxProps;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

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
    [theme.breakpoints.up('xl')]: {
      // width: '20ch',
    },
  },
  fontSize: '14px',
}));

const CustomSearchInput: React.FC<SearchProps> = (props: SearchProps) => {
  const { name, placeholder, searchClass, show, sx, onChange, value } = props;
 
  return (
    <Search
      className={` ${styles.search_wrapper} ${
        searchClass ? styles[searchClass] : ''
      }`}
      sx={{ display: show ? 'block !important' : '', ...sx }}
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
        value={value}
        sx={{ ...sx }}
        onChange={onChange}
        className={`${searchClass ? styles[searchClass] : ''}`}
        autoComplete="off"
      />
    </Search>
  );
};

export default CustomSearchInput;
