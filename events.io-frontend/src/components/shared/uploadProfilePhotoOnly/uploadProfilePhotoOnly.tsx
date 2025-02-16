import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { CircularProgress } from '@mui/material';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import styles from '@/components/employer/accountSettings/accountSetting.module.scss';
import ImageCropperModal from '@/components/employer/company-profile/image-crop/imageCropperDialog';
import { useUploadCandidateProfilePicture } from '@/hooks/candidate';
import { useUploadEmployeeProfilePicture } from '@/hooks/employer/employer-hooks';
import { useUpdateUniversityStaffProfilePicture } from '@/hooks/university';
import { useUser } from '@/contexts/userContext';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { errorAlert, successAlert } from '../toastAlert';

type ProfileProps = {
  sector: 'employer' | 'university' | 'candidate';
  defaultProfileImage?: string | null;
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UploadProfilePhotoOnly: React.FC<ProfileProps> = ({
  sector,
  defaultProfileImage,
  showModal,
  setShowModal,
}) => {
  const [logoUrl, setLogoUrl] = useState(defaultProfileImage || '');
  const [rawPhoto, setRawPhoto] = useState('');

  const [defaultLogoUrl, setDefaultLogoUrl] = useState<string>(
    defaultProfileImage || ''
  );
  const [openCropperModal, setOpenCropperModal] = useState<boolean>(false);
  const { updateCurrentUserProfilePicture } = useUser();
  //   University Hook

  const {
    mutate: uploadUniversityPicture,
    isPending: isUploadingUniversityPicture,
  } = useUpdateUniversityStaffProfilePicture({
    onSuccess: (data: APISuccessResponse) => {
      updateCurrentUserProfilePicture(rawPhoto);
      setLogoUrl(rawPhoto);
      successAlert({ message: data?.message });
    },
    onError: (error: ErrorResponse) => {
      errorAlert({ message: decodeAxiosError(error) });
    },
  });

  // Employer Hook
  const {
    mutate: uploadEmployerPicture,
    isPending: isUploadingEmployerPicture,
  } = useUploadEmployeeProfilePicture({
    onSuccess: (data: APISuccessResponse) => {
      updateCurrentUserProfilePicture(rawPhoto);
      setLogoUrl(rawPhoto);
      successAlert({ message: data?.message });
    },
    onError: (error: ErrorResponse) => {
      errorAlert({ message: decodeAxiosError(error) });
    },
  });

  const {
    mutate: uploadCandidatePicture,
    isPending: isUploadCandidatePicture,
  } = useUploadCandidateProfilePicture({
    onSuccess: (data: APISuccessResponse) => {
      updateCurrentUserProfilePicture(rawPhoto);
      setLogoUrl(rawPhoto);
      successAlert({ message: data?.message });
    },
    onError: (error: ErrorResponse) => {
      errorAlert({ message: decodeAxiosError(error) });
    },
  });

  // Fetch image as blob
  const fetchImageAsBlob = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  };

  const handleSaveImage = async (event: string) => {
    if (!event) {
      return;
    }
    const formData = new FormData();
    const logoBlob = await fetchImageAsBlob(event);
    setRawPhoto(event);

    formData.append('photo', logoBlob, 'image/jpeg');

    if (sector === 'university') {
      uploadUniversityPicture(formData);
    } else if (sector === 'employer') {
      uploadEmployerPicture(formData);
    } else if (sector === 'candidate') {
      uploadCandidatePicture(formData);
    }
  };

  useEffect(() => {
    if (defaultProfileImage) {
      setDefaultLogoUrl(defaultProfileImage);
    }
  }, [defaultProfileImage]);

  const handleClose = () => {
    setShowModal?.(false);
    setOpenCropperModal(false);
  };

  console.log('LOGO URL ', logoUrl);

  return (
    <Fragment>
      <label
        htmlFor="upload-profile-photo"
        className={
          sector === 'candidate'
            ? styles.img_profile + ' ' + styles.img_profile_candidate
            : styles.img_profile
        }
      >
        {isUploadingEmployerPicture ||
        isUploadingUniversityPicture ||
        isUploadCandidatePicture ? (
          <CircularProgress classes={{ svg: '!border-none !bg-transparent' }} />
        ) : (
          <Fragment>
            <div
              className="group cursor-pointer"
              onClick={() => {
                setShowModal?.(true);
                setOpenCropperModal(true);
              }}
            >
              {sector === 'candidate' ? (
                <Image
                  key={logoUrl}
                  src={logoUrl || defaultLogoUrl}
                  alt={`${logoUrl} upload`}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: '400px',
                    objectFit: 'cover',
                    border: 'unset',
                  }}
                  className="!z-0"
                  priority
                  unoptimized
                />
              ) : (
                <Image
                  key={logoUrl}
                  src={logoUrl || defaultLogoUrl}
                  alt={`${logoUrl} upload`}
                  width={144}
                  height={144}
                  className="!z-0"
                  priority
                  unoptimized
                />
              )}
              <CameraAltOutlinedIcon
                className={`${
                  sector === 'candidate' && styles.icon
                } hidden group-hover:z-30 hover:bg-white group-hover:!block duration-500 ease-in-out`}
              />
            </div>
          </Fragment>
        )}
      </label>
      <ImageCropperModal
        open={sector === 'candidate' ? showModal ?? false : openCropperModal}
        handleClose={handleClose}
        handleSaveProfileImage={handleSaveImage}
        imageCropperType="profile"
      />
    </Fragment>
  );
};

export default UploadProfilePhotoOnly;
