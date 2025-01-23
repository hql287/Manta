// Contacts.tsx
import React, { useEffect, useCallback } from 'react'
import { create } from 'zustand'
const { ipcRenderer: ipc } = window.electronAPI

// Types
interface ContactType {
  _id: string
  name: string
  email: string
  phone: string
}

// Zustand Store
interface ContactsState {
  contacts: ContactType[]
  addContact: (contact: ContactType) => void
  deleteContact: (contactId: string) => void
  setContacts: (contacts: ContactType[]) => void
}

const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  deleteContact: (contactId) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c._id !== contactId),
    })),
  setContacts: (contacts) => set(() => ({ contacts })),
}))

// Dummy Actions
const InvoicesActions = {
  newInvoiceFromContact: (contact: ContactType) =>
    console.log('New invoice created for:', contact),
}

const openDialog = (options: any, event: string, contactId: string) => {
  ipc.send(event, 0, contactId)
}

// Components
const Contact: React.FC<{
  contact: ContactType
  index: number
  deleteContact: (contactId: string) => void
  newInvoice: (contact: ContactType) => void
}> = ({ contact, deleteContact, newInvoice }) => (
  <tr>
    <td>{contact.name}</td>
    <td>{contact.email}</td>
    <td>{contact.phone}</td>
    <td>
      <button onClick={() => newInvoice(contact)}>New Invoice</button>
      <button onClick={() => deleteContact(contact._id)}>Delete</button>
    </td>
  </tr>
)

const Message: React.FC<{ info?: boolean; text: string }> = ({
  info,
  text,
}) => <div className={`message ${info ? 'info' : ''}`}>{text}</div>

const Table: React.FC<{ hasBorders?: boolean; bg?: boolean }> = ({
  children,
}) => <table>{children}</table>
const THead: React.FC = ({ children }) => <thead>{children}</thead>
const TBody: React.FC = ({ children }) => <tbody>{children}</tbody>
const TH: React.FC<{ actions?: boolean }> = ({ children }) => (
  <th>{children}</th>
)
const TR: React.FC = ({ children }) => <tr>{children}</tr>

const PageWrapper: React.FC = ({ children }) => <div>{children}</div>
const PageHeader: React.FC = ({ children }) => <header>{children}</header>
const PageHeaderTitle: React.FC = ({ children }) => <h1>{children}</h1>
const PageContent: React.FC = ({ children }) => <main>{children}</main>

const Contacts: React.FC = () => {
  const { contacts, deleteContact, setContacts } = useContactsStore()

  const newInvoice = useCallback((contact: ContactType) => {
    InvoicesActions.newInvoiceFromContact(contact)
  }, [])

  const handleDeleteContact = useCallback((contactId: string) => {
    openDialog(
      {
        type: 'warning',
        title: 'Delete Contact',
        message: 'Are you sure you want to delete this contact?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-contact',
      contactId
    )
  }, [])

  const confirmedDeleteContact = useCallback(
    (contactId: string) => {
      deleteContact(contactId)
    },
    [deleteContact]
  )

  useEffect(() => {
    ipc.on('confirmed-delete-contact', (event, index, contactId) => {
      if (index === 0) {
        confirmedDeleteContact(contactId)
      }
    })

    return () => {
      ipc.removeAllListeners('confirmed-delete-contact')
    }
  }, [confirmedDeleteContact])

  useEffect(() => {
    const fetchContacts = async () => {
      const fetchedContacts: ContactType[] = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
      ] // Replace with API call
      setContacts(fetchedContacts)
    }

    fetchContacts()
  }, [setContacts])

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderTitle>Contacts</PageHeaderTitle>
      </PageHeader>
      <PageContent>
        {contacts.length === 0 ? (
          <Message info text="No contacts available." />
        ) : (
          <Table hasBorders bg>
            <THead>
              <TR>
                <TH>Contact</TH>
                <TH>Email</TH>
                <TH>Phone</TH>
                <TH actions>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {contacts.map((contact, index) => (
                <Contact
                  key={contact._id}
                  contact={contact}
                  index={index}
                  deleteContact={handleDeleteContact}
                  newInvoice={newInvoice}
                />
              ))}
            </TBody>
          </Table>
        )}
      </PageContent>
    </PageWrapper>
  )
}

export default Contacts
