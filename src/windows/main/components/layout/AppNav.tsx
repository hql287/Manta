// Libraries
import type React from 'react'
import { useState } from 'react'
import {
  Flex,
  Stack,
  HStack,
  List,
  Text,
  Icon,
  Collapsible,
} from '@chakra-ui/react'
import { ColorModeButton } from '@uiChakra/color-mode'
import { MENUS } from '@uiConstants/menus'
import {
  CircleGauge as DashboardIcon,
  Contact as ClientIcon,
  FileText as InvoiceIcon,
  Package as InventoryIcon,
  Settings as SettingsIcon,
  CornerDownRight as SubmenuIcon,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

// Type definitions for menu items
interface IChildMenuItem {
  label: string
  value: string
  icon?: unknown
}

interface IMenuItem {
  label: string
  value: string
  icon?: React.ElementType
  children?: IChildMenuItem[]
}

interface AppNavProps {
  activePage: string
  changePage: (page: string) => void
}

// Constant menu definitions
const menuItems: IMenuItem[] = [
  {
    label: MENUS.DASHBOARD,
    value: MENUS.DASHBOARD.toLowerCase(),
    icon: DashboardIcon,
  },
  {
    label: MENUS.CLIENTS,
    value: MENUS.CLIENTS.toLowerCase(),
    icon: ClientIcon,
    children: [
      { label: MENUS.ALL_CLIENTS, value: MENUS.ALL_CLIENTS.toLowerCase() },
      { label: MENUS.NEW_CLIENTS, value: MENUS.NEW_CLIENTS.toLowerCase() },
      { label: MENUS.VIEW_CLIENT, value: MENUS.VIEW_CLIENT.toLowerCase() },
    ],
  },
  {
    label: MENUS.INVOICES,
    value: MENUS.INVOICES.toLowerCase(),
    icon: InvoiceIcon,
    children: [
      { label: MENUS.ALL_INVOICES, value: MENUS.ALL_INVOICES.toLowerCase() },
      { label: MENUS.NEW_INVOICE, value: MENUS.NEW_INVOICE.toLowerCase() },
      { label: MENUS.EDIT_INVOICE, value: MENUS.EDIT_INVOICE.toLowerCase() },
      {
        label: MENUS.PREVIEW_INVOICE,
        value: MENUS.PREVIEW_INVOICE.toLowerCase(),
      },
    ],
  },
  {
    label: MENUS.INVENTORY,
    value: MENUS.INVENTORY.toLowerCase(),
    icon: InventoryIcon,
    children: [
      { label: MENUS.ALL_INVENTORY, value: MENUS.ALL_INVENTORY.toLowerCase() },
      { label: MENUS.ADD_INVENTORY, value: MENUS.ADD_INVENTORY.toLowerCase() },
      {
        label: MENUS.EDIT_INVENTORY,
        value: MENUS.EDIT_INVENTORY.toLowerCase(),
      },
    ],
  },
  {
    label: MENUS.SETTINGS,
    value: MENUS.SETTINGS.toLowerCase(),
    icon: SettingsIcon,
    children: [
      {
        label: MENUS.GENERAL_SETTINGS,
        value: MENUS.GENERAL_SETTINGS.toLowerCase(),
      },
      {
        label: MENUS.INVOICE_SETTINGS,
        value: MENUS.INVOICE_SETTINGS.toLowerCase(),
      },
      {
        label: MENUS.CLIENT_SETTINGS,
        value: MENUS.CLIENT_SETTINGS.toLowerCase(),
      },
      {
        label: MENUS.INVENTORY_SETTINGS,
        value: MENUS.INVENTORY_SETTINGS.toLowerCase(),
      },
      {
        label: MENUS.SYSTEM_SETTINGS,
        value: MENUS.SYSTEM_SETTINGS.toLowerCase(),
      },
    ],
  },
]

// Styling constants
const ACTIVE_COLOR = 'blue.500'
const ACTIVE_BG = 'blue.200'
const INACTIVE_COLOR = 'grey.700'
const INACTIVE_BG = 'transparent'
const HOVER_BG = 'blue.200'

/* -------------------------------------------------------------------------- */
/*                        Menu Item Component (no children)                 */
/* -------------------------------------------------------------------------- */
interface MenuItemProps {
  item: IMenuItem
  activeItem: string
  onClick: (value: string) => void
}

const MenuItem: React.FC<MenuItemProps> = ({ item, activeItem, onClick }) => {
  const isActive = activeItem === item.value

  return (
    <HStack
      w="full"
      p="2"
      bg={isActive ? ACTIVE_BG : INACTIVE_BG}
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: HOVER_BG }}
      onClick={() => onClick(item.value)}
    >
      {item.icon && (
        <Icon
          as={item.icon}
          boxSize="5"
          color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      )}
      <Text
        fontWeight={isActive ? 'bold' : 'normal'}
        color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
        fontSize="sm"
      >
        {item.label}
      </Text>
    </HStack>
  )
}

/* -------------------------------------------------------------------------- */
/*                    Menu Item With Children Component                     */
/* -------------------------------------------------------------------------- */
interface MenuItemWithChildrenProps {
  item: IMenuItem
  activeItem: string
  onClick: (value: string) => void
}

const MenuIsOpenedByDefault = true

const MenuItemWithChildren: React.FC<MenuItemWithChildrenProps> = ({
  item,
  activeItem,
  onClick,
}) => {
  const isActive = activeItem === item.value
  const [isOpen, onToggle] = useState<boolean>(false)
  const handleToggle = () => {
    onToggle(!isOpen)
  }

  return (
    <Collapsible.Root
      unmountOnExit
      onOpenChange={handleToggle}
      defaultOpen={MenuIsOpenedByDefault}
    >
      <Collapsible.Trigger
        w="100%"
        p="2"
        bg={isActive ? ACTIVE_BG : INACTIVE_BG}
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: HOVER_BG }}
      >
        <HStack justify="space-between" w="full">
          <HStack>
            {item.icon && (
              <Icon
                as={item.icon}
                boxSize="5"
                color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            )}
            <Text
              fontWeight={isActive ? 'bold' : 'normal'}
              color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              fontSize="sm"
            >
              {item.label}
            </Text>
          </HStack>
          <Icon
            as={MenuIsOpenedByDefault ? ChevronUp : ChevronDown}
            boxSize="5"
            opacity="0.25"
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
          />
        </HStack>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <List.Root mt="2" ml="4" gap="2" variant="plain" align="center">
          {item.children?.map((child) => {
            const childIsActive = activeItem === child.value
            return (
              <List.Item
                key={child.value}
                p="2"
                bg={childIsActive ? ACTIVE_BG : INACTIVE_BG}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: HOVER_BG }}
                onClick={() => onClick(child.value)}
              >
                <List.Indicator
                  asChild
                  color={childIsActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                >
                  <Icon opacity="0.25" as={SubmenuIcon} />
                </List.Indicator>
                <Text
                  fontSize="sm"
                  fontWeight={childIsActive ? 'bold' : 'normal'}
                  color={childIsActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                >
                  {child.label}
                </Text>
              </List.Item>
            )
          })}
        </List.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

/* -------------------------------------------------------------------------- */
/*                              AppNav Component                              */
/* -------------------------------------------------------------------------- */
const AppNav: React.FC<AppNavProps> = ({ activePage, changePage }) => {
  const [activeItem, setActiveItem] = useState(activePage)

  const handleClick = (value: string) => {
    setActiveItem(value)
    changePage(value)
  }

  return (
    <Flex gap="4" direction="column">
      <Stack>
        {menuItems.map((item) =>
          item.children ? (
            <MenuItemWithChildren
              key={item.value}
              item={item}
              activeItem={activeItem}
              onClick={handleClick}
            />
          ) : (
            <MenuItem
              key={item.value}
              item={item}
              activeItem={activeItem}
              onClick={handleClick}
            />
          )
        )}
      </Stack>
      <Stack flex="1">
        <ColorModeButton />
      </Stack>
    </Flex>
  )
}

export default AppNav
