import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CircularProgress } from '@mui/material';

import useClickOutside from '@/hooks/shared/useClickOutside';
import OptionsService from '@/services/shared/shared.service';
import { TOptionItem, TQueryOptionPops } from '@/@types/shared/type';
import AddIcon from '../SVG-components/AddIcon';
import styles from './styles.module.scss';

const { getEventUsersWithSearch } = new OptionsService();

type Props = {
  setSelectedItem: (item: TOptionItem) => void;
  filterKey: keyof TOptionItem;
  openAddForm: (email: string) => void;
};

// type HighlightSearchValueProps = {
//   value: string;
//   searchValue: string;
// };

// const HighlightSearchValue = ({
//   searchValue,
//   value,
// }: HighlightSearchValueProps) => {
//   const regex = new RegExp(searchValue, 'gi');
//   const isSearchValueFound = regex.test(value);
//   if (isSearchValueFound) {
//     const highlightedCountry = value.replace(
//       regex,
//       `<span style="background-color: #0C27BE">${searchValue}</span>`
//     );

//     return <div dangerouslySetInnerHTML={{ __html: highlightedCountry }} />;
//   }
//   return <div>{value}</div>;
// };

const CandidatesAutocomplete = ({
  setSelectedItem,
  filterKey,
  openAddForm,
}: Props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<TOptionItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const filterDataAsync = (searchValue: string): Promise<TOptionItem[]> => {
    return new Promise<TOptionItem[]>((resolve, reject) => {
      const payload: TQueryOptionPops = {
        itemsPerPage: 10,
        page: 1,
        q: '',
        searchQuery: 'email',
      };
      setTimeout(async () => {
        try {
          setLoading(true);
          const filteredData = await getEventUsersWithSearch({
            ...payload,
            q: searchValue,
          });
          setLoading(false);
          resolve(filteredData?.data?.items || []);
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      }, 500);
    });
  };

  // On change event to handle data filtering
  // using the input from the user.
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    setActiveSuggestion(0);
    if (!input) {
      setShowSuggestions(false);
      return;
    }
    filterDataAsync(input)
      .then((data) => {
        setShowSuggestions(true);
        setSuggestions(data);
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  // Input keydown event
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const suggestionsList = suggestionsRef.current;

    if (e.key === 'ArrowUp' && activeSuggestion !== 0) {
      // User pressed the Arrow Up key
      setActiveSuggestion((prev) => prev - 1);
      if (
        (e.target as HTMLInputElement).value.length > -1 &&
        suggestionsList !== null &&
        activeSuggestion <= suggestions.length / 2
      ) {
        suggestionsList.scrollTop = 0;
      }
    } else if (
      e.key === 'ArrowDown' &&
      activeSuggestion < suggestions.length - 1
    ) {
      // User pressed the Arrow Down key
      setActiveSuggestion((prev) => prev + 1);
      if (
        (e.target as HTMLInputElement).value.length > -1 &&
        suggestionsList !== null &&
        activeSuggestion >= suggestions.length / 2
      ) {
        suggestionsList.scrollTop = suggestionsList.scrollHeight;
      }
    } else if (e.key === 'Escape') {
      // User pressed the Escape key
      setShowSuggestions(false);
      setValue('');
    } else if (e.key === 'Enter' && value !== '' && suggestions.length > 0) {
      // User pressed the Enter key
      setShowSuggestions(false);
      setValue(suggestions[activeSuggestion][filterKey] as string);
      setSelectedItem && setSelectedItem(suggestions[activeSuggestion]);
    } else {
      return;
    }
  };

  const onSetSuggestion = (item: TOptionItem) => {
    setShowSuggestions(false);
    setValue(item[filterKey] as string);
    setSelectedItem(item);
    setValue('');
  };

  const onInputClick = (e: FormEvent<EventTarget>) => {
    e.stopPropagation();
  };

  const onSuggestionItemHover = (index: number) => {
    setActiveSuggestion(index);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useClickOutside(containerRef, () => {
    setShowSuggestions(false);
  });

  const onHandleNotFoundClick = (
    e: MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    e.preventDefault();
    openAddForm(email);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.autocompleteWrapper} ref={containerRef}>
      <input
        ref={inputRef}
        placeholder="Member email. . ."
        value={value}
        onChange={handleOnChange}
        className={styles.filterWrapper}
        onKeyDown={onKeyDown}
        onClick={onInputClick}
      />
      {loading && (
        <CircularProgress
          size={12}
          className={styles.loading}
          color="primary"
        />
      )}
      {showSuggestions && (
        <ul ref={suggestionsRef} className={styles.listWrapper}>
          {suggestions && suggestions.length ? (
            suggestions.map((suggestion) => (
              <li
                key={suggestion[filterKey] as string}
                className={[
                  styles.filterItem,
                  suggestions.indexOf(suggestion) === activeSuggestion &&
                    styles.active,
                ].join(' ')}
                onMouseEnter={() =>
                  onSuggestionItemHover(suggestions.indexOf(suggestion))
                }
                onClick={() => onSetSuggestion(suggestion)}
              >
                {/* <HighlightSearchValue
                  value={suggestion[filterKey] as string}
                  searchValue={value}
                /> */}
                {suggestion[filterKey]}
              </li>
            ))
          ) : (
            <li className={styles.filterItemAlt}>
              <div className={styles.notFoundBox}>
                <div className={styles.header}>
                  <h4>No result found for &quot;{value}&quot;</h4>
                </div>
                <button
                  className={styles.addBtn}
                  onClick={(e) => onHandleNotFoundClick(e, value)}
                >
                  <AddIcon />
                  <span>Add &quot;{value}&quot;</span>
                </button>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CandidatesAutocomplete;
