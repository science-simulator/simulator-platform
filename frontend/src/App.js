import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import StarScene from './components/StarScene'
import Ball from './components/Ball'

const App = () => {

  const [data, setData] = useState([])
  const [bodies, setBodies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api').then(response => {
      setData(response.data.objects)
    })
  }, [setData])

  const colorList = ['cyan', 'magenta']

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
      <Canvas style={{ backgroundColor: 'black', width: 1280, height: 720 }} >
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

export default App