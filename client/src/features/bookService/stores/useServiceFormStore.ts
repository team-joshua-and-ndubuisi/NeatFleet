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

const fieldOrder = ['service', 'date', 'timeSlot', 'technician'];

export const useServiceFormStore = create<ServiceFormState>(set => ({
  formData: initialFormState,
  reset: () => set({ formData: initialFormState }),
  setFormData: (update: Partial<FormData>) =>
    set(state => {
      const updatedField = Object.keys(update)[0] as keyof FormData;
      const updatedFieldIndex = fieldOrder.indexOf(updatedField);

      const nullifiedFields =
        updatedFieldIndex !== -1
          ? fieldOrder.slice(updatedFieldIndex + 1).reduce<Partial<FormData>>((acc, field) => {
              acc[field as keyof FormData] = null;
              return acc;
            }, {})
          : {};

      return {
        formData: {
          ...state.formData,
          ...update,
          ...nullifiedFields,
        },
      };
    }),
}));
