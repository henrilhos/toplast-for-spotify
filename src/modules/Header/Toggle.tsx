import { motion, SVGMotionProps } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  top: 0.4rem;
  position: relative;

  @media (min-width: 60em) {
    display: none;
  }
`

const Path: React.FC<SVGMotionProps<SVGPathElement>> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
)

const Toggle: React.FC<{ onClick: () => void; open: boolean }> = ({
  onClick,
  open,
}) => (
  <Button onClick={onClick}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        initial={{ d: 'M 2 2.5 L 20 2.5' }}
        animate={{
          d: open ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5',
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        initial={{ opacity: 1 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      />
      <Path
        initial={{ d: 'M 2 16.346 L 20 16.346' }}
        animate={{
          d: open ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346',
        }}
      />
    </svg>
  </Button>
)

export { Toggle }
