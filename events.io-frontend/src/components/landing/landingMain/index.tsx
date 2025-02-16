'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useMediaQuery } from 'usehooks-ts';

import RightArrowIcon from '@/components/ui/icons/rightArrowIcon';
import { TPlatformData, platformData } from './constants';
import styles from './landing-main.module.scss';

export default function LandingMain() {
  return (
    <Box className={styles.landingPageContainer}>
      <Typography component="h1" className={styles.landingPageTitle}>
        Empowering Employers, Candidates and Universities - The ultimate
        recruitment and network solution.
      </Typography>

      <Grid container spacing={3} paddingBottom={'8rem'}>
        <Grid item xs={12} md={12}>
          <PlatformCard extend={true} item={platformData[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlatformCard item={platformData[1]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlatformCard item={platformData[2]} />
        </Grid>
      </Grid>
    </Box>
  );
}

const PlatformCard = ({
  extend,
  item,
}: {
  extend?: boolean;
  item: TPlatformData;
}) => {
  const [isExtend, setIsExtend] = useState<boolean>(false);
  const isMobileView = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobileView) {
      setIsExtend(false);
    } else {
      setIsExtend(extend!);
    }
  }, [isMobileView, extend]);

  return (
    <Box
      bgcolor={item.bgColor}
      className={`${styles.platformCard} group ${isExtend ? styles.platformCardExtend : ''}`}
    // className={`rounded-[24px] !p-5 md:!p-10  z-10 hover:opacity-95 group`}
    >
      <Grid container spacing={1} className="relative">
        <Grid item xs={12} md={isExtend ? 7 : 12}>
          <Stack
            direction={{ xs: 'row', md: isExtend ? 'column' : 'row' }}
            justifyContent="space-between"
            gap={2}
          >
            <Box>
              <Typography className="text-white font-semibold text-[1.75rem] md:text-[2rem]">
                {item.title}
              </Typography>
              <Typography className="text-white font-medium text-sm md:text-base">
                {item.description}
              </Typography>
            </Box>
            <IconButton
              className="bg-white hover:bg-white rounded-full p-5 w-[64px] h-[64px] flex justify-center items-center group-hover:scale-110 duration-500 group-hover:transition-all ease-in-out"
              LinkComponent={Link}
              href={item.link}
            >
              <RightArrowIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={isExtend ? 5 : 12}
          className="h-[204px] md:h-[183px] relative"
        >
          <Image
            src={item.imageUrl}
            width={900}
            height={900}
            priority
            alt="Image"
            className={`${isExtend
              ? 'max-w-[400px] h-[240px] min-[915px]:h-[217px]'
              : 'left-[21px] md:left-[41px] h-[200px] object-left-top object-cover -bottom-[21px] md:-bottom-[41px] absolute rounded-br-[24px]'
              } w-full `}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
