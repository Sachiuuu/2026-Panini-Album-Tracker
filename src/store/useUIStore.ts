import { create } from 'zustand';
import { FilterMode } from '../components/FilterSegmented';

interface UIState {
  stickerFilter: FilterMode;
  setStickerFilter: (mode: FilterMode) => void;
}

// Session-only store (not persisted). Keeps UI choices like the active filter
// alive when the user navigates between team pages.
export const useUIStore = create<UIState>()((set) => ({
  stickerFilter: 'all',
  setStickerFilter: (mode) => set({ stickerFilter: mode }),
}));
