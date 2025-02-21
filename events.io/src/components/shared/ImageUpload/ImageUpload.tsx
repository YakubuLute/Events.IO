import Image from 'next/image';
import { Box } from '@mui/material';
import styles from "./image-upload.module.scss";
import CameraIcon from '@/public/icons/camera.svg';
import { useRef, useState } from 'react';

interface ImageUploadProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box className={styles.upload_box} onClick={() => {
      if (fileRef.current) {
        fileRef.current.click();
      }
    }}>
      {currentFile ? (
        <Image
          alt="Candidate Picture"
          src={URL.createObjectURL(currentFile) as string}
          width={100}
          height={100}
          className={styles.image}
        />
      ) : (
        <Image src={CameraIcon} alt="Camera" />
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleChangeFile}
        ref={fileRef}
      />
    </Box>
  );
}