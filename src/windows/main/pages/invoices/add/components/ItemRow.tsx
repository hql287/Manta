// Libraries
import type React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grip, Trash2 } from 'lucide-react'

import {
  Box,
  Grid,
  Flex,
  Group,
  Input,
  InputAddon,
  Stack,
  Text,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { NumberInputField, NumberInputRoot } from '@uiChakra/number-input'

interface ItemRowProps {
  actions: boolean
  addItem: () => void
  hasHandler: boolean
  item: unknown
  removeRow: (id: string) => void
  updateRow: (data: unknown) => void
}

// Component
export const ItemRow: React.FC<ItemRowProps> = ({
  actions,
  addItem,
  hasHandler,
  item,
  removeRow,
  updateRow,
}) => {
  const [state, setState] = useState({
    id: item.id,
    description: item.description || '',
    price: item.price || '',
    quantity: item.quantity || '',
    subtotal: item.subtotal || '',
  })

  useEffect(() => {
    updateSubtotal()
  }, [state.price, state.quantity])

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      addItem()
    }
  }

  const handleTextInputChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleNumberInputChange = (event) => {
    const { name, value } = event.target
    const parsedValue = value === '' ? '' : parseFloat(value)
    setState((prevState) => ({ ...prevState, [name]: parsedValue }))
  }

  const updateSubtotal = () => {
    const { price, quantity } = state
    const currentSubtotal =
      price && quantity ? parseFloat(price) * parseFloat(quantity) : ''
    setState((prevState) => ({ ...prevState, subtotal: currentSubtotal }))
    uploadRowState()
  }

  const uploadRowState = () => {
    updateRow(state)
  }

  const removeCurrentRow = () => {
    removeRow(state.id)
  }

  return (
    <Flex gap="4">
      {hasHandler && (
        <Flex alignItems="center">
          <Icon fontSize="sm" color="gray.300" size="sm">
            <Grip />
          </Icon>
        </Flex>
      )}
      <Grid templateColumns="3fr 120px 80px 1fr" gap="4" w="100%">
        <Input
          placeholder="Description"
          size="sm"
          onChange={handleTextInputChange}
          onKeyDown={handleKeyDown}
        />
        <Stack>
          <Group attached>
            <InputAddon>USD</InputAddon>
            <Input
              placeholder="99"
              size="sm"
              onChange={handleNumberInputChange}
              onKeyDown={handleKeyDown}
            />
          </Group>
        </Stack>

        <NumberInputRoot defaultValue="1" min={1} size="sm">
          <NumberInputField
            onChange={handleNumberInputChange}
            onKeyDown={handleKeyDown}
          />
        </NumberInputRoot>
        <Flex alignItems="center" justify="center">
          <Text fontSize="sm" color="gray.600" textAlign="end">
            Price
          </Text>
        </Flex>
      </Grid>

      {(actions || hasHandler) && (
        <Flex alignItems="center" justify="center" w="40px">
          {actions && (
            <IconButton
              colorPalette="red"
              variant="subtle"
              size="sm"
              aria-label="Search database"
              onClick={removeCurrentRow}
            >
              <Trash2 />
            </IconButton>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default ItemRow
