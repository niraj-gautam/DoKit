import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode } from '@/types';

interface ThemeStore {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update document class
          document.documentElement.classList.remove(state.theme);
          document.documentElement.classList.add(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) =>
        set(() => {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
          return { theme };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
