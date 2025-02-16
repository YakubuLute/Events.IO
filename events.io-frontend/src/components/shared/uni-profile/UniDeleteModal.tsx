import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import { useDeleteSingleStaffMember } from '@/hooks/university';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { TUniversityStaffProfile } from '@/@types/university/dtos';
import DeletePrompt from '../prompt-dialog/DeletePrompt';
import { errorAlert, successAlert } from '../toastAlert';

type Props = {
  open: boolean;
  onClose: () => void;
  staff: TUniversityStaffProfile | undefined;
  setStaff: (value: TUniversityStaffProfile | undefined) => void;
  filterStatus: string;
  searchQuery: string;
};

const UniDeleteModal = ({
  onClose,
  open,
  staff,
  setStaff,
  filterStatus,
  searchQuery,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteStaffById, isPending: isDeletingStaffMember } =
    useDeleteSingleStaffMember({
      onSuccess: (data: APISuccessResponse) => {
        successAlert({ message: data?.message });
        setStaff(undefined);
        onClose();
        queryClient.invalidateQueries({
          queryKey: [
            'getAllUniversityStaffMembers',
            {
              searchQuery: searchQuery,
              filterStatus: filterStatus,
            },
          ],
        });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const onConfirmDelete = () => {
    deleteStaffById({ staffId: staff!._id! });
  };

  return (
    <DeletePrompt
      onClose={onClose}
      onConfirm={onConfirmDelete}
      open={open}
      title="Are you sure?"
      message="Do you want to delete the staff member?"
      isLoading={isDeletingStaffMember}
    />
  );
};

export default UniDeleteModal;
