enum PLATFORM_ROUTE {
  EMPLOYER = 'employer',
  UNIVERSITY = 'university',
  CANDIDATE = 'candidate',
}

/**
 * @description determine  platform
 * @param pathname based on the route || pathName
 */
export function getCurrentPlatform(pathname: string) {
  // platform identification rules
  const platformIdentificationRules = {
    employer: ['employer'],
    university: ['university'],
    candidate: ['candidate'],
  };

  // get first path
  const splits = pathname?.split('/');

  const firstPath = splits?.filter((split) => !!split)[0]?.toLowerCase();

  // determine path here
  if (platformIdentificationRules?.employer?.includes(firstPath)) {
    return PLATFORM_ROUTE.EMPLOYER as 'employer';
  } else if (platformIdentificationRules?.candidate?.includes(firstPath)) {
    return PLATFORM_ROUTE.CANDIDATE as 'candidate';
  } else if (platformIdentificationRules?.university?.includes(firstPath)) {
    return PLATFORM_ROUTE.UNIVERSITY as 'university';
  }
}
