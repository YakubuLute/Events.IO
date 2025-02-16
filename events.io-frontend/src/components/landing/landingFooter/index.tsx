import React from 'react';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { XLogoForLandingPage as TwitterOutlineIcon } from '@/components/shared/SVG-components';
import FacebookOutlineIcon from '@/components/ui/icons/facebookOutlineIcon';
import InstagramIcon from '@/components/ui/icons/instagramIcon';
import LinkdinOutlineIcon from '@/components/ui/icons/linkdinOutlineIcon';
// import TwitterOutlineIcon from '@/components/ui/icons/twiltterOutlineIcon';
import YoutubeOutlineIcon from '@/components/ui/icons/youtubeOutlineIcon';
import TiktokOutlineIcon from '@/components/ui/icons/tiktokOutlineIcon';

const socialMedia = [
  {
    title: 'LINKEDIN',
    icon: <LinkdinOutlineIcon width={24} height={24} />,
    link: 'https://www.linkedin.com/company/vaurse',
  },
  {
    title: 'INSTAGRAM',
    icon: <InstagramIcon width={24} height={24} />,
    link: 'https://www.instagram.com/vaurse1',
  },
  {
    title: 'TWITTER',
    icon: <TwitterOutlineIcon width={24} height={24} />,
    link: 'https://twitter.com/vaurse1',
  },
  {
    title: 'YOUTUBE',
    icon: <YoutubeOutlineIcon width={24} height={24} />,
    link: 'https://www.youtube.com/@vaurse',
  },
  {
    title: 'TIKTOK',
    icon: <TiktokOutlineIcon width={24} height={24} />,
    link: 'https://www.tiktok.com/@vaurse1',
  },
  {
    title: 'FACEBOOK',
    icon: <FacebookOutlineIcon width={24} height={24} />,
    link: 'https://www.facebook.com/vaurse',
  },
];

export default function LandingFooter() {
  return (
    <Box className="fixed bottom-0 left-0 py-3 mt-2 w-full border-t border-t-[#ECECED] bg-white">
      <Box className="flex flex-col md:flex-row justify-between items-center  w-[90%] mx-auto">
        <Typography className="text-[#4F4B5C] text-[13px] font-semibold">
          © {new Date().getFullYear()} Vaurse
        </Typography>
        <Box className="flex items-center">
          {socialMedia.map((media, index) => (
            <IconButton
              key={index}
              LinkComponent={Link}
              href={media.link}
              target="_blank"
              className="text-[#4F4B5C] hover:scale-110 transition-all duration-300 ease-in-out"
            >
              {media.icon}
            </IconButton>
          ))}
        </Box>
        <Box className="flex items-center gap-2">
          <Link href="https://vaurse.com/privacy-policy" target="_blank">
            <Typography className="text-[#4F4B5C] font-semibold text-[13px] hover:text-primary">
              Privacy policy
            </Typography>
          </Link>
          <Link href="https://vaurse.com/terms-of-service" target="_blank">
            <Typography className="text-[#4F4B5C] text-[13px] font-semibold hover:text-primary">
              Terms of use
            </Typography>
          </Link>
          <Link href="https://vaurse.com/referral-terms" target="_blank">
            <Typography className="text-[#4F4B5C] text-[13px] font-semibold hover:text-primary">
              Referral terms
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
