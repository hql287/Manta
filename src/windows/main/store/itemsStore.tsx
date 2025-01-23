import { create } from 'zustand'

interface Item {
  id: string
  [key: string]: unknown
}

interface ItemStore {
  rows: Item[]
  addItem: () => void
  removeItem: (id: string) => void
  updateItem: (id: string, updatedData: Partial<Item>) => void
}

export const useItemStore = create<ItemStore>((set) => ({
  rows: [],
  addItem: () =>
    set((state) => ({
      rows: [
        ...state.rows,
        { id: Date.now().toString(), name: '', quantity: 0, price: 0 },
      ],
    })),
  removeItem: (id) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
  updateItem: (id, updatedData) =>
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, ...updatedData } : row
      ),
    })),
}))
