import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Line } from '@react-three/drei'

let counter = 0

const Ball = ({ position, size, data, length, lineColor, step }) => {
  const mesh = useRef()
  const line = useRef()

  // eslint-disable-next-line no-unused-vars
  useFrame(state => {
    mesh.current.position.x = data[counter][0]
    mesh.current.position.y = data[counter][1]
    mesh.current.position.z = data[counter][2]
    line.current.geometry.instanceCount = counter
    counter = counter + step
    if (counter < 0) counter = length - 1
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