import React, { PropsWithChildren } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';

import styles from './styles.module.scss';

const ShowMore = () => (
  <IconButton aria-label="Expense Status">
    <ExpandMoreIcon />
  </IconButton>
);

type Props = {
  title: string;
};

const CustomAccordion = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <Accordion
      defaultExpanded={false}
      className={styles.accordion}
      sx={{
        '&.MuiPaper-root': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '::before': {
            display: 'none',
          },
        },
        '&.Mui-expanded': {
          margin: '0px !important',
          minHeight: 0,
        },
        '& .MuiButtonBase-root': {
          minHeight: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ShowMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={styles.accordionSummary}
        sx={{
          minHeight: '52px !important',
          borderBottom: '1px solid #E8E8E8',
          '&.Mui-expanded': {
            margin: '0px !important',
            minHeight: '52px',
          },
          '& .MuiAccordionSummary-content': {
            margin: '0px !important',
          },
        }}
      >
        <Typography variant="h4" className={styles.summaryTitle}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails} sx={{ py: 2 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
