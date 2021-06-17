import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import StarScene from './StarScene'
import Ball from './Ball'

const Simulator = ({ data }) => {
  const [bodies, setBodies] = useState([])
  const colorList = ['cyan', 'magenta']
  const style = {
    backgroundColor: 'black',
    width: '100vw',
    height: 'calc(100vh - 40px)'
  }

  useEffect(() => {
    if (data.length) {
      setBodies(data.map((item, index) => (
        <Ball key={item.name} position={[0, 0, 0]} data={item.pos} length={item.length} size={item.size} lineColor={colorList[index]}/>
      )))
    }
  }, [data])

  if (!data.length) return <></>

  return (
    <>
      <Canvas style={style}>
        <OrthographicCamera makeDefault position={[1000, 1000, 1000]} zoom={2} far={10000} />
        <OrbitControls minZoom={1.5}/>
        <axesHelper args={[250]}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <StarScene />
        {bodies}
      </Canvas>
    </>
  )
}

export default Simulator