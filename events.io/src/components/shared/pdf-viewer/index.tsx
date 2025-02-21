import React from 'react';
import Iframe from 'react-iframe';

import CustomDialog from '../dialog/CustomDialog';

type Props = {
  url: string;
  open: boolean;
  onClose: VoidFunction;
};

const PdfViewer = ({ onClose, open, url }: Props) => {
  return (
    <CustomDialog open={open} onClose={onClose} title="PDF Viewer" width="lg">
      <Iframe
        url={url}
        width="100%"
        height="800px"
        id=""
        className=""
        display="block"
        position="relative"
      />
    </CustomDialog>
  );
};

export default PdfViewer;
