"use client"
import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

interface CustomCardProps {
  children: ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children }) => {
  const title = React.Children.toArray(children)[0] as React.ReactElement;
  const content = React.Children.toArray(children)[1] as React.ReactElement;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {title}
          </Grid>
          <Grid item xs={4}>
            {content}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
