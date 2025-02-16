import Chip from '@mui/material/Chip';

interface TagStatusProps{
  label: string;
  variant?:  'outlined' | 'filled' | undefined;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  disabled?: boolean;
  onClick?: () => void;
  tagClass?: string;
}

export const TagStatus: React.FC<TagStatusProps> = ({ variant, label, color, disabled, tagClass }) => {
  return (
    <Chip
      label={label}
      variant={variant}
      color={color}
      disabled={disabled}
      className={tagClass}
    />
  );
}