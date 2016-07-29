require('./MenuButton.scss')
import React from 'react'


const MenuButton = ({ close, color }) => {
  let c = close? 'MenuButton close' : 'MenuButton'

  return (
    <div className={c}>
      <span className="top" style={{backgroundColor:color}} />
      <span className="middle" style={{backgroundColor:color}} />
      <span className="bottom" style={{backgroundColor:color}} />
    </div>
  )
}

export default MenuButton

