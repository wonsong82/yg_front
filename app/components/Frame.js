require('./Frame.scss')
import React from 'react'


const Frame = ({ color }) => (
  <div className="Frame">
    <span className="top" style={{backgroundColor:color}} />
    <span className="bottom" style={{backgroundColor:color}} />
    <span className="left" style={{backgroundColor:color}} />
    <span className="right" style={{backgroundColor:color}} />
  </div>
)


export default Frame

