import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'


class HoverLink extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      hovered: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
        
  }


  onMouseOver(e){
    e.preventDefault()
    this.setState({hovered: true})
  }

  onMouseOut(e){
    e.preventDefault()
    this.setState({hovered: false})
  }

  setColor(){
    const { textColor, hoverColor } = this.props
    return this.state.hovered ?
      hoverColor : textColor
  }
  
  render() {
    const { children, to, className } = this.props

    return (
      <Link
        to={to}
        className={className}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        style={{color:this.setColor()}}
      >{children}</Link>
    )     
  }
  
}

HoverLink.propTypes = {}



export default HoverLink