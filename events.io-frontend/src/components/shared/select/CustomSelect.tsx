import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { StaticImageData } from 'next/image';
import styles from './CustomSelect.module.scss';

export interface MenuOption {
  id?: number | null;
  value: string;
  label: string;
  icon?: StaticImageData | string;
  checked?: boolean;
}

interface CustomSelectProps {
  size?: 'medium' | 'small';
  id?: string;
  value: string;
  defaultValue?: string;
  label: string;
  labelId?: string;
  isShrink?: boolean | undefined;
  required?: boolean;
  options: Array<MenuOption>;
  selectClass?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  error?: boolean | undefined;
  multiple?: boolean;
  placeholder?: string;
  menuWidth?: number;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const {
    value,
    label,
    isShrink = false,
    required,
    selectClass = 'selectForm',
    error,
    multiple = false,
    className,
  } = props;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 174,
        width: props.menuWidth || 250,
      },
    },
  };

  // const shouldOverwrite  =  !== "employer"
  // const selectClass = shouldOverwrite ? "selectForm" : "selectFormEmployer"
  return (
    <FormControl  fullWidth size={props.size || 'small'}>
      {label &&
        <InputLabel
          id={props.labelId + '-label'}
          // {...(isShrink ? { shrink: true } : {})}
          classes={{
            root: !isShrink ? styles.input_label_root : styles.input_label,
            focused: !isShrink ? ( !error ? styles.input_label_focus : styles.input_label_focus_error) : '',
            error: !isShrink ? styles.input_label_error : '',
            filled: !isShrink ? styles.input_label_filled : '',
          }}
          >
            { (value === '' || isShrink ) && label }
          </InputLabel>}
      <Select
        {...props}
        id={props.id}
        className={`${styles[selectClass]} ${
          error && styles.error
        } ${className}`}
        classes={{
          select: styles.select_field,
          filled: styles.active_item,
        }}
        labelId={props.labelId + '-label'}
        value={value}
        defaultValue={props.defaultValue}
        label={label}
        onChange={props.onChange}
        MenuProps={MenuProps}
        placeholder={props.placeholder}
        error={error}
        multiple={multiple}
        {...(required && { required })}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
      >
        {props.options &&
          props.options?.map((opt) => {
            return (
              <MenuItem
                key={opt.value}
                value={opt.value}
                classes={{
                  selected: styles.selectedItem,
                  // selected: `${styles.selectedItem} ${selectClass ? styles.selectClass : ''}`,
                  root: styles.menuItem,
                  focusVisible: styles.focusItem,
                }}
              >
                {opt.label ? opt.label : opt.value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};
