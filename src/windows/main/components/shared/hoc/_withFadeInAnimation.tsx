// Libs
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const _withFadeInTransition =
  <P extends object>(ComposedComponent: React.ComponentType<P>): React.FC<P> =>
  (props: P) => {
    const wrapperStyle = { height: '100%' }

    return (
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInVariants}
          style={wrapperStyle}
        >
          <ComposedComponent {...props} />
        </motion.div>
      </AnimatePresence>
    )
  }

export default _withFadeInTransition
