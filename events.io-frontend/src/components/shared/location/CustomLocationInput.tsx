import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import debounce from 'lodash/debounce';

interface LocationType {
  city: string;
  state: string;
  country: string;
  address: string;
  zipcode: string;
  lat?: number | null;
  long?: number | null;
  countryIsoCode: string;
  stateIsoCode: string;
}

interface CustomLocationInputProps {
  apiKey: string;
  value: LocationType | null;
  onChange: (location: LocationType) => void;
}

const CustomLocationInput: React.FC<CustomLocationInputProps> = ({
  apiKey,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value?.address || '');
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const debouncedOnChange = useCallback(
    debounce((newValue: string) => {
      onChange({ ...value, address: newValue } as LocationType);
    }, 300),
    [onChange, value]
  );

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    let autocomplete: google.maps.places.Autocomplete | null = null;

    loader.load().then(() => {
      if (inputRef.current) {
        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['establishment', 'geocode'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete?.getPlace();
          setSelectedPlace(place);
          if (place) {
            const formattedAddress = formatAddress(place);
            setInputValue(formattedAddress);
          }
        });
      }
    });

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [apiKey]);

  const formatAddress = (place: google.maps.places.PlaceResult): string => {
    let address = place.name ? place.name + ', ' : '';
    const components: string[] = [];

    place.address_components?.forEach((component) => {
      const types = component.types;
      if (types.includes('locality')) {
        components.push(component.long_name);
      } else if (types.includes('administrative_area_level_1')) {
        components.push(component.long_name);
      } else if (types.includes('country')) {
        components.push(component.long_name);
      }
    });

    address += components.join(', ');
    return address;
  };

  useEffect(() => {
    if (selectedPlace) {
      const locationDetails: LocationType = {
        city: '',
        state: '',
        country: '',
        address: formatAddress(selectedPlace),
        zipcode: '',
        countryIsoCode: '',
        stateIsoCode: '',
        lat: selectedPlace.geometry?.location?.lat() || null,
        long: selectedPlace.geometry?.location?.lng() || null,
      };

      selectedPlace.address_components?.forEach((component) => {
        const types = component.types;
        if (types.includes('locality'))
          locationDetails.city = component.long_name;
        else if (types.includes('administrative_area_level_1')) {
          locationDetails.state = component.long_name;
          locationDetails.stateIsoCode = component.short_name;
        } else if (types.includes('country')) {
          locationDetails.country = component.long_name;
          locationDetails.countryIsoCode = component.short_name;
        } else if (types.includes('postal_code')) {
          locationDetails.zipcode = component.long_name;
        }
      });

      onChange(locationDetails);
    }
  }, [selectedPlace, onChange]);

  useEffect(() => {
    if (value?.address !== inputValue) {
      setInputValue(value?.address || '');
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSelectedPlace(null);
    debouncedOnChange(newValue);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter a location"
    />
  );
};

export default CustomLocationInput;
