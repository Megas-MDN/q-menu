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
      editItem: ({ index, item }) =>
        set((state) => {
          if (index < 0) return;
          return { menu: state.menu.map((m, i) => (i === index ? item : m)) };
        }),
      removeItem: (index) =>
        set((state) => ({ menu: state.menu.filter((_m, i) => i !== index) })),
      addItem: (item) => set((state) => ({ menu: [...state.menu, item] })),
    }),
    {
      name: 'restaurant',
    }
  )
);
