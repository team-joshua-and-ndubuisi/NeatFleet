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

export function stringifyDate(date: Date) {
  const stringDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate()}`;
  return stringDate;
}

export function capitalizeFirstLetter(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function titleCase(words: string) {
  return words.split(' ').map(capitalizeFirstLetter).join(' ');
}
