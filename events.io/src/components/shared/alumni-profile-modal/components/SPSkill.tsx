import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { CustomSkeleton } from '@/components/shared';
import { TCandidateSkill } from '@/@types/candidate/auth/candidate-auth';
import styles from './SPSkill.module.scss';

interface ProfileSkillsData {
  skills: TCandidateSkill[];
  isLoading?: boolean;
  sector: 'university' | 'employer' | 'candidate';
}

const SPSkill: React.FC<ProfileSkillsData> = ({
  skills,
  isLoading,
  sector,
}) => {
  // console.log('skills', skills, 'isLoading', isLoading);
  // const sortedSkills = skills.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
  let sortedSkills: TCandidateSkill[] = [];

  if (skills && skills.length > 1) {
    const topThreeSkills =
      sector === 'university' ? skills.slice(0, 3) : skills;
    sortedSkills = topThreeSkills.sort((a, b) => b.rating - a.rating);
  }

  // const sortedSkills = skills?.sort((a, b) => b.rating - a.rating);
  // const topThreeSkills = sector === 'university' ? sortedSkills?.slice(0, 3) : sortedSkills;

  return (
    <Box className={styles.skills_container}>
      <Box className={styles.titleTalent}>
        <Box className={styles.talentHeading}>Skills</Box>
        <Box className={styles.lineTitleTalent}></Box>
      </Box>

      <Box className={styles.listSkill}>
        <Box className={styles.listSkillItem}>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="center"
                spacing={1}
              >
                <CustomSkeleton variant="text" height={32} width={50} />
                <CustomSkeleton variant="text" height={32} width={150} />
              </Stack>
            ))
          ) : (
            <ul>
              {sortedSkills?.length > 0 ? (
                sortedSkills?.map((item) => (
                  <Box key={item._id} component="li">
                    <Typography className={styles.content}>
                      {item.title?.toString()}
                    </Typography>
                    <Box className="d-flex" sx={{ mt: '2px' }}>
                      <Box className={styles.skills}>
                        <Typography
                          className={styles.exp}
                          style={{ width: item.rating }}
                        >
                          {item.yearsOfExperience.toString()} years
                        </Typography>
                      </Box>
                      <Typography className={styles.percent}>
                        {item.rating}%
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <li>
                  <Typography className={styles.content}>
                    No Skill Provided
                  </Typography>
                </li>
              )}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SPSkill;
