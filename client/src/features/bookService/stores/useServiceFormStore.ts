import { create } from 'zustand';
import { FormData, ServiceFormState } from '@/features/bookService';

const initialFormState = {
  service: null,
  date: null,
  timeSlot: null,
  technician: null,
  address: null,
  apartment: null,
  city: null,
  state: null,
  zipcode: null,
  cardName: null,
  cardNumber: null,
  cvc: null,
  expiry: null,
  zip: null,
};

export const useServiceFormStore = create<ServiceFormState>(set => ({
  formData: initialFormState,
  reset: () => set({ formData: initialFormState }),
  setFormData: (update: Partial<FormData>) =>
    set(state => ({
      formData: {
        ...state.formData,
        ...update,
      },
    })),
}));
