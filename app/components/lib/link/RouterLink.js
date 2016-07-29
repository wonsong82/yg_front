import React from 'react'
import { Link } from 'react-router'


const RouterLink = ( props ) => {
  let classes = 'RouterLink'
  if(props.className) classes += ' ' + props.className

  return (
    <Link {...props} className={classes}>{props.children}</Link>
  )
}


export default RouterLink

