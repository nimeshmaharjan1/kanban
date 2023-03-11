import { ToastContent, ToastOptions, toast } from 'react-toastify';

export enum Toast {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: Toast, message: ToastContent<string>, autoClose?: number) => {
  const defaultValues = {
    position: 'top-right',
    autoClose: autoClose || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  } as ToastOptions;
  switch (type) {
    case Toast.info:
      toast.info(message, defaultValues);
      break;
    case Toast.error:
      toast.error(message, defaultValues);
      break;
    case Toast.success:
      toast.success(message, defaultValues);
      break;
    default:
      toast(message, defaultValues);
  }
};
