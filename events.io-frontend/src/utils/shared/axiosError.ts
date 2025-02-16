import { errorAlert } from '@/components/shared/toastAlert';
import { ErrorResponse } from '@/@types/shared/type';

export type ErrorData = {
  message: string;
  errCode: string;
  statusCode: number;
};

export const onAxiosError = (
  error: ErrorResponse,
  setError: (value: string) => void,
  showAlert?: boolean
) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data as ErrorData;
    if (errorData.message) {
      const err = errorData.message;
      setError(err);
      if (showAlert) {
        errorAlert({
          message: err,
        });
      }
    } else {
      const err = JSON.stringify(error.response.data).replace(/\"/g, '');
      setError(err);
    }
  } else if (error.message) {
    const err = JSON.stringify(error.message).replace(/\"/g, '');
    setError(err);
  }
};

export const decodeAxiosError = (error: ErrorResponse) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data as ErrorData;
    if (errorData.message) {
      const err = errorData.message;
      return err;
    } else {
      const err = JSON.stringify(error.response.data).replace(/\"/g, '');
      return err;
    }
  } else if (error.message) {
    const err = JSON.stringify(error.message).replace(/\"/g, '');
    return err;
  } else {
    return '';
  }
};
