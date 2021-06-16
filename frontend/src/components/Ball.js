/* eslint-disable no-unused-vars */
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Ball = ({ position, name, size }) => {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.position.z += 0.01 * (1 + mesh.current.position.x)
    mesh.current.position.x += 0.01 * (1 - mesh.current.position.z)
  })

  return (
    <mesh position={position} ref={mesh} >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={'red'} />
      <Html
        sprite
        transform
        distanceFactor={100}
        position={[10, 0, 0]}
        style={{ color: 'white' }}
      >
        {name}
      </Html>
    </mesh>
  )
}

export default Ball