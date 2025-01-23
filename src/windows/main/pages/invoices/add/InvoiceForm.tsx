import type React from 'react'
import { useState, useCallback } from 'react'
import Select, { type SingleValue } from 'react-select'
import DatePicker from 'react-datepicker'
import { Save, CircleX, UserRoundPlus, LayoutList } from 'lucide-react'
import { useFormStore } from '@uiMainStore/invoiceFormStore'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'
import { SectionHeader } from '@uiSharedComponents/SectionHeader'
import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Grid,
  GridItem,
  Group,
  Heading,
  Icon,
  Input,
  List,
  Stack,
  Text,
  Textarea,
  For,
  SimpleGrid,
  Tabs,
  createListCollection,
} from '@chakra-ui/react'
import { NativeSelectField, NativeSelectRoot } from '@uiChakra/native-select'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@uiChakra/select'
import { NumberInputField, NumberInputRoot } from '@uiChakra/number-input'
import { Switch } from '@uiChakra/switch'
import 'react-datepicker/dist/react-datepicker.css'

// Components
import { InvoiceFormItemsList } from '@uiMainPages/invoices/add/components/ItemsList'

interface Client {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

const clientList = createListCollection({
  items: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'me@example.com',
      phone: '(415) 867-5309',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '(212) 555-1234',
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '(310) 678-9876',
    },
  ],
})

const currencyOptions = [
  { value: 'USD', label: '🇺🇸 USD - US Dollar' },
  { value: 'EUR', label: '🇪🇺 EUR - Euro' },
  { value: 'GBP', label: '🇬🇧 GBP - British Pound' },
  { value: 'JPY', label: '🇯🇵 JPY - Japanese Yen' },
  { value: 'VND', label: '🇻🇳 VND - Vietnamese Dong' },
  { value: 'CAD', label: '🇨🇦 CAD - Canadian Dollar' },
  { value: 'AUD', label: '🇦🇺 AUD - Australian Dollar' },
  { value: 'CNY', label: '🇨🇳 CNY - Chinese Yuan' },
]

const customFields = [
  { label: 'Invoice ID', value: 'invoiceId' },
  { label: 'Tax ID', value: 'taxId' },
  { label: 'Currency', value: 'currency' },
  { label: 'Discount', value: 'discount' },
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Note', value: 'note' },
]

const customFieldInitialState = {
  invoiceId: false,
  taxId: false,
  currency: false,
  discount: false,
  dueDate: false,
  note: false,
}

export const InvoiceForm: React.FC = () => {
  const {
    currentInvoice,
    clearForm,
    saveFormData,
    toggleField,
    updateFieldData,
    toggleFormSettings,
    updateSavedFormSettings,
  } = useFormStore()

  const [customFieldState, setCustomFieldState] = useState(
    customFieldInitialState
  )

  const handleSwitchChanged = useCallback(
    (field: string) => (details: { checked: boolean }) => {
      setCustomFieldState((customFieldState) => ({
        ...customFieldState,
        [field]: details.checked,
      }))
    },
    []
  )

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [selectedCurrency, setSelectedCurrency] = useState<{
    value: string
    label: string
  } | null>(null)

  const handleCurrencyChange = useCallback(
    (option: SingleValue<{ label: string; value: string }>) => {
      console.log('Selected', option)
      if (option) {
        setSelectedCurrency(option)
      }
    },
    []
  )

  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  //const [newClient, setNewClient] = useState<Client>({ id: 0, firstName: "", lastName: "", email: "", phone: "" });

  const handleClientChange = (selectedOption: { client: Client } | null) => {
    //const client =
    //clientList.find((c) => c.id === selectedOption?.value) || null
    setSelectedClient(client)
  }

  return (
    <>
      {/* HEADER */}
      <Box mb="20">
        <Flex gap="4" justify="space-between">
          <Heading marginEnd="auto">New Invoice</Heading>
          <Group>
            <Button size="xs" colorPalette="red" onClick={clearForm}>
              <CircleX />
              Reset
            </Button>
            <Button size="xs" colorPalette="green" onClick={saveFormData}>
              <Save />
              Save & Preview
            </Button>
          </Group>
        </Flex>
      </Box>

      {/* CUSTOM FIELDS */}
      <Stack align="flex-start" mb="10">
        <SectionHeader
          title="Custom Fields"
          description=" Turn on and off fields you want to include in your invoice"
        />

        <Box
          w="100%"
          bg="gray.100"
          p="5"
          borderRadius="6px"
          border="1px solid rgba(0,0,0,.1)"
        >
          <Grid templateColumns="repeat(4, 1fr)" gap="6">
            {customFields.map((field) => (
              <Switch
                key={field.value}
                colorPalette="green"
                size="sm"
                onCheckedChange={handleSwitchChanged(field.value)}
              >
                {field.label}
              </Switch>
            ))}
          </Grid>
        </Box>
      </Stack>

      {/* CLIENT DETAILS*/}

      <Fieldset.Root size="lg" maxW="100wh">
        <SectionHeader
          title="Client Details"
          description="Please provide your contact details below."
        />

        <Tabs.Root defaultValue="add" variant="outline">
          <Tabs.List>
            <Tabs.Trigger value="add">
              <Icon size="sm">
                <UserRoundPlus />
              </Icon>
              Add New
            </Tabs.Trigger>
            <Tabs.Trigger value="select">
              <Icon size="sm">
                <LayoutList />
              </Icon>
              Select Client
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="add"
            border="1px solid rgba(0,0,0,.1)"
            borderTop="none"
            borderRadius="0 0 6px 6px"
          >
            <Box p="5" pt="0" pb="6" borderRadius="6px">
              <Grid templateColumns="repeat(2, 2fr)" gap="6">
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input placeholder="John" size="sm" />
                  <Field.ErrorText>This is an error text</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input placeholder="Doe" size="sm" />
                  <Field.ErrorText>This is an error text</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input placeholder="me@example.com" size="sm" />
                  <Field.ErrorText>This is an error text</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Phone Number</Field.Label>
                  <Input placeholder="(415) 867-5309" size="sm" />
                  <Field.ErrorText>This is an error text</Field.ErrorText>
                </Field.Root>
              </Grid>
            </Box>
          </Tabs.Content>

          <Tabs.Content
            value="select"
            border="1px solid rgba(0,0,0,.1)"
            borderTop="none"
            borderRadius="0 0 6px 6px"
          >
            <Box p="5" pt="0" borderRadius="6px">
              <SelectRoot
                collection={clientList}
                size="sm"
                onValueChange={() => console.log('Selected:', selectedClient)}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clientList.items.map((client) => (
                    <SelectItem
                      //selected={selectedClient?.id === client.id}
                      key={client.id}
                      item={client.id.toString()}
                      onChange={() => handleClientChange(client)}
                    >
                      {client.firstName} {client.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>
          </Tabs.Content>
        </Tabs.Root>

        <Grid templateColumns="repeat(2, 2fr)" gap="6">
          {/* CUSTOM FIELDS */}
          {customFieldState.invoiceId && (
            <Field.Root>
              <Field.Label>Invoice ID</Field.Label>
              <Input placeholder="#1234565" />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
          )}

          {customFieldState.taxId && (
            <Field.Root>
              <Field.Label>Tax ID</Field.Label>
              <Input placeholder="12-3456789" />
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
          )}

          {customFieldState.currency && (
            <Field.Root>
              <Field.Label>Currency</Field.Label>
              <Box width="100%">
                <Select
                  options={currencyOptions}
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  placeholder="Pick a currency"
                />
              </Box>
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
          )}

          {customFieldState.discount && (
            <Field.Root>
              <Field.Label>Discount %</Field.Label>
              <NumberInputRoot defaultValue="10" width="100%">
                <NumberInputField />
              </NumberInputRoot>
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
          )}

          {customFieldState.dueDate && (
            <Field.Root>
              <Field.Label>Due Date</Field.Label>
              <Box width="100%">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={<Input width="100%" placeholder="Select date" />}
                  dateFormat="dd/MM/yyyy"
                />
              </Box>
              <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
          )}
        </Grid>

        <InvoiceFormItemsList />

        {customFieldState.note && (
          <Field.Root>
            <Field.Label>Note</Field.Label>
            <Textarea placeholder="Comment..." />
            <Field.ErrorText>This is an error text</Field.ErrorText>
          </Field.Root>
        )}
      </Fieldset.Root>
    </>
  )
}

export default _withFadeInAnimation(InvoiceForm)
