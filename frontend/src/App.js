import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Line, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import StarScene from './components/StarScene'

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

const App = () => {

  const [data, setData] = useState([])
  const [objectCount, setObjectCount] = useState(null)
  const [bodies, setBodies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api').then(response => {
      setObjectCount(response.data.objectCount)
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
    console.log(objectCount)
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