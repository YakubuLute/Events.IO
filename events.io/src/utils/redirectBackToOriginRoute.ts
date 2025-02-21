export const redirectOriginUrl = (
  pathname: string,
  searchParams: URLSearchParams
): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const queryParams = searchParams.toString();

  const originalPath = pathSegments.join('/');

  let originPathUrl = '';
  if (originalPath && queryParams) {
    originPathUrl = `from=${originalPath}&${queryParams}`;
  } else if (originalPath) {
    originPathUrl = `from=${originalPath}`;
  } else if (queryParams) {
    originPathUrl = queryParams;
  }

  return originPathUrl;
};
