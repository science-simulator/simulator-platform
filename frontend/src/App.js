import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import StarScene from './components/StarScene'

const Ball = ({ position, size, data, length }) => {
  const mesh = useRef()
  let counter = 0
  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    mesh.current.position.x = data[counter][0]
    mesh.current.position.y = data[counter][1]
    mesh.current.position.z = data[counter][2]
    counter = counter + 1
    if (counter > length - 1) counter = 0
  })

  return (
    <mesh position={position} ref={mesh} >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  )
}

const App = () => {

  const [data, setData] = useState([])
  const [size, setSize] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api').then(response => {
      setSize(response.data.size)
      setData(response.data.pos)
    })
  }, [setData])

  if (!data) return <></>

  return (
    <>
      <Canvas style={{ backgroundColor: 'black', width: 1280, height: 720 }} >
        <OrthographicCamera makeDefault position={[1000, 1000, 1000]} zoom={2} far={10000} />
        <OrbitControls minZoom={1.5}/>
        <axesHelper args={[250]}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <StarScene />
        {data.length &&
          <Ball position={[0, 0, 0]} size={2} data={data} length={size} />
        }
      </Canvas>
    </>
  )
}

export default App



/*
<div>
      <h1>
        {data.map((value, index) =>
          <div key={index}>
            {value.map((item, id) =>
              <label key={1000*index + id} style={{ padding: 10, color: 'red' }}>{item}</label>
            )}
          </div>
        )}
      </h1>
    </div>
    */