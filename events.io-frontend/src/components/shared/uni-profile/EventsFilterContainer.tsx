import React from 'react';
import dayjs from 'dayjs';

import { CustomDatePicker } from '@/components/shared';
import SearchIcon from '@/components/shared/SVG-components/SearchIcon';
import { EventQueryParams, FilterByOption } from '@/hooks/university';
import styles from './styles.module.scss';

type Props = {
  filterDTO: EventQueryParams;
  setFilterDTO: (obj: EventQueryParams) => void;
  platform: 'candidate' | 'university' | 'employer';
};

const EventsFilterContainer = ({
  filterDTO,
  setFilterDTO,
  platform,
}: Props) => {

  const handleChangeTab = (tab: FilterByOption) => {
    setFilterDTO({ ...filterDTO, filterBy: tab });
    window.history.pushState({}, '', `?tab=${tab}`);
  }

  return (
    <div className={styles.eventFilterBox}>
      <div className={styles.inputBox}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className={styles.inputSearch}
          value={filterDTO?.search}
          onChange={(e) =>
            setFilterDTO({ ...filterDTO, search: e.target.value })
          }
        />
      </div>
      <CustomDatePicker
        onChange={(date) =>
          setFilterDTO({ ...filterDTO, date: dayjs(date).format('YYYY-MM-DD') })
        }
        value={filterDTO?.date || ''}
      />
      <div className={styles.typeFilterBox}>
        <button
          className={[
            styles.listItem,
            filterDTO.filterBy === 'upcoming' && styles.active,
          ].join(' ')}
          onClick={() => handleChangeTab(FilterByOption.UPCOMING)}
        >
          Upcoming Events
        </button>
        <button
          className={[
            styles.listItem,
            filterDTO.filterBy === 'previous' && styles.active,
          ].join(' ')}
          onClick={() => handleChangeTab(FilterByOption.PREVIOUS)}
        >
          Past Events
        </button>
        {platform !== 'candidate' ? (
          <button
            className={[
              styles.listItem,
              filterDTO.filterBy === 'draft' && styles.active,
            ].join(' ')}
            onClick={() => handleChangeTab(FilterByOption.DRAFT)}
          >
            Saved Events
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default EventsFilterContainer;
