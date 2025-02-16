// Format time as MM:SS
export const formatSecondsToMMSS = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
