
import * as React from 'react';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import ButtonSpacing from '../Button/ButtonSpacing';
import styles from './avatar.module.scss';

interface AvatarProps {
  href?: string;
  imgUrl?: string | StaticImageData;
  alt: string;
  avatarClass?: string;
}

export const ImageAvatar: React.FC<AvatarProps> = (props) => {
  const { imgUrl = '/a6.jpg', alt, avatarClass } = props;
  const url = props.href ? props.href : '#';

  function getImgSrc() {
    if (imgUrl) {
      // Convert StaticImageData to URL string
      const imgUrlString =
        typeof imgUrl === 'string' ? imgUrl : (imgUrl as StaticImageData).src;
      return imgUrlString;
    }
  }

  if (url === '#')
    return (
      <ButtonSpacing as="span">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={alt}
            src={getImgSrc()}
            className={avatarClass ? styles[avatarClass] : ''}
          />
        </Stack>
      </ButtonSpacing>
    );
  return (
    <Link href={url}>
      <Stack direction="row" spacing={1}>
        <Avatar
          alt={alt}
          src={getImgSrc()}
          className={avatarClass ? styles[avatarClass] : ''}
        />
      </Stack>
    </Link>
  );
};
