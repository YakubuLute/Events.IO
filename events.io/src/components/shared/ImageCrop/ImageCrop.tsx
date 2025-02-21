import Image from 'next/image';
import { Box, Button, CircularProgress } from '@mui/material';
import styles from "./image-crop.module.scss";
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop'
import { CameraAltOutlined } from '@mui/icons-material';
import { getCroppedImg } from '@/utils/cropImage';

interface ImageCropProps {
  isCropped: boolean;
  photo?: File;
  onCropped?: (data: File) => void;
  onRetakeImage?: () => void;
}

export const ImageCrop: React.FC<ImageCropProps> = ({ onRetakeImage, isCropped, photo, onCropped }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
  const [croppedImage, setCroppedImage] = useState<File>()
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    if (isCropped) {
      showCroppedImage();
    }
  }, [isCropped]);

  const showCroppedImage = useCallback(async () => {
    setIsCropping(true);
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(photo!) as string,
        croppedAreaPixels!
      );
      console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
    setIsCropping(false);
  }, [croppedAreaPixels])

  useEffect(() => {
    if (croppedImage && onCropped) {
      onCropped(croppedImage);
    }
  }, [croppedImage]);

  return (
    <div>
      <Box className={styles.upload_box} >
        {(!isCropped && photo) ? (
          <Cropper
            image={URL.createObjectURL(photo) as string}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropSize={{ width: 150, height: 150 }}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <>
            {(!isCropping && croppedImage) ? (<Image
              alt="Candidate Picture"
              src={URL.createObjectURL(croppedImage!) as string}
              width={150}
              height={150}
              className={styles.cropped_img}
            />) : (
              <Box className={styles.loading}>
                <CircularProgress style={{ color: "#0C27BE" }} />
              </Box>
            )}
          </>
        )}
      </Box >
      {isCropped && (<Button className={styles.retake_selfie} onClick={onRetakeImage}><CameraAltOutlined /> Retake Selfie</Button>)}
    </div>
  );
}