import { Slide, toast, ToastOptions } from 'react-toastify';

import styles from './toast.module.scss';
import ToastBox, { ToastBoxLoading } from './ToastBox';

interface messageProps {
  position?:
    | 'TOP_CENTER'
    | 'TOP_LEFT'
    | 'TOP_RIGHT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_RIGHT';
  message: string;
}

const toastOptions: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
  icon: false,
  className: styles.toastContainer,
};

export const successAlert = ({
  message,
  position = 'TOP_CENTER',
}: messageProps) =>
  toast.success(<ToastBox message={message} color="success" />, {
    ...toastOptions,
    position: `${toast.POSITION[position]}`,
  });

export const errorAlert = ({
  message,
  position = 'TOP_CENTER',
}: messageProps) =>
  toast.error(<ToastBox message={message} color="error" />, {
    ...toastOptions,
    position: `${toast.POSITION[position]}`,
  });

export const infoAlert = ({ message, position = 'TOP_CENTER' }: messageProps) =>
  toast.info(<ToastBox message={message} color="success" />, {
    position: `${toast.POSITION[position]}`,
    pauseOnHover: true,
  });

// Create React Toastify promise function component
export const promiseToastAlert = ({
  pendingMessage,
  successMessage,
  errorMessage,
  promise,
}) =>
  toast.promise(
    promise,
    {
      pending: {
        render() {
          return <ToastBoxLoading color="success" message={pendingMessage} />;
        },
      },
      success: {
        render() {
          return <ToastBox message={successMessage} color="success" />;
        },
      },
      error: {
        render() {
          return <ToastBox message={errorMessage} color="error" />;
        },
      },
    },
    {
      ...toastOptions,
      position: `${toast.POSITION.TOP_CENTER}`,
      pauseOnHover: true,
    }
  );
