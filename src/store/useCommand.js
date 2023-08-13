import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initState = {
  commands: [],
  table: '',
};

export const useCommand = create(
  persist(
    (set) => ({
      ...initState,
      resetAll: () =>
        set(() => {
          localStorage.clear();
          return { ...initState };
        }),
      setErrorMessage: (msg) => set(() => ({ errorMessage: msg })),
      setTable: (t) => set(() => ({ table: t })),
      addCommand: (cmm) =>
        set((state) => ({
          commands: [
            {
              command: cmm,
              date: new Date(),
              total: cmm.reduce((a, b) => (a += b.price * b.qtd), 0),
            },
            ...state.commands,
          ],
        })),
    }),
    {
      name: 'command',
    }
  )
);
