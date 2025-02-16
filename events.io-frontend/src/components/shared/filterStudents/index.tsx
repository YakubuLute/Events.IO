import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import {
  Accordion,
  AccordionSummary,
  Box,
  Slider,
  Typography,
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Stack } from '@mui/system';
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  loadCandidateJobTitleOptions,
  loadCandidateStudentIndustriesOptions,
  loadCandidateStudentInstitutions,
  loadCandidateStudentJobTypesOption,
  loadCandidateStudentsCountriesOptions,
  loadCandidateStudentsEmploymentOptions,
} from '@/utils/candidate/loadCandidateOptions';
import {
  loadUniversityStudentCredentials,
  loadUniversityStudentIndustriesOptions,
  loadUniversityStudentJobTypesOption,
  loadUniversityStudentsCountriesOptions,
  loadUniversityStudentsEmploymentOptions,
} from '@/utils/university/loadUniversityOptions';
import { TUniversityStudentFilterAlumni } from '@/@types/university/typeSchema';
import {
  classYearDataOption,
  companySizesOption,
  employmentStatusOption,
  experienceLevelOption,
  workplaceOption,
} from '@/constants';
import { yearsOptions } from '@/constants/yearsOptions';
import {
  loadCitiesOptions,
  loadJobTitleOptions,
  loadStatesOptions,
} from '@/utils';
import CustomSelectInput from '../customSelectInput/selectInput';
import CustomSelectMultipleCheckout from '../customSelectMultipleCheckout/customSelectMultipleCheckout';
import { CustomInput } from '../Input/Input';
import SelectAsyncPaginate from '../SelectAsyncPagination/SelectAsyncPagination';
import { CustomFilterRadioCheck } from './CustomFilterRadioCheck';
import CustomStudentDatePicker from './CustomStudentDatePicker';
import styles from './filter-students.module.scss';

const employedDateOptions = [
  {
    label: 'Today',
    value: new Date(),
  },
  {
    label: 'Last 7 Days',
    value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Get 7 Day Ago
  },
  {
    label: 'Last 30 days',
    value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Get 30 Day Ago,
  },
];

interface filterStudentProps {
  control: Control<TUniversityStudentFilterAlumni>;
  watch: UseFormWatch<TUniversityStudentFilterAlumni>;
  setValue: UseFormSetValue<TUniversityStudentFilterAlumni>;
  platform: 'university' | 'candidate';
}

const FilterStudent = ({
  control,
  watch,
  setValue,
  platform,
}: filterStudentProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [jobTypeOption, setJobTypeOption] = useState<[]>([]);

  const watchCountryValue = watch('location.country')?.value;
  const watchStateValue = watch('location.state')?.value;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (platform == 'university') {
      loadUniversityStudentJobTypesOption().then((res) =>
        setJobTypeOption(res)
      );
    } else if (platform == 'candidate') {
      loadCandidateStudentJobTypesOption().then((res) => setJobTypeOption(res));
    }
  }, [platform]);

  return (
    <Box
      className={styles.filterContainer}
      sx={{ display: { xs: 'none', md: 'flex' } }}
    >
      <Box className={styles.filterCard}>
        <Box className={styles.search_wrapper}>
          <Controller
            control={control}
            name="searchBy"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                type="text"
                onChange={onChange}
                value={value}
                startAdornment={<SearchSharpIcon />}
                placeholder="Search"
              />
            )}
          />
        </Box>
        <Box className={styles.filter_accordion_wrapper}>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Graduation Year"
          >
            <Controller
              name="classYears"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelectInput
                  onChange={onChange}
                  value={value}
                  options={yearsOptions}
                  isMulti
                />
              )}
            />
          </CustomAccordion>
          {/* <CustomAccordion expanded={expanded} handleChange={handleChange} label="Qualification">
          <Controller
            control={control}
            name="disciplines"
            render={({ field: { onChange, value } }) => (
              <CustomSelectMultipleCheckout
                control={control}
                name="disciplines"
                onChange={onChange}
                value={value}
                setValue={setValue}
                options={qualificationOption}
              />
            )}
          />
        </CustomAccordion> */}
          {/* <CustomAccordion expanded={expanded} handleChange={handleChange} label="Program">
          <Controller
            name="program"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomSelectInput
                onChange={onChange}
                value={value}
                options={programChipData}
              />
            )}
          />
        </CustomAccordion> */}
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Location"
          >
            <Box>
              <Typography variant="body2" mb={1} color="#4F4B5C">
                Country
              </Typography>

              <Controller
                control={control}
                name="location.country"
                render={({ field: { onChange, value } }) => (
                  <SelectAsyncPaginate
                    loadOptions={
                      platform == 'university'
                        ? loadUniversityStudentsCountriesOptions
                        : loadCandidateStudentsCountriesOptions
                    }
                    onChange={onChange}
                    value={value}
                    placeholder="Select country"
                    isClearable
                  />
                )}
              />
            </Box>
            <Stack
              direction={{
                xs: 'column',
                //   md: 'row',
              }}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={1}
              mb={1}
              mt={2}
            >
              <Box sx={{ width: '100%' }} mb={1}>
                <Typography variant="body2" mb={1} color="#4F4B5C">
                  State / Province
                </Typography>
                <Controller
                  control={control}
                  name="location.state"
                  render={({ field: { onChange, value } }) => (
                    <SelectAsyncPaginate
                      loadOptions={(query, prevOption, rest) =>
                        loadStatesOptions(
                          query,
                          prevOption,
                          rest,
                          watchCountryValue
                        )
                      }
                      onChange={onChange}
                      value={value}
                      placeholder={'Select State'}
                      key={watchCountryValue}
                      isDisabled={!watchCountryValue}
                      fullWidth
                      isClearable
                    />
                  )}
                />
              </Box>
              <Box sx={{ width: '100%' }} mb={1}>
                <Typography variant="body2" mb={1} color="#4F4B5C">
                  City
                </Typography>
                <Controller
                  control={control}
                  name="location.city"
                  render={({ field: { onChange, value } }) => (
                    <SelectAsyncPaginate
                      loadOptions={(query, prevOption, rest) =>
                        loadCitiesOptions(query, prevOption, rest, {
                          country: watchCountryValue,
                          state: watchStateValue,
                        })
                      }
                      onChange={onChange}
                      value={value}
                      placeholder={'Select City'}
                      key={watchStateValue}
                      isDisabled={!watchStateValue}
                      fullWidth
                      isClearable
                    />
                  )}
                />
              </Box>
            </Stack>

            <SliderWrapperStyled>
              <Typography variant="body2" mb={1} color="#4F4B5C">
                Distance
              </Typography>
              <Controller
                control={control}
                name="distance"
                render={({ field: { onChange, value } }) => (
                  <SliderStyled
                    max={1000}
                    min={0}
                    value={value}
                    onChange={onChange}
                    aria-label="Distance"
                    //   defaultValue={}
                    color="primary"
                    valueLabelDisplay="off"
                  />
                )}
              />
              <GridBox>
                <Box>{watch('distance')[0]} /Km</Box>
                <p>-</p>
                <Box>{watch('distance')[1]} /Km</Box>
              </GridBox>
            </SliderWrapperStyled>
          </CustomAccordion>

          {platform === 'university' && (
            <CustomAccordion
              expanded={expanded}
              handleChange={handleChange}
              label="Employment Status"
            >
              <Controller
                control={control}
                name="employmentStatus"
                render={({ field: { onChange, value } }) => (
                  <CustomSelectMultipleCheckout
                    control={control}
                    name="employmentStatus"
                    className="employment_status"
                    onChange={onChange}
                    value={value}
                    setValue={setValue}
                    options={employmentStatusOption}
                  />
                )}
              />
            </CustomAccordion>
          )}

          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Job Title"
          >
            <Controller
              control={control}
              name="jobTitles"
              render={({ field: { onChange, value } }) => (
                <SelectAsyncPaginate
                  loadOptions={
                    platform == 'university'
                      ? loadJobTitleOptions
                      : loadCandidateJobTitleOptions
                  }
                  onChange={onChange}
                  value={value}
                  placeholder={'Select Job'}
                  isMulti
                />
              )}
            />
          </CustomAccordion>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Industry/Field"
          >
            <Controller
              control={control}
              name="industries"
              render={({ field: { onChange, value } }) => (
                <SelectAsyncPaginate
                  loadOptions={
                    platform == 'university'
                      ? loadUniversityStudentIndustriesOptions
                      : loadCandidateStudentIndustriesOptions
                  }
                  onChange={onChange}
                  value={value}
                  placeholder="Select Industry"
                  isMulti
                />
              )}
            />
          </CustomAccordion>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Job Type"
          >
            <Controller
              control={control}
              name="jobTypes"
              render={({ field: { onChange, value } }) => (
                <CustomSelectMultipleCheckout
                  control={control}
                  name="jobTypes"
                  className="employment_status"
                  onChange={onChange}
                  value={value}
                  setValue={setValue}
                  options={jobTypeOption}
                />
              )}
            />
          </CustomAccordion>

          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Experience Level"
          >
            <Controller
              control={control}
              name="experienceLevel"
              render={({ field: { onChange, value } }) => (
                <CustomSelectMultipleCheckout
                  control={control}
                  name="experienceLevel"
                  className="employment_status"
                  onChange={onChange}
                  value={value}
                  setValue={setValue}
                  options={experienceLevelOption}
                />
              )}
            />
          </CustomAccordion>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Salary Range (Annually)"
          >
            <SliderWrapperStyled>
              <Controller
                control={control}
                name="salary"
                render={({ field: { onChange, value } }) => (
                  <SliderStyled
                    max={500000}
                    min={0}
                    value={value}
                    onChange={onChange}
                    aria-label="Salary"
                    color="primary"
                    valueLabelDisplay="off"
                  />
                )}
              />
              <GridBox>
                <div className="salary_amount">
                  AED <span>{watch('salary')[0]}</span>
                </div>
                <p>-</p>
                <div className="salary_amount">
                  AED <span>{watch('salary')[1]}</span>
                </div>
              </GridBox>
            </SliderWrapperStyled>
          </CustomAccordion>

          {platform == 'university' && (
            <CustomAccordion
              expanded={expanded}
              handleChange={handleChange}
              label="Education Level"
            >
              <Controller
                control={control}
                name="credentials"
                render={({ field: { onChange, value } }) => (
                  <SelectAsyncPaginate
                    loadOptions={loadUniversityStudentCredentials}
                    onChange={onChange}
                    value={value}
                    placeholder="Select Level"
                    isMulti
                  />
                )}
              />
            </CustomAccordion>
          )}

          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Company Size"
          >
            <Controller
              control={control}
              name="companySizes"
              render={({ field: { onChange, value } }) => (
                <CustomSelectInput
                  control={control}
                  onChange={onChange}
                  value={value}
                  options={companySizesOption}
                  isMulti
                />
              )}
            />
          </CustomAccordion>

          {platform == 'candidate' && (
            <CustomAccordion
              expanded={expanded}
              handleChange={handleChange}
              label="University"
            >
              <Controller
                control={control}
                name="institutions"
                render={({ field: { onChange, value } }) => (
                  <SelectAsyncPaginate
                    loadOptions={loadCandidateStudentInstitutions}
                    onChange={onChange}
                    value={value}
                    placeholder="Select University"
                    isMulti
                  />
                )}
              />
            </CustomAccordion>
          )}

          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Company"
          >
            <Controller
              control={control}
              name="employers"
              render={({ field: { onChange, value } }) => (
                <SelectAsyncPaginate
                  loadOptions={
                    platform == 'university'
                      ? loadUniversityStudentsEmploymentOptions
                      : loadCandidateStudentsEmploymentOptions
                  }
                  onChange={onChange}
                  value={value}
                  placeholder="Select Company"
                  isMulti
                />
              )}
            />
          </CustomAccordion>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Job Kind"
          >
            <Controller
              control={control}
              name="workspaceType"
              render={({ field: { onChange, value } }) => (
                <CustomSelectMultipleCheckout
                  control={control}
                  name="workspaceType"
                  className="employment_status"
                  onChange={onChange}
                  value={value}
                  setValue={setValue}
                  options={workplaceOption}
                />
              )}
            />
          </CustomAccordion>
          <CustomAccordion
            expanded={expanded}
            handleChange={handleChange}
            label="Date Employed"
          >
            <Controller
              control={control}
              name="employedDate.startDate"
              render={({ field: { onChange, value } }) => (
                <CustomFilterRadioCheck
                  onChange={(e) => {
                    onChange(e.target.value);
                    //   Set End Date Automatically to Today by Selecting the radio
                    setValue('employedDate.endDate', new Date());
                  }}
                  value={value}
                  options={employedDateOptions}
                />
              )}
            />
            <GridBox>
              <CustomStudentDatePicker
                control={control}
                name={`employedDate.startDate`}
                placeholder="Start"
                className={styles.employeDate}
              />
              <p>To</p>
              <CustomStudentDatePicker
                control={control}
                name={`employedDate.endDate`}
                placeholder="End"
                className={styles.employeDate}
              />
            </GridBox>
          </CustomAccordion>
        </Box>
      </Box>
    </Box>
  );
};

const CustomAccordion = ({ label, children, expanded, handleChange }) => {
  return (
    <Accordion
      //   expanded={expanded == label}
      //   onChange={handleChange(label)}
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
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          minHeight: '52px !important',
          borderBottom: '1px solid #F3F3F4',
          '&.Mui-expanded': {
            margin: '0px !important',
            minHeight: '52px',
          },
          '& .MuiAccordionSummary-content': {
            margin: '0px !important',
          },
        }}
      >
        <Typography className={styles.filterTitle}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const SliderStyled = styled(Slider)({
  //   color: '#AA0303',
  '& .MuiSlider-rail': {
    // width: '100%',
    // maxWidth: '100%',
    backgroundColor: '#F3F3F4',
  },
  '& .MuiSlider-thumb': {
    // background: '#FF8181',
  },
  '& .MuiSlider-mark': {
    // backgroundColor: '#AA0303',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#AA0303',
    },
  },
});

const SliderWrapperStyled = styled(Box)({
  maxWidth: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: 5,
});

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  grid-gap: 3px;

  & div {
    border-radius: 8px;
    border: 1px solid #ececed;
    padding: 5px;
  }
  & p {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .salary_amount {
    color: '#B3B1B8';
    font-size: 0.875rem;
    & span {
      font-weight: 600;
    }
  }
`;

export default FilterStudent;
