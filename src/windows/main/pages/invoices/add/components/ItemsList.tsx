import type React from 'react'
import { useEffect } from 'react'
import { create } from 'zustand'
import styled from 'styled-components'
import TransitionList from '@uiSharedComponents/TransitionList'
import { SectionHeader } from '@uiSharedComponents/SectionHeader'
import ItemRow from './ItemRow.jsx'
import { useItemStore } from '@uiMainStore/itemsStore'
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
  Input,
  List,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { NumberInputField, NumberInputRoot } from '@uiChakra/number-input'

export const InvoiceFormItemsList: React.FC = () => {
  const { rows, addItem, removeItem, updateItem } = useItemStore()

  useEffect(() => {
    if (!rows.length) {
      addItem()
    }
  }, [rows.length, addItem])

  const rowsComponent = rows.map((item, index) => (
    <ItemRow
      key={item.id}
      item={item}
      hasHandler={rows.length > 1}
      actions={index !== 0}
      updateRow={(updatedData) => updateItem(item.id, updatedData)}
      removeRow={() => removeItem(item.id)}
      addItem={addItem}
    />
  ))

  return (
    <Box>
      <SectionHeader
        title="Items"
        description="Please provide list of products & services below."
      />

      <Stack>
        <TransitionList componentHeight={50}>{rowsComponent}</TransitionList>
      </Stack>
      <div className="itemsListActions">
        <Button
          variant="subtle"
          colorPalette="blue"
          size="sm"
          onClick={addItem}
        >
          Add Item
        </Button>
      </div>
    </Box>
  )
}
