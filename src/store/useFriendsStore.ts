import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FriendProfile {
  id: string;
  name: string;
  importedAt: string;
  missing: string[];
}

interface FriendsState {
  friends: FriendProfile[];
  _hasHydrated: boolean;
  addFriend: (profile: { name: string; missing: string[] }) => void;
  removeFriend: (id: string) => void;
  renameFriend: (id: string, name: string) => void;
  setHydrated: (v: boolean) => void;
}

export const useFriendsStore = create<FriendsState>()(
  persist(
    (set) => ({
      friends: [],
      _hasHydrated: false,

      addFriend: ({ name, missing }) =>
        set((state) => ({
          friends: [
            ...state.friends,
            {
              id: Date.now().toString(36) + Math.random().toString(36).slice(2),
              name,
              importedAt: new Date().toISOString(),
              missing,
            },
          ],
        })),

      removeFriend: (id) =>
        set((state) => ({ friends: state.friends.filter((f) => f.id !== id) })),

      renameFriend: (id, name) =>
        set((state) => ({
          friends: state.friends.map((f) => (f.id === id ? { ...f, name } : f)),
        })),

      setHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'panini-2026-friends-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ friends: state.friends }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
