import { create } from 'zustand'

// Zustand Store
interface FormState {
  currentInvoice: {
    dueDate: Record<string, any>
    currency: Record<string, any>
    discount: Record<string, any>
    tax: Record<string, any>
    note: Record<string, any>
    invoiceID: Record<string, any>
    settings: {
      required_fields: Record<string, boolean>
      open: boolean
      editMode: { active: boolean }
    }
    savedSettings: Record<string, any>
  }
  clearForm: () => void
  saveFormData: () => void
  toggleField: (field: string) => void
  updateFieldData: (field: string, value: any) => void
  toggleFormSettings: () => void
  updateSavedFormSettings: (key: string, value: any) => void
}

export const useFormStore = create<FormState>((set) => ({
  currentInvoice: {
    dueDate: {},
    currency: {},
    discount: {},
    tax: {},
    note: {},
    invoiceID: {},
    settings: {
      required_fields: {},
      open: false,
      editMode: { active: false },
    },
    savedSettings: {},
  },
  clearForm: () => set({ currentInvoice: {} as FormState['currentInvoice'] }),
  saveFormData: () => console.log('Saving form data...'),
  toggleField: (field) => console.log(`Toggling field: ${field}`),
  updateFieldData: (field, value) =>
    console.log(`Updating field ${field} with value`, value),
  toggleFormSettings: () => console.log('Toggling form settings'),
  updateSavedFormSettings: (key, value) =>
    console.log(`Updating saved settings ${key} with`, value),
}))
