// Libraries
import React, { useEffect, useState } from 'react'
import { create } from 'zustand'

// Components
import RecipientForm from './RecipientForm'
import RecipientsList from './RecipientsList'
import { Section } from '@uiSharedComponents/Section'

import { Button, Fieldset, Input, Stack } from '@chakra-ui/react'
import { Field } from '@uiChakra/field'
import { NativeSelectField, NativeSelectRoot } from '@uiChakra/native-select'
import { NumberInputField, NumberInputRoot } from '@uiChakra/number-input'

// Zustand Store
interface Recipient {
  newRecipient: boolean
  new: Record<string, any>
  select: Record<string, any>
}

interface RecipientState {
  recipient: Recipient
  contacts: Record<string, any>[]
  updateRecipient: (data: Recipient) => void
}

const useRecipientStore = create<RecipientState>((set) => ({
  recipient: {
    newRecipient: true,
    new: {},
    select: {},
  },
  contacts: [],
  updateRecipient: (data) => set({ recipient: data }),
}))

// Component
const Recipient: React.FC = () => {
  const { recipient, contacts, updateRecipient } = useRecipientStore()
  const [localRecipient, setLocalRecipient] = useState<Recipient>(recipient)

  useEffect(() => {
    if (
      !localRecipient.newRecipient &&
      Object.keys(localRecipient.new).length === 0 &&
      Object.keys(localRecipient.select).length === 0
    ) {
      setLocalRecipient({
        newRecipient: true,
        new: {},
        select: {},
      })
    }
  }, [recipient])

  const toggleForm = () => {
    const updatedRecipient = {
      ...localRecipient,
      newRecipient: !localRecipient.newRecipient,
    }
    setLocalRecipient(updatedRecipient)
    updateRecipient(updatedRecipient)
  }

  const updateRecipientForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const updatedRecipient = {
      ...localRecipient,
      new: { ...localRecipient.new, [name]: value },
    }
    setLocalRecipient(updatedRecipient)
    updateRecipient(updatedRecipient)
  }

  const updateRecipientList = (selectedContact: Record<string, any>) => {
    const updatedRecipient = {
      ...localRecipient,
      select: selectedContact,
    }
    setLocalRecipient(updatedRecipient)
    updateRecipient(updatedRecipient)
  }

  const renderComponent = () => {
    if (contacts.length === 0 || localRecipient.newRecipient) {
      return (
        <RecipientForm
          formData={localRecipient.new}
          updateRecipientForm={updateRecipientForm}
        />
      )
    }

    return (
      <RecipientsList
        contacts={contacts}
        selectedContact={localRecipient.select}
        updateRecipientList={updateRecipientList}
      />
    )
  }

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Client</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>

        <Field label="Country">
          <NativeSelectRoot>
            <NativeSelectField
              name="country"
              items={[
                'United Kingdom (UK)',
                'Canada (CA)',
                'United States (US)',
              ]}
            />
          </NativeSelectRoot>
        </Field>
      </Fieldset.Content>
      <NumberInputRoot defaultValue="10" width="200px">
        <NumberInputField />
      </NumberInputRoot>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}

export default Recipient
//<Section>
//<label className="itemLabel">Recipient *</label>
//{renderComponent()}
//{contacts.length > 0 && (
//<div>
//<div className="radio">
//<label>
//<input
//type="radio"
//onChange={toggleForm}
//checked={localRecipient.newRecipient === true}
//value="new"
///>
//Add New Recipient
//</label>
//</div>
//<div className="radio">
//<label>
//<input
//type="radio"
//onChange={toggleForm}
//checked={localRecipient.newRecipient === false}
//value="select"
///>
//Select Existing Recipient
//</label>
//</div>
//</div>
//)}
//</Section>
