import React from 'react';
import {
  Autocomplete,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

import { LocationCircleIcon, LocationIcon } from '../SVG-components';
import styles from './styles.module.scss';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDgJVSnBQAh9PlTmhO3sLpNquQIzczmhVM';

type Props = {
  addressName: string;
  control:
    | Control<{
        [key: string]: string | number | boolean | undefined;
      }>
    | any;
  disabled?: boolean;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  countryName: string;
  stateName: string;
  cityName: string;
  zipcodeName: string;
  latName: string;
  lngName: string;
};

type AddressOption = {
  description: string;
  placeId: string;
};

export default function AddressAutocomplete({
  control,
  addressName,
  setValue,
  disabled,
  placeholder,
  cityName,
  countryName,
  latName,
  lngName,
  stateName,
  zipcodeName,
}: Props) {
  const [suggestions, setSuggestions] = React.useState<AddressOption[]>([]);

  const loadAddressSuggestions = (input: string) => {
    if (!input) return;

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (predictions) => {
      if (predictions) {
        const options = predictions.map((prediction) => ({
          description: prediction.description,
          placeId: prediction.place_id,
        }));
        setSuggestions(options);
      }
    });
  };

  const fetchAddressDetails = (placeId: string) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const components = place.address_components;
        const geometry = place.geometry;

        // Safely extract lat and lng if geometry exists
        const lat = geometry?.location?.lat();
        const lng = geometry?.location?.lng();

        let country = '',
          state = '',
          city = '',
          zipcode = '';

        if (components) {
          components.forEach((component) => {
            const types = component.types;
            if (types.includes('country')) {
              country = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
              state = component.long_name;
            } else if (types.includes('locality')) {
              city = component.long_name;
            } else if (types.includes('postal_code')) {
              zipcode = component.long_name;
            }
          });
        }

        // Set values to react-hook-form
        setValue(countryName, country);
        setValue(stateName, state);
        setValue(cityName, city);
        setValue(zipcodeName, zipcode);
        setValue(latName, lat || 0); // Default to 0 if lat is undefined
        setValue(lngName, lng || 0); // Default to 0 if lng is undefined
        setValue(addressName, place?.formatted_address || '');
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <Controller
        name={addressName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            freeSolo
            options={suggestions.map((option) => option.description)}
            onInputChange={(e, value) => loadAddressSuggestions(value)}
            onChange={(e, value) => {
              const selectedOption = suggestions.find(
                (option) => option.description === value
              );
              if (selectedOption) {
                fetchAddressDetails(selectedOption.placeId);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                variant="outlined"
                fullWidth
                placeholder={placeholder || 'Enter location'}
                InputLabelProps={{ shrink: false }} // Remove label
                InputProps={{
                  ...params.InputProps,
                  style: {
                    borderRadius: '8px',
                    padding: '8px', // Optional: Adjust padding to fit your design
                    fontSize: '12px',
                  },
                }}
              />
            )}
            disabled={disabled}
            clearIcon={null}
            sx={{
              width: '100%', // Ensure Autocomplete takes the full width
              '.MuiAutocomplete-inputRoot': {
                padding: 0, // Remove extra padding from the root
              },
            }}
            renderOption={(props, option) => (
              <ListItem {...props} key={option}>
                <ListItemText
                  primary={
                    <div className={styles.listBox}>
                      <LocationCircleIcon />
                      <h4>{option}</h4>
                    </div>
                  }
                />
              </ListItem>
            )}
          />
        )}
      />
    </LoadScript>
  );
}
