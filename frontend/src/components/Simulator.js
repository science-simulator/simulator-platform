import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import StarScene from './StarScene'
import Ball from './Ball'
import ManagementBar from './ManagementBar'

const Simulator = ({ data }) => {
  const [step, setStep] = useState(1)
  const [bodies, setBodies] = useState([])
  const colorList = ['cyan', 'magenta']
  const style = {
    backgroundColor: 'black',
    width: '100vw',
    height: 'calc(100vh - 40px)',
    position: 'relative'
  }

  useEffect(() => {
    if (data.length) {
      setBodies(data.map((item, index) => (
        <Ball step={step} key={item.name} position={[0, 0, 0]} data={item.pos} length={item.length} size={item.size} lineColor={colorList[index]}/>
      )))
    }
  }, [data, step])

  if (!data.length) return <></>

  return (
    <>
      <Canvas style={style} >
        <OrthographicCamera makeDefault position={[1000, 1000, 1000]} zoom={2} far={10000} />
        <OrbitControls minZoom={1.5}/>
        <axesHelper args={[250]}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <StarScene />
        {bodies}
      </Canvas>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }} >
        <ManagementBar step={step} setStep={setStep} />
      </div>
    </>
  )
}

export default Simulator