import React, {
  ChangeEvent,
  createRef,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconButton, Typography } from '@mui/material';

import { getFileExtension, truncateString } from '@/utils';
import CancelIcon from '../SVG-components/CancelIcon';
import FilePinIcon from '../SVG-components/FilePinIcon';
import FileUploadIcon from '../SVG-components/FileUploadIcon';
import { errorAlert } from '../toastAlert';
import styles from './styles.module.scss';

type FileTypes =
  | '.jpeg'
  | '.jpg'
  | '.png'
  | '.svg'
  | '.gif'
  | '.pdf'
  | '.xls'
  | '.xlsx'
  | '.json'
  | '.xml'
  | '.docs'
  | '.ppt'
  | '.mp4'
  | '.mp3';

type Props = {
  extensions: FileTypes[];
  onHandleFile: (value: File | null) => void;
  disabled: boolean;
};

const FileInput = ({ extensions, onHandleFile, disabled }: Props) => {
  const containerRef = createRef<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const extension = getFileExtension(file.name) as FileTypes;
      if (
        !extensions.join(',')?.toLowerCase().includes(extension?.toLowerCase())
      ) {
        errorAlert({
          message: `File must be in format ${extensions
            .join(', ')
            .toUpperCase()}`,
        });
      } else {
        setFile(file);
        onHandleFile(file);
      }
    }
  };

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragIn = (e: DragEvent<DataTransfer>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDrag = (e: DragEvent<DataTransfer>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: DragEvent<DataTransfer>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<DataTransfer>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const extension = getFileExtension(file.name) as FileTypes;
      if (
        !extensions.join(',')?.toLowerCase().includes(extension?.toLowerCase())
      ) {
        errorAlert({
          message: `File must be in format ${extensions
            .join(', ')
            .toUpperCase()}`,
        });
      } else {
        setFile(file);
        onHandleFile(file);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      containerRef.current.addEventListener('dragenter', handleDragIn);
      containerRef.current.addEventListener('dragover', handleDrag);
      containerRef.current.addEventListener('dragleave', handleDragOut);
      containerRef.current.addEventListener('drop', handleDrop);
    }
    return () => {
      container?.removeEventListener('dragenter', handleDragIn);
      container?.removeEventListener('dragover', handleDrag);
      container?.removeEventListener('dragleave', handleDragOut);
      container?.removeEventListener('drop', handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        styles.fileInputContainer,
        file && styles.active,
        disabled && styles.disabled,
      ].join(' ')}
      ref={containerRef}
    >
      <FileUploadIcon />
      <Typography className={styles.text}>Drop Document here, or</Typography>
      <button
        className={styles.browseBtn}
        onClick={onUpload}
        disabled={disabled}
      >
        browse
      </button>
      <input
        type="file"
        ref={inputRef}
        className={styles.input}
        onChange={onFileChange}
        accept={extensions.join(', ')}
        disabled={disabled}
      />
      {file ? (
        <div className={styles.fileInfoBox}>
          <div className={styles.infoWrapper}>
            <FilePinIcon />
            {file.name.length > 15 ? (
              <Typography component="span">{`${truncateString(
                file.name,
                15
              )}.${getFileExtension(file.name)}`}</Typography>
            ) : (
              <Typography component="span">{file.name}</Typography>
            )}
          </div>
          <IconButton
            className={styles.iconBtn}
            onClick={() => {
              setFile(null);
              onHandleFile(null);
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

export default FileInput;
