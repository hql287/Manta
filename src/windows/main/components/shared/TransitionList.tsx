// Libs
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TransitionListProps {
  children: React.ReactElement[]
  componentHeight: number
}

const TransitionList: React.FC<TransitionListProps> = ({
  children,
  componentHeight,
}) => {
  const variants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: componentHeight, opacity: 1 },
    exit: { height: 0, opacity: 0 },
  }

  return (
    <div>
      <AnimatePresence>
        {children.map((child) => (
          <motion.div
            key={child.key as string}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            style={{ overflow: 'hidden' }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TransitionList
