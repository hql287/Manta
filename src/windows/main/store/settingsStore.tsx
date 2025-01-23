import { create } from 'zustand'

// Zustand store
interface SettingsState {
  currentSettings: {
    profile: Record<string, any>
    general: Record<string, any>
    invoice: Record<string, any>
  }
  savedSettings: {
    profile: Record<string, any>
    general: Record<string, any>
    invoice: Record<string, any>
  }
  updateSettings: (key: string, value: any) => void
  saveSettings: () => void
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  currentSettings: {
    profile: {},
    general: {},
    invoice: {},
  },
  savedSettings: {
    profile: {},
    general: {},
    invoice: {},
  },
  updateSettings: (key, value) =>
    set((state) => ({
      currentSettings: {
        ...state.currentSettings,
        [key]: value,
      },
    })),
  saveSettings: () =>
    set((state) => ({
      savedSettings: { ...state.currentSettings },
    })),
}))
