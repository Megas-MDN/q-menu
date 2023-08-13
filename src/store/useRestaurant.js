import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initState = {
  token: null,
  name: '',
  route: '',
  email: '',
  menu: [],
  tables: [],
  errorMessage: '',
};

export const useRestaurant = create(
  persist(
    (set) => ({
      ...initState,
      resetAll: () =>
        set(() => {
          localStorage.clear();
          return { ...initState };
        }),
      setErrorMessage: (msg) => set(() => ({ errorMessage: msg })),
      setToken: (tkn) => set(() => ({ token: tkn })),
      setName: (n) => set(() => ({ name: n })),
      setRoute: (r) => set(() => ({ route: r })),
      setEmail: (e) => set(() => ({ email: e })),
      setMenu: (m) => set(() => ({ menu: m })),
      setTables: (t) => set(() => ({ tables: t })),
    }),
    {
      name: 'restaurant',
    }
  )
);
