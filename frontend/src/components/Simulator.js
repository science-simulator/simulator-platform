import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import Ball from './Ball'
import StarScene from './StarScene'

const Simulator = () => {
  const [bodies, setBodies] = useState([
    <Ball key='First' position={[1.2, 0, 0]} name='First' size={3} />,
    <Ball key='Second' position={[30, 0, 20]} name='Second' size={2} />,
    <Ball key='Third' position={[80, 0, 60]} name='Third' size={2} />
  ])

  const submit = (event) => {
    event.preventDefault()
    const body = event.target
    setBodies(bodies.concat(<Ball
      key={body.name.value}
      position={[Number(body.x.value), Number(body.y.value), Number(body.z.value)]}
      name={body.name.value}
      size={Number(body.size.value)}
    />))
  }

  return (
    <>
      <Canvas style={{ backgroundColor: 'black', width: 1280, height: 720 }} >
        <OrthographicCamera makeDefault position={[1000, 1000, 1000]} zoom={2} far={10000} />
        <OrbitControls minZoom={1.5}/>
        <axesHelper args={[250]}/>
        <StarScene />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {bodies}
      </Canvas>
      <form onSubmit={submit}>
        <h1>New planet</h1>
        <input name='x' />
        <input name='y' />
        <input name='z' />
        <input name='name' />
        <input name='size' />
        <button type='submit'>Add a new planet</button>
      </form>
    </>
  )
}

export default Simulator