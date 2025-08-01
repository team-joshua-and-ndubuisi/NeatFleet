import { FormData } from '@/features/bookService';

export interface ServiceFormState {
  formData: FormData;
  reset: () => void;
  setFormData: (formData: Partial<FormData>) => void;
}
