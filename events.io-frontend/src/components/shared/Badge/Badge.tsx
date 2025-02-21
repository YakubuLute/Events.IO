import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import styles from './badge.module.scss';

interface BadgePropses {
  count: number | string | undefined;
  invisible?: boolean | undefined;
  name?: string;
  color?: 'primary' | 'secondary' | 'success' | 'default';
  children?: React.ReactNode;
  iconBtnClass?: string | undefined;
  badgeClass?: string;
  variant?: 'dot' | 'standard' | undefined;
  sign?: string;
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 1,
    padding: '0 5px',
    margin: '0',
    // border: `2px solid ${theme.palette.background.paper}`,
  },
}));

export const CustomBadge: React.FC<BadgePropses> = (props) => {
  const {
    count = 0,
    invisible = false,
    name,
    color = 'primary',
    badgeClass,
    iconBtnClass,
    children,
    variant = 'standard',
  } = props;

  return (
    // <IconButton size="medium" aria-label={`show ${count} new ${name}`} className={`${styles.badge_btn} ${iconBtnClass ? styles[iconBtnClass] : ''}`}>
    <IconButton
      size="medium"
      aria-label={`show ${count} new ${name}`}
      sx={{
        '&:hover, &:focus': { backgroundColor: 'transparent' },
        padding: 0,
      }}
      className={iconBtnClass && styles[iconBtnClass]}
    >
      <StyledBadge
        badgeContent={`${count}`}
        invisible={invisible}
        max={999}
        className={badgeClass ? styles[badgeClass] : ''}
        color={color}
        variant={variant}
        showZero
      >
        {children}
      </StyledBadge>
    </IconButton>
  );
};
