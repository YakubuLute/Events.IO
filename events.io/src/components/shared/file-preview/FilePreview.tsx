/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Close, PictureAsPdf } from '@mui/icons-material';

import { Attachment } from '@/@types/shared/chat';

interface FilePreviewProps {
  fileType: string;
  fileUrl: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  onClick?: (data: Attachment) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileType,
  onClose,
  fileUrl,
  showCloseButton = false,
  onClick,
}) => {
  const renderFilePreview = () => {
    if (fileType?.includes('image')) {
      return (
        <img
          className="rounded-lg object-contain "
          src={fileUrl || ''}
          height={125}
          width={125}
          alt="Image Preview"
        />
      );
    } else if (fileType?.includes('audio'))
      return <audio controls src={fileUrl} />;
    else if (fileType?.includes('pdf'))
      return <PictureAsPdf fontSize="large" htmlColor="red" />;
    else if (fileType?.includes('video'))
      return <video controls src={fileUrl} />;
    else null;
  };

  return (
    <div
      onClick={() =>
        onClick && onClick({ mimetype: fileType || '', url: fileUrl || '' })
      }
      className="relative border rounded-lg cursor-pointer w-fit bg-black p-2"
    >
      {renderFilePreview()}
      {showCloseButton && (
        <button
          onClick={onClose}
          className="rounded-full h-6 w-6 flex justify-center items-center bg-white absolute top-[2px] right-[2px] mb-16"
        >
          <Close fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default FilePreview;
