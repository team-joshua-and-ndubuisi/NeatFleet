import { create } from 'zustand';
import { CounterState } from '@/features/counter';

interface CounterStore extends CounterState {
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
}

export const useCounterStore = create<CounterStore>(set => ({
  value: 0,
  increment: () => set(state => ({ value: state.value + 1 })),
  decrement: () => set(state => ({ value: state.value - 1 })),
  incrementByAmount: (amount: number) => set(state => ({ value: state.value + amount })),
}));
