import { Stars } from '@react-three/drei'
import React from 'react'

const StarScene = () => {
  return (
    <Stars
      radius={500}
      depth={2000}
      count={20000}
      factor={200}
      saturation={0}
      fade
    />
  )
}

export default StarScene