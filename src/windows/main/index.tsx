import ReactDOM from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from '@uiChakra/color-mode'

import { App } from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <ChakraProvider value={defaultSystem}>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </ChakraProvider>
)
