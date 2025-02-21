import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CustomButton } from '@/components/shared';

import styles from './SubmitReview.module.scss';

interface Props {
  title: string;
  buttonLabel: string;
  description: string;
  onSubmitReview: () => void;
}

export default function SubmitReview({
  title,
  buttonLabel,
  onSubmitReview,
  description,
}: Props) {
  return (
    <Card className={styles.submitReview}>
      <CardContent className={styles.cardWrapper}>
        <Box className={[styles.containerTitle, 'b-b'].join(' ')}>
          <Typography className={styles.title}>{title}</Typography>
        </Box>
        <Box className={styles.containerBody}>
          <Typography className={styles.description}>{description}</Typography>
          <CustomButton
            fullWidth={true}
            label={buttonLabel}
            buttonClass="normal"
            onClick={onSubmitReview}
            type="button"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
