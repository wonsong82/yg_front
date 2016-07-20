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

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.hovered != this.state.hovered
  }

  componentDidUpdate() {
    this.handleTransition()
  }

  handleTransition() {
    const { textColor, hoverColor } = this.props
    switch(this.state.hovered){
      case true:
        $(findDOMNode(this)).stop().velocity({color:hoverColor}, {easing:'easeOutQuad', duration:300})
        break;
      case false:
        $(findDOMNode(this)).stop().velocity({color:textColor}, {easing:'easeOutQuad', duration:300})
    }

  }

  onMouseOver(e){
    e.preventDefault()
    console.log('over')
    this.setState({hovered: true})
  }

  onMouseOut(e){
    e.preventDefault()
    console.log('out')
    this.setState({hovered: false})
  }

  hoverColor(){
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
      >{children}</Link>
    )     
  }
  
}

HoverLink.propTypes = {}



export default HoverLink