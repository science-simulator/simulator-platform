import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route, useLocation } from 'react-router-dom'
import MenuBar from './components/Menubar'
import MainPage from './components/MainPage'
import Simulator from './components/Simulator'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [stylePath, setStylePath] = useState('./Universal.css')
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/space-simulator') setStylePath('Simulator.css')
    else setStylePath('Universal.css')
  }, [location])

  useEffect(() => {
    const head = document.head
    const link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = stylePath

    head.appendChild(link)
    console.log(head)
    return () => { head.removeChild(link) }
  }, [stylePath])

  useEffect(() => {
    axios.get('http://localhost:5000/api').then(response => {
      setData(response.data.objects)
    })
  }, [setData])

  return (
    <>
      <MenuBar />
      <Switch>
        <Route path='/space-simulator'>
          <Simulator data={data}/>
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </>
  )
}

export default App