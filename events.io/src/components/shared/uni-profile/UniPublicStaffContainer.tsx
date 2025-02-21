import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';

import useDebounce from '@/utils/useDebounce';
import EmptyBox from '@/components/shared/empty';
import SearchIcon from '@/components/shared/SVG-components/SearchIcon';
import { getAllUniversityStaffMembers } from '@/hooks/university';
import { TUniversityStaffProfile } from '@/@types/university/dtos';
import { STAFF_PROFILE_STATUS } from '@/constants/university/university-contants';
import AddIcon from '../SVG-components/AddIcon';
import PublicStaffCard from './PublicStaffCard';
import PublicStaffCardSkeleton from './skeletons/PublicStaffCardSkeleton';
import styles from './styles.module.scss';
import UniAddStaffModal from './UniAddStaffModal';
import UniDeleteModal from './UniDeleteModal';

type Props = {
  uniId: string;
  platform: 'candidate' | 'university' | 'employer';
};

const UniPublicStaffContainer = ({ uniId, platform }: Props) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 1000);
  const [openModal, setOpenModal] = useState(false);
  const [staff, setStaff] = useState<TUniversityStaffProfile | undefined>(
    undefined
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: publicStaffData, isPending: loading } =
    getAllUniversityStaffMembers({
      filterStatus: STAFF_PROFILE_STATUS.PUBLIC,
      searchQuery: debouncedSearchText,
      schoolId: uniId,
      itemsPerPage: 5,
    });

  const handleClick = (
    staff: TUniversityStaffProfile,
    action: 'edit' | 'delete'
  ) => {
    if (action === 'delete') {
      setOpenDeleteModal(true);
    } else if (action === 'edit') {
      setOpenModal(true);
    }
    setStaff(staff);
  };

  return (
    <>
      <div className={styles.publicStaffContainer}>
        <div className={styles.staffHeader}>
          <Typography className={styles.titleText}>Public Staff</Typography>
          {platform === 'university' ? (
            <IconButton
              className={styles.iconBtn}
              onClick={() => {
                setStaff(undefined);
                setOpenModal(true);
              }}
            >
              <AddIcon />
            </IconButton>
          ) : null}
        </div>
        <div className={styles.searchBox}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search staff"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className={styles.contentBox}>
          {loading ? (
            Array.from({ length: 5 })
              .fill('')
              .map((_, idx) => <PublicStaffCardSkeleton key={idx} />)
          ) : publicStaffData && publicStaffData.items.length ? (
            publicStaffData.items.map((staff) => (
              <PublicStaffCard
                key={staff._id}
                staff={staff}
                platform={platform}
                handleClick={handleClick}
              />
            ))
          ) : (
            <EmptyBox title="Public staff will show here" />
          )}
        </div>
      </div>
      <UniAddStaffModal
        onClose={() => setOpenModal(false)}
        open={openModal}
        filterStatus={STAFF_PROFILE_STATUS.PUBLIC}
        searchQuery={debouncedSearchText}
        staff={staff}
      />
      <UniDeleteModal
        onClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        staff={staff}
        filterStatus={STAFF_PROFILE_STATUS.PUBLIC}
        searchQuery={debouncedSearchText}
        setStaff={setStaff}
      />
    </>
  );
};

export default UniPublicStaffContainer;
