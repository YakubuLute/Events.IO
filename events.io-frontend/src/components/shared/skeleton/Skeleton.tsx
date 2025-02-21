import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/system';

interface SkeletonProps {
  animation?: 'pulse' | 'wave' | false;
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text';
  height?: number | string;
  width?: number | string;
  classes?: string;
  // sx?: Array<func | object | bool> | func | object;
  sx?: SxProps;
  children?: React.ReactNode;
}

export const CustomSkeleton: React.FC<SkeletonProps> = (props) => {
  return (
    <Skeleton
      animation={props.animation || 'pulse'}
      variant={props.variant || 'text'}
      height={props.height}
      width={props.width}
      classes={{ root: props.classes }}
      sx={props.sx || { display: 'block', width: '100%' }}
    />
  );
};
