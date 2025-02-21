import React, { useState } from 'react';
import Image from 'next/image';
import { Close } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { CustomButton } from '../Button/Button';
import { DeleteIcon, UploadCloudIcon } from '../SVG-components';
import styles from './draganddropfile.module.scss';

interface DragAndDropProps {
  fileType: string | null;
  fileUrl: string | undefined;
  handleClose?: () => void;
  handleUpload?: (e: any) => void;
  handleOnInputFileChange: (e:any) => void;
  handleDragOver?: (e: any) => void;
  handleDrop?: (e: any) => void;
  handleDeleteImage: (index: number) => void;
  uploadedFiles: any;
  activeImage: string | null;
  setImageActive: (e: string | null) => void;
  caption:string|number;
  setCaption: (e: string | number) => void;
  setFileUrl: (e: string) => void;
}

const DragAndDropModal: React.FC<DragAndDropProps> = ({
  fileType,
  handleClose,
  fileUrl,
  setFileUrl,
  handleUpload,
  handleDragOver,
  handleDrop,
  uploadedFiles,
  activeImage,
  setImageActive,
  handleOnInputFileChange,
  caption,
  handleDeleteImage,
  setCaption,
}) => {
  // const [imageActive, setImageActive] = useState<string>('');
  const [imageIndex, setImageIndex] = useState<number>(0);
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

 // Updated handleDeleteImage function
 const onDeleteClick = () => {
  if (fileUrl) {
    const imageList = fileUrl.split(',');
    imageList.splice(imageIndex, 1);
    const updatedImageList = imageList.join(',');
    setFileUrl(updatedImageList);
    if (imageList.length > 0) {
      setImageActive(imageList[0]);
    } else {
      setImageActive(null);
    }
   setCaption('');
    handleDeleteImage(imageIndex); 
  }
};

  const renderFilePreview = () => {
    const sourceImg =
    activeImage || (uploadedFiles && URL.createObjectURL(uploadedFiles[0])) || fileUrl;

    if (sourceImg) {
      return (
        <Image
          className={styles.renderedImage}
          src={ sourceImg }
          height={150}
          width={125}
          alt="Image Preview"
        />
      );
    } else {
      return (
        <div className={styles.errorText}>
          Only images are allowed. Please upload a valid image file.
        </div>
      );
    }
  };


  const renderImageList = () => {
    if (!fileUrl) return null;
    const imageList = fileUrl.split(',');
    return imageList.map((image, index) => (
      <Image
        key={index}
        className={styles.renderedImageList}
        src={image}
        loading="lazy"
        height={50}
        width={70}
        alt="Image List Preview"
        onClick={() => {
          setImageIndex(index);
          return setImageActive(image);
        }}
      />
    ));
  };
  return (
    <div className={styles.draganddropContainer}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3>Upload Image</h3>
          <div className="close_button">
            <CustomButton
              startIcon={<Close />}
              className={styles.closeButton}
              onClick={handleClose}
            />
          </div>
        </div>

        <div
          className={styles.modalBody}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={styles.uploadField}>
            <div className={styles.dropZone}>
              {fileUrl ? (
                <div className={styles.uploadField_preview}>
                  <div className={styles.uploadField_preview_wrapper}>
                    <div className={styles.activeImage}>
                      {renderFilePreview()}
                    </div>
                    <div className={styles.imageListPreview}>
                      {renderImageList()}
                    </div>
                  </div>
                  <CustomButton
                    startIcon={<DeleteIcon />}
                    className={`${styles.closeButton} ${styles.deleteButton}`}
                    onClick={ onDeleteClick}
                  />
                </div>
              ) : (
                <div className={styles.upload_image_wrapper}>
                  <div className={styles.uploadIcon}>
                    <UploadCloudIcon />
                  </div>
                  <Stack direction={'row'} alignItems={'center'}>
                    {' '} 
                    <p className={styles.text}>Drop photos here or</p>
                    <label
                      htmlFor="upload-photo"
                      className={`${styles.text} ${styles.browse_btn}`}
                    >
                      browse
                      <input
                        title="photo"
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        className={styles.input_file}
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleOnInputFileChange}
                      />
                    </label>
                  </Stack>
                  <p className={styles.support_type_text}>
                    supports PNG,JPG,JPEG
                  </p> 
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.input_group}>
            <label htmlFor="caption">Add Caption</label>
            <input type="text" placeholder="Caption"  onChange={handleCaptionChange}/>
            <CustomButton
              label="Upload Image"
              onClick={handleUpload}
              className={`${styles.uploadButton} ${
                fileUrl && styles.uploadButtonActive
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropModal;
