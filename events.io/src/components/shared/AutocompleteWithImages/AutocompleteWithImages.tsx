import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { defaultUserPicture } from '@/components/ui/images';

interface AutocompleteOption {
  firstName: string;
  profilePhoto: string;
}

interface AutocompleteWithImagesProps {
  options: AutocompleteOption[];
  value: AutocompleteOption[];
  onChange: (event: React.ChangeEvent<{}>, newValue: AutocompleteOption[]) => void;
  placeholder?: string;
}

const AutocompleteWithImages: React.FC<AutocompleteWithImagesProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Favorites',
}) => {
  const renderTags = (tagValue, getTagProps) =>
    tagValue.map((option, index) => (
      <Chip
        label={option.firstName}
        key={option.firstName}
        {...getTagProps({ index })}
      />
    ));

  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.firstName}
      renderTags={renderTags}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="employees" placeholder={placeholder} />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Image
            src={option.profilePhoto??defaultUserPicture}
            alt={option.firstName}
            style={{ marginRight: 8, borderRaduis:'50%' }}
            width={24} height={24}
          />
          {option.firstName}
        </li>
      )}
    />
  );
};

export default AutocompleteWithImages;
