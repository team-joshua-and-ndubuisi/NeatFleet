import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData, ServiceFormState } from '@/features/bookService';

const initialFormState: FormData = {
  service: null,
  date: null,
  timeSlot: null,
  technician: null,
  address: null,
  apartment: null,
  city: null,
  state: null,
  zipcode: null,
};

const fieldOrder = ['service', 'date', 'timeSlot', 'technician'];

export const useServiceFormStore = create<ServiceFormState>()(
  persist(
    set => ({
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
    }),
    {
      name: 'service-form-storage', // key for localStorage
      partialize: state => ({ formData: state.formData }), // only persist the formData
    }
  )
);
