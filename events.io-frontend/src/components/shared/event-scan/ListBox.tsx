import React, { ChangeEvent, useState } from 'react';
import { Typography } from '@mui/material';

import useDebounce from '@/utils/useDebounce';
import { useGetSharedEventAttendees } from '@/hooks/shared';
import { EventsFilterSchema, ScanParams } from '@/@types/shared/type';
import { PaginationRounded } from '../pagination/PaginationRounded';
import SearchIcon from '../SVG-components/SearchIcon';
import ListContainer from './ListContainer';
import styles from './styles.module.scss';

type Props = {
  params: ScanParams;
};

const ListBox = ({ params }: Props) => {
  const [filterDTO, setFilterDTO] = useState<EventsFilterSchema>({
    page: 1,
    itemsPerPage: 100,
    scannerId: params?.scannerId,
    eventId: params?.eventId,
    scanResult: 'successful',
  });

  const debouncedFilteredData = useDebounce(filterDTO, 500);

  const onHandleText = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterDTO({ ...filterDTO, search: e.target.value });
  };

  const { data: attendeesData, isPending: loading } =
    useGetSharedEventAttendees(debouncedFilteredData, true);

  return (
    <div className={styles.attendeesContainer}>
      <div className={styles.filterBox}>
        <Typography className={styles.title}>
          Total Scanned Attendees ({attendeesData?.totalItems || 0})
        </Typography>
        <div className={styles.inputBox}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search attendee"
            onChange={onHandleText}
          />
        </div>
      </div>
      <ListContainer attendeesData={attendeesData} loading={loading} />
      {attendeesData && attendeesData.totalPages > 1 ? (
        <div className="pagination-container">
          <PaginationRounded
            count={attendeesData?.totalPages || 0}
            siblingCount={1}
            variant="outlined"
            shape="rounded"
            page={attendeesData?.currentPage || 0}
            onChange={(_, page) => {
              setFilterDTO({
                ...filterDTO,
                page: page,
              });
            }}
            sx={{
              '& .Mui-selected': {
                backgroundColor: '#0b2fb6 !important',
                color: 'white !important',
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ListBox;
