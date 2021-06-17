import React from 'react'
import { useHistory } from 'react-router-dom'

const MenuBar = () => {
  const history = useHistory()

  const toMainPage = (event) => {
    event.preventDefault()
    history.push('/')
  }

  const toSimulatorPage = (event) => {
    event.preventDefault()
    history.push('/space-simulator')
  }

  return (
    <div className='menubar'>
      <button onClick={toMainPage} className='menubar button mr-2 ml-2 mt-2 mb-2 is-small'>Main page</button>
      <button onClick={toSimulatorPage} className='menubar button mr-2 ml-2 mt-2 mb-2 is-small'>Simulator</button>
    </div>
  )
}

export default MenuBar