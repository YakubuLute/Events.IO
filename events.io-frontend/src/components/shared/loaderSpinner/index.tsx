import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/system';

import loaderFile from '@/public/gifs/preloader-without-bg.gif';

export default function LoaderSpinner() {
  return (
    <Box className="absolute right-0 top-0 bottom-0 left-0 w-full h-full flex items-center justify-center">
      <Image
        src={loaderFile}
        width={700}
        height={700}
        alt="Gift"
        className="w-24 h-auto"
        priority
      />
    </Box>
  );
}
