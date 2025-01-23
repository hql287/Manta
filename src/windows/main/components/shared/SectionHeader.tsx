import type React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'

interface ISectionHeaderProps {
  title: string
  description?: string
}

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Stack>
      <Heading size="lg">{title.toUpperCase()}</Heading>
      {description && (
        <Text mb="3" fontSize="sm" color="fg.muted">
          {description}
        </Text>
      )}
    </Stack>
  )
}
