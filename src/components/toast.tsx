import { toast } from 'sonner';

export const SuccessToast = (message: string) => {
  toast.success(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {message}
    </div>,
    {
      style: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
      },
      duration: 3000,
    }
  );
};

export const ErrorToast = (message: string) => {
  toast.error(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {message}
    </div>,
    {
      style: {
        backgroundColor: 'red',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
      },
      duration: 3000,
    }
  );
};
