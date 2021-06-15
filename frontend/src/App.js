import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api').then(response =>
      setHello(response.data.this)
    )
  }, [setHello])

  return (
    <div>
      <h1>{hello}</h1>
    </div>
  )
}

export default App
