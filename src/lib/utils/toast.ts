import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  return {
    toast: {
      success: (message: string) => sonnerToast.success(message),
      error: (message: string) => sonnerToast.error(message),
      info: (message: string) => sonnerToast.info(message),
      warning: (message: string) => sonnerToast.warning(message),
      title: (title: string, options?: { description?: string; variant?: 'default' | 'destructive' }) => {
        if (options?.variant === 'destructive') {
          return sonnerToast.error(title, { description: options.description });
        }
        return sonnerToast(title, { description: options?.description });
      }
    }
  };
};
