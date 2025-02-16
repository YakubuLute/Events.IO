

import CircularProgressMui, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

type CircularProps = {
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: number | string;
  variant?: 'determinate' | 'indeterminate' | 'static';
  value?: number;
  label?: string;
  asLabel?: boolean;
  sx?: SxProps<Theme> | undefined;
}

export const CircularProgress: React.FC<CircularProgressProps & CircularProps> = (props) => {
  return (
    <Box sx={props.sx || { display: 'flex' }}>
      <CircularProgressMui  {...props} />
      {props.asLabel &&
        <Typography
          variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value || 0)} ${props.label || '%'}}`}
        </Typography>
      }
    </Box>
  );
}

{/* { updatesLoading && (
  <Box sx={{ top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', }}>
  <CircularProgress />
</Box>
)} */}
