import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

//to handle combining class names with tailwind and clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//to create a local store with zustand and persist it to localStorage by passing store instance and store name
export function createLocalPersistStore<T>(stateCreater: StateCreator<T>, storeName: string) {
  return create(
    persist<T>(stateCreater, {
      name: storeName,
      storage: createJSONStorage(() => localStorage),
    })
  );
}

export function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  const correctDate = new Date(year, month - 1, day);
  return correctDate;
}
