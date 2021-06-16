import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Line } from '@react-three/drei'

const Ball = ({ position, size, data, length, lineColor }) => {
  const mesh = useRef()
  const line = useRef()
  let counter = 0

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    mesh.current.position.x = data[counter][0]
    mesh.current.position.y = data[counter][1]
    mesh.current.position.z = data[counter][2]
    line.current.geometry.instanceCount = counter
    counter = counter + 1
    if (counter > length - 1) counter = 0
  })
  return (
    <>
      <mesh position={position} ref={mesh} >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <Line
        points={data}
        color={lineColor}
        ref={line}
      />
    </>
  )
}

export default Ball