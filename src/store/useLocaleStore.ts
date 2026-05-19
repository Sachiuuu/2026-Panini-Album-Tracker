import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Locale = 'es' | 'en' | 'fr';

interface LocaleState {
  locale: Locale;
  _hasHydrated: boolean;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'es',
      _hasHydrated: false,
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'panini-2026-locale',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    },
  ),
);
