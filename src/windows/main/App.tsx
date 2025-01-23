import type React from 'react'
import { useEffect, useCallback } from 'react'
import AppNav from '@uiMainComponents/layout/AppNav'
import AppMain from '@uiMainComponents/layout/AppMain'
import AppNoti from '@uiMainComponents/layout/AppNoti'
import AppUpdate from '@uiMainComponents/layout/AppUpdate'
import { Flex, Box } from '@chakra-ui/react'
import { useNavStore } from '@uiMainStore/navStore'

const ipc = window.electronAPI.ipcRenderer

export const App: React.FC = () => {
  const {
    activePage,
    notifications,
    setActivePage,
    addNotification,
    removeNotification,
  } = useNavStore()

  const changePage = useCallback(
    (tabName: string) => {
      setActivePage(tabName)
    },
    [setActivePage]
  )

  useEffect(() => {
    // Add Event Listeners
    ipc.on('menu-change-tab', (event, tabName: string) => {
      changePage(tabName)
    })

    ipc.on('menu-form-save', () => {
      // Simulate form save action
      console.log('Form saved')
    })

    ipc.on('menu-form-clear', () => {
      // Simulate form clear action
      console.log('Form cleared')
    })

    ipc.on('menu-form-add-item', () => {
      // Simulate add item action
      console.log('Item added')
    })

    ipc.on('menu-form-toggle-dueDate', () => {
      // Simulate toggle dueDate action
      console.log('Toggled dueDate')
    })

    ipc.on('menu-form-toggle-currency', () => {
      // Simulate toggle currency action
      console.log('Toggled currency')
    })

    ipc.on('menu-form-toggle-vat', () => {
      // Simulate toggle VAT action
      console.log('Toggled VAT')
    })

    ipc.on('menu-form-toggle-discount', () => {
      // Simulate toggle discount action
      console.log('Toggled discount')
    })

    ipc.on('menu-form-toggle-note', () => {
      // Simulate toggle note action
      console.log('Toggled note')
    })

    ipc.on('menu-form-toggle-settings', () => {
      // Simulate toggle settings action
      console.log('Toggled settings')
    })

    ipc.on(
      'save-configs-to-invoice',
      (event, invoiceID: string, configs: Record<string, any>) => {
        console.log(`Saved configs to invoice ${invoiceID}`, configs)
      }
    )

    return () => {
      ipc.removeAllListeners([
        'menu-change-tab',
        'menu-form-save',
        'menu-form-clear',
        'menu-form-add-item',
        'menu-form-toggle-dueDate',
        'menu-form-toggle-currency',
        'menu-form-toggle-discount',
        'menu-form-toggle-vat',
        'menu-form-toggle-note',
        'menu-form-toggle-settings',
        'save-configs-to-invoice',
      ])
    }
  }, [changePage])

  return (
    <Flex h="100vh" bg="#f1f5f9">
      <Box w="250px" p="10" pr="0">
        <AppNav activePage={activePage} changePage={changePage} />
      </Box>
      <Box
        bg="white"
        flex="1"
        p="10"
        ml="10"
        mr="10"
        mt="10"
        border="1px solid rgba(0,0,0,.1)"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
      >
        <AppMain activePage={activePage} />
        <AppUpdate />
        <AppNoti
          notifications={notifications}
          removeNoti={removeNotification}
        />
      </Box>
    </Flex>
  )
}

export default App
