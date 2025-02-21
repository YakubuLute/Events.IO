import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

type NoRequestsTemplatesProps = {
  title?: string;
  description?: string;
  imageType?: 'noRequests' | 'noMatches' | 'noOffers';
  altName?: string;
  sx?: SxProps;
  imgClass?: string;
  component?: React.ReactNode;
};

const imageSrc = {
  noRequests: '/assets/svgs/no_requests.svg',
  noMatches: '/assets/svgs/no_matches.svg',
  noOffers: '/assets/svgs/no_offers.svg',
};
export const EmptyRequestsTemplates: React.FC<NoRequestsTemplatesProps> = (
  props
) => {
  const {
    title,
    description,
    imageType = 'noRequests',
    altName,
    sx,
    imgClass,
    component,
  } = props;

  return (
    <Stack sx={sx} alignItems="center" textAlign="center" justifySelf="center">
      <div className={`w-full max-w-[300px] ${imgClass}`}>
        <Image
          src={imageSrc[imageType]}
          alt={altName || ''}
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>
      {title && (
        <Typography
          component="h6"
          className="fs-22 fw-600 mt-5 mb-4 text-auth-primary"
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          component="h6"
          className="fs-16 fw-500 mb-5 text-auth-primary"
        >
          {description}
        </Typography>
      )}
      {component && component}
    </Stack>
  );
};
