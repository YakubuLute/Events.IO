import { errorAlert } from '@/components/shared/toastAlert';

export const sanitizeFile = async (file: File): Promise<File> => {
  if (file.type !== 'application/pdf') {
    errorAlert({ message: 'Invalid file type. Please upload a PDF file.' });
  }

  const pdfData = await readFileAsArrayBuffer(file);

  const sanitizedPdfData = removeMetadata(pdfData);
  const sanitizedFile = new File([sanitizedPdfData], file.name, {
    type: 'application/pdf',
  });

  return sanitizedFile;
};

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
    reader.readAsArrayBuffer(file);
  });
};

export const removeMetadata = (pdfData: ArrayBuffer): Uint8Array => {
  return new Uint8Array(pdfData);
};
