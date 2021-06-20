import React, { useState } from 'react'
import { ImPlay3, ImPause2, ImBackward2, ImForward3 } from 'react-icons/im'

const ManagementBar = ({ step, setStep }) => {
  const [isPlaying, setPlayingStatus] = useState(true)

  const pause = (event) => {
    event.preventDefault()
    setPlayingStatus(false)
    setStep(0)
  }

  const play = (event) => {
    event.preventDefault()
    setPlayingStatus(true)
    setStep(1)
  }

  const backward = (event) => {
    event.preventDefault()
    if (step > -3) {
      if (step - 1 === 0) setPlayingStatus(false)
      else setPlayingStatus(true)
      setStep(step - 1)
    }
  }

  const forward = (event) => {
    event.preventDefault()
    if (step < 3) {
      if (step + 1 === 0) setPlayingStatus(false)
      else setPlayingStatus(true)
      setStep(step + 1)
    }
  }

  const style = {
    backgroundColor: 'rgb(72, 180, 207)',
    padding: 6,
    marginRight: 10,
    paddingRight: 8.5,
    paddingLeft: 8,
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderLeftStyle: 'solid',
    borderWidth: 2,
    borderColor: 'grey'
  }

  return (
    <>
      <label style={style}>
        <ImBackward2 style={{ marginBottom: -5, padding: 4, fontSize: 25, backgroundColor: 'white', marginRight: 10 }} onClick={backward} />
        {!isPlaying &&
          <ImPlay3 style={{ marginBottom: -5, padding: 4, fontSize: 25, backgroundColor: 'white' }} onClick={play} />
        }
        {isPlaying &&
          <ImPause2 style={{ marginBottom: -5, padding: 4, fontSize: 25, backgroundColor: 'white' }} onClick={pause} />
        }
        <ImForward3 style={{ marginBottom: -5, padding: 4, fontSize: 25, backgroundColor: 'white', marginLeft: 10 }} onClick={forward} />
      </label>
      <button className='managementbar but mr-2 ml-2 mt-2 mb-2 is-small'>Create simulation</button>
    </>
  )
}

export default ManagementBar