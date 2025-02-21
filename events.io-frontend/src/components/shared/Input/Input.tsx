import { forwardRef, HTMLInputTypeAttribute } from 'react';
import TextField from '@mui/material/TextField';

import styles from './input.module.scss';

interface InputProps {
  id?: string;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | number | null | undefined;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  autoComplete?: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  style?: React.CSSProperties;
  fullWidth?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  variant?: 'outlined' | 'standard' | 'filled';
  inputClass?: string;
  error?: string | boolean | undefined;
  helperText?: string | boolean | undefined;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  helperTextClass?: string;
  inputMode?:
    | 'text'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | undefined;
}

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      required,
      inputClass = 'normal_input',
      startAdornment,
      endAdornment,
      className,
      resize,
      ...rest
    } = props;

    return (
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '12px',
            marginBlock: '3px',
            '&:hover': {
              borderColor: 'transparent',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ECECED',
          },
          '& .Mui-error': {
            textAlign: 'start',
            marginLeft: 0,
          },
        }}
        {...rest}
        ref={ref}
        id={props.id}
        type={props.type}
        style={props.style}
        value={props.value}
        variant={props.variant}
        label={props.label}
        name={props.name}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        size={props.size || 'small'}
        fullWidth={props.fullWidth || true}
        {...(required && { required })}
        onChange={props.onChange}
        onClick={props.onClick}
        onBlur={props.onBlur}
        error={
          typeof props.error === 'boolean' ? props.error : Boolean(props.error)
        }
        autoFocus={props.autoFocus}
        helperText={props.helperText}
        multiline={props.multiline}
        rows={props.rows}
        minRows={props.minRows}
        onKeyDown={props.onKeyDown}
        InputProps={{
          className: styles[inputClass],
          startAdornment: startAdornment,
          endAdornment: endAdornment,
          sx: {
            height: props.multiline ? 'auto' : { xs: 42, sm: 42, md: 42 },
            fontWeight: 500,
          },
          style: { resize: resize },
        }}
        FormHelperTextProps={{
          className: props.helperTextClass ? styles[props.helperTextClass] : '',
        }}
        className={className}
      />
    );
  }
);

CustomInput.displayName = 'CustomInput';
