'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import styles from './SPWorkExperience.module.scss';
import { CustomButton } from '@/components/shared/Button/Button';
import EditIcon from '@mui/icons-material/Edit';
import { CustomInput } from '@/components/shared/Input/Input';
import { CustomCheckbox } from '@/components/shared/CustomCheckbox/CustomCheckbox';

interface Volunteer {
  img?: string;
  title: string;
  company: string;
  country: string;
  date: string;
  range: string;
  content: string;
  location?:string
}
interface Props {
  value: Volunteer;
  onSave: () => void;
  onCancel: () => void;
}

const SPVolunteer: React.FC<Props> = ({ value, onSave, onCancel }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Box>
      {!isEdit && (
        <Box className={styles.container}>
          <div className={styles.employmentItem}>
            <div className={styles.employmentInfor}>
              <div className={styles.employmentIcon}>
                <Image alt="" src={value['img'] || '/images/volunteer-avatar.svg'} width={30} height={30} />
              </div>
              <div className={styles.employmentDetail + ' b-b'}>
                <div className={styles.iconWrapper}>
                  <p className={styles.employmentTitle}>{value['title']}</p>
                  <EditIcon
                    className={styles.edit}
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                </div>
                <p className={styles.employmentCompany}>
                  {value['company']} <span>• {value['country']}</span>
                </p>
                <p className={styles.employmentDate}>
                  <span>{value['date']} •</span> {value['range']}
                </p>
                <p className={styles.employmentContent}>{value['content']}</p>
              </div>
            </div>
          </div>
        </Box>
      )}
      {isEdit && (
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>Company Name</Typography>
                <CustomInput
                  name="company_name"
                  value={value['company']}
                  type="text"
                  placeholder=""
                  id={'company_name'}
                />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>Designation</Typography>
                <CustomInput
                  name="designation"
                  value={value['title']}
                  type="text"
                  placeholder=""
                  id={'designation'}
                />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>Joining date</Typography>
                <CustomInput
                  name={'joining_date'}
                  value={value['title']}
                  type="text"
                  placeholder=""
                  id={'joining_date'}
                />
              </Box>
              <Box className={styles.formGroup}>
                <CustomCheckbox />
                currently working here
              </Box>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>Leaving date</Typography>
                <CustomInput
                  name="leaving_date"
                  value={value['title']}
                  type="text"
                  placeholder=""
                  id={'leaving_date'}
                />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>Details</Typography>
                <CustomInput
                  name="details"
                  value={value['title']}
                  type="text"
                  placeholder=""
                  id="details"
                  variant="outlined"
                  multiline
                  rows={5}
                />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={styles.formGroup}>
                <Typography className={styles.label}>
                  Company Location
                </Typography>
                <CustomInput
                  name={'company_location'}
                  value={value['location'] as string}
                  type="text"
                  placeholder=""
                  id={''}
                />
              </Box>
            </Grid>
          </Grid>
          <Box className="space" />
          <CustomButton
            type="button"
            buttonClass="cancel"
            label="Cancel"
            textColor="black"
            // color="#f0f2f5"
            onClick={() => {
              setIsEdit(false);
              onCancel();
            }}
          />
          <CustomButton
            type="button"
            buttonClass="save"
            label="Save"
            onClick={() => {
              setIsEdit(false);
              onSave();
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SPVolunteer;
