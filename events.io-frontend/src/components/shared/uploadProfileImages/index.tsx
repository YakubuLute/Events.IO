import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress } from '@mui/material';

import ImageCropperModal from '@/components/employer/company-profile/image-crop/imageCropperDialog';
import styles from '@/components/employer/company-profile/profile/companyProfile.module.scss';
import { EditIcon } from '@/components/shared/SVG-components';
import { useUploadCandidatePicture } from '@/hooks/candidate';
import {
  useUploadEmployerCoverPhoto,
  useUploadEmployerLogoPicture,
} from '@/hooks/employer/employer-hooks';
import {
  useUploadUniversityCoverPhoto,
  useUploadUniversityProfilePicture,
} from '@/hooks/university';
import { errorAlert, successAlert } from '../toastAlert';

type ProfileProps = {
  sector: 'employer' | 'university' | 'candidate';
  defaultBannerImage?: string | null;
  defaultProfileImage?: string | null;
};

export const UploadProfileImages: React.FC<ProfileProps> = ({
  sector,
  defaultProfileImage,
  defaultBannerImage,
}) => {
  const queryClient = useQueryClient();

  const [coverUrl, setCoverUrl] = useState<string>(defaultBannerImage || '');
  const [logoUrl, setLogoUrl] = useState<string>(defaultProfileImage || '');
  const [defaultCoverUrl, setDefaultCoverUrl] = useState<string>(
    defaultBannerImage || ''
  );
  const [defaultLogoUrl, setDefaultLogoUrl] = useState<string>(
    defaultProfileImage || ''
  );
  const [openCropperModal, setOpenCropperModal] = useState<boolean>(false);
  const [cropperType, setCropperType] = useState<'profile' | 'cover'>('');

  //   University Hook
  const {
    mutateAsync: uploadUniversityCover,
    isPending: isUploadingUniversityCover,
  } = useUploadUniversityCoverPhoto();
  const {
    mutateAsync: uploadUniversityPicture,
    isPending: isUploadingUniversityPicture,
  } = useUploadUniversityProfilePicture();

  // Employer Hook
  const {
    mutateAsync: uploadEmployerCover,
    isPending: isUploadingEmployerCover,
  } = useUploadEmployerCoverPhoto();
  const {
    mutateAsync: uploadEmployerPicture,
    isPending: isUploadingEmployerPicture,
  } = useUploadEmployerLogoPicture();

  // Candidate Hook
  const {
    mutateAsync: uploadCandidatePicture,
    isPending: isUploadCandidatePicture,
  } = useUploadCandidatePicture({
    onSuccess: () => {
      successAlert({ message: 'Photo Upload Successfully' });
    },
    onError: () => {
      errorAlert({ message: 'Sorry there was an error uploading picture' });
    },
    onMutate: () => { },
    onSettled: () => { },
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

  //  for profile image
  const handleSaveProfileImage = async (profileImage: string) => {
    if (!profileImage) {
      return;
    }

    try {
      const formData = new FormData();
      const logoBlob = await fetchImageAsBlob(profileImage);

      formData.append('photo', logoBlob, 'photo.jpg', { type: 'image/jpeg' });

      let response;

      if (sector === 'university') {
        response = await uploadUniversityPicture(formData);
      } else if (sector === 'employer') {
        response = await uploadEmployerPicture(formData);
      }

      if (response?.data) {
        setLogoUrl(profileImage);
        successAlert({ message: 'Profile picture updated successfully!' });

        if (sector === 'university') {
          queryClient.setQueryData(['universityFullProfile', { schoolId: undefined }], (oldData: any) => {
            return {
              ...(oldData || {}),
              profilePicture: `${profileImage}?${new Date().getTime()}`,
            };
          });
        }
      } else {
        errorAlert({
          message: "Sorry, couldn't update your profile picture",
        });
      }
    } catch (error) {
      errorAlert({
        message: error?.response?.data.message || 'Sorry, something went wrong',
      });
      console.error('Error uploading profile photo:', error);
    }
  };

  // for cover image
  const handleSaveCoverImage = async (coverImage: string) => {
    if (!coverImage) {
      return;
    }

    try {
      const formData = new FormData();
      const logoBlob = await fetchImageAsBlob(coverImage);

      formData.append('photo', logoBlob, 'photo.jpg', { type: 'image/jpeg' });

      let response;

      if (sector === 'university') {
        response = await uploadUniversityCover(formData);
      } else if (sector === 'employer') {
        response = await uploadEmployerCover(formData);
      } else if (sector === 'candidate') {
        response = await uploadCandidatePicture(formData);
      }

      if (response?.data) {
        setCoverUrl(coverImage);
        successAlert({ message: 'Cover picture updated successfully!' });
        console.log('response?.data', response?.data);
      } else {
        errorAlert({
          message: "Sorry, couldn't update your cover picture!",
        });
        console.error(
          'Error uploading cover photo:',
          response?.error || 'Unknown error'
        );
      }
    } catch (error) {
      console.error('Error uploading cover photo:', error);
    }
  };

  useEffect(() => {
    if (defaultBannerImage) {
      setDefaultCoverUrl(defaultBannerImage);
    }
    if (defaultProfileImage) {
      setDefaultLogoUrl(defaultProfileImage);
    }
  });

  const handleClose = () => {

    return setOpenCropperModal(false);
  };

  return (
    <>
      <Box className={`${styles.profile_container} ${styles.edit}`}>
        <Box className={`${styles.profile_upload} ${styles.edit}`}>
          <label htmlFor="upload-profile-photo" className={styles.img_profile}>
            {isUploadingEmployerPicture ||
              isUploadingUniversityPicture ||
              isUploadCandidatePicture ? (
              <CircularProgress classes={{ svg: '!border-none' }} />
            ) : (
              <>
                <div
                  className="group cursor-pointer"
                  onClick={() => {
                    setOpenCropperModal(true);
                    setCropperType('profile');
                  }}
                >
                  <Image
                    key={logoUrl}
                    src={logoUrl || defaultLogoUrl}
                    alt={''}
                    width={144}
                    height={144}
                    className=""
                    unoptimized
                  />
                  <CameraAltOutlinedIcon
                    className={`${styles.icon} group-hover:z-30 group-hover:bg-white  duration-500 ease-in-out`}
                  />
                </div>
              </>
            )}
          </label>

          <Image
            key={coverUrl}
            src={coverUrl || defaultCoverUrl}
            alt={''}
            width={1000}
            height={313}
            className={styles.cover_img_bg}
          />

          <label
            htmlFor="upload-cover"
            onClick={() => {
              setOpenCropperModal(true);
              setCropperType('cover');
            }}
          >
            <LoadingButton
              color="secondary"
              startIcon={
                coverUrl ? (
                  <EditIcon width="18" height="18" />
                ) : (
                  <CameraAltOutlinedIcon />
                )
              }
              variant="contained"
              component="span"
              className={styles.upload_photo_input}
              loading={isUploadingEmployerCover || isUploadingUniversityCover}
            >
              {coverUrl ? 'Update Photo' : 'Add Photo'}
            </LoadingButton>
          </label>
        </Box>
      </Box>
      <ImageCropperModal
        open={openCropperModal}
        handleClose={handleClose}
        handleSaveProfileImage={handleSaveProfileImage}
        handleSaveCoverImage={handleSaveCoverImage}
        imageCropperType={`${cropperType}`}
      />
    </>
  );
};

export default UploadProfileImages;
