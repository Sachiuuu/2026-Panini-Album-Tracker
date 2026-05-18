import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AlbumState {
  owned: Record<string, true>;
  hasOnboarded: boolean;
  _hasHydrated: boolean;
  toggleOwned: (id: string) => void;
  setOwned: (id: string, value: boolean) => void;
  markOnboarded: () => void;
  resetAll: () => void;
  replaceOwned: (next: Record<string, true>) => void;
  mergeOwned: (next: Record<string, true>) => void;
  setHydrated: (v: boolean) => void;
}

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set, get) => ({
      owned: {},
      hasOnboarded: false,
      _hasHydrated: false,

      toggleOwned: (id) =>
        set((state) => {
          const next = { ...state.owned };
          if (next[id]) delete next[id];
          else next[id] = true;
          return { owned: next };
        }),

      setOwned: (id, value) =>
        set((state) => {
          const next = { ...state.owned };
          if (value) next[id] = true;
          else delete next[id];
          return { owned: next };
        }),

      markOnboarded: () => set({ hasOnboarded: true }),

      resetAll: () => set({ owned: {} }),

      replaceOwned: (next) => set({ owned: { ...next } }),

      mergeOwned: (next) =>
        set((state) => ({ owned: { ...state.owned, ...next } })),

      setHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'panini-2026-tracker-v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: (state) => ({
        owned: state.owned,
        hasOnboarded: state.hasOnboarded,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      migrate: (persistedState, _version) => persistedState as AlbumState,
    },
  ),
);
