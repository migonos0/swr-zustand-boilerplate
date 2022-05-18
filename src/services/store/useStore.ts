import create from 'zustand';
import {createTestSlice, TestSlice} from './slices/test.slice';

export type GlobalState = TestSlice;

export const useStore = create<GlobalState>((set, get) => {
  return {
    ...createTestSlice(set, get),
  };
});
