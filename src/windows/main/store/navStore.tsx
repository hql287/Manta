import { create } from 'zustand'
import { MENUS } from '@uiConstants/menus'

interface AppState {
  activePage: string
  notifications: { id: string; message: string }[]
  setActivePage: (page: string) => void
  addNotification: (notification: { id: string; message: string }) => void
  removeNotification: (id: string) => void
}

export const useNavStore = create<AppState>((set) => ({
  activePage: MENUS.NEW_INVOICE,
  setActivePage: (page) => set({ activePage: page }),
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
