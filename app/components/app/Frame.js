require('./Frame.scss')
import React from 'react'


const Frame = ({ color, bgColor }) => (
  <div className="Frame">
    <span className="bottom" style={{backgroundColor:bgColor}} >
      <div className="copyright" style={{color}}>All Rights Reserved @ 2016 YG PRESENTS</div>
    </span>
    <span className="top" style={{backgroundColor:bgColor}} />
    <span className="left" style={{backgroundColor:bgColor}} />
    <span className="right" style={{backgroundColor:bgColor}} />
  </div>
)


export default Frame

