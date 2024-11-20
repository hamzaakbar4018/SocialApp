import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="flex bg-white justify-center items-center" style={{ height: 'calc(100vh - 32px)' }}>
      <span class="loader">YouTooArt</span>
    </div>
  )
}

export default Loader
