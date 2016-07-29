import React from 'react'


const AnchorLink = ( props ) => {
  let classes = 'AnchorLink'
  if(props.className) classes += ' ' + props.className

  return (
    <a {...props} className={classes}>{props.children}</a>
  )
}


export default AnchorLink

