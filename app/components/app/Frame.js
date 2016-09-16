require('./Frame.scss')
import React from 'react'


const Frame = ({ color, bgColor }) => (
  <div className="Frame">
    <span className="bottom" style={{backgroundColor:bgColor}} />
    <span className="top" style={{backgroundColor:bgColor}} />
    <span className="left" style={{backgroundColor:bgColor}} />
    <span className="right" style={{backgroundColor:bgColor}} />
  </div>
)


export default Frame

