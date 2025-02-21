'use client';

import { useState } from 'react';

export type imageObj = {
  [key: string]: string;
};

export const useFileUpload = () => {
  const [imageUrl, setImageUrl] = useState<imageObj | null>(null);

  const handleFileUpload = (file: File, type: string) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImageUrl({ ...imageUrl, [type]: reader.result || '' });
      }
    };
    reader.readAsDataURL(file);
  };

  return { imageUrl, handleFileUpload };
};

// Convert a file to base64 string
export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};
