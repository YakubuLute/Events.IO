import Popover from '@mui/material/Popover';
import styles from './mouse-over-popover.module.scss';

type MouseOverProps = {
  id?: string;
  anchorEl: HTMLButtonElement | null;
  onOpen: boolean;
  onClose: () => void;
  editText?: string;
  deleteText?: string;
  anchorOrigin?: { [key: string]: string | number };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number;
    horizontal: 'left' | 'center' | 'right' | number;
  };
  content: React.ReactNode;
  classHover?: string;
};

export const MouseOverPopover: React.FC<MouseOverProps> = (props) => {
  // const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const {
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    classHover = "popover_verify_by"
  } = props;

  return (
    <>
      <Popover
        id={props.id}
        // sx={{  pointerEvents: 'none' }}
        anchorEl={props.anchorEl}
        open={props.onOpen}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={transformOrigin}
        // onMouseLeave={props.onClose}
        // disableRestoreFocus
        classes={{ root: styles.root_popover, paper: styles[classHover] }}
      >
        <div className={styles.pointer} />
        {props.content}
        {/* <Typography sx={{ p: 1 }}>I use Popover.</Typography> */}
      </Popover>
    </>
  );
}
