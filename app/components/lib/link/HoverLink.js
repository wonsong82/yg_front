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
        $(findDOMNode(this)).velocity('stop',true).velocity({color:hoverColor}, {easing:'easeOutQuad', duration:500})
        break;
      case false:
        $(findDOMNode(this)).velocity('stop',true).velocity({color:textColor}, {easing:'easeOutQuad', duration:500})
    }

  }

  onMouseEnter(e){
    e.preventDefault()
    this.setState({hovered: true})
    this.props.onMouseEnter()
  }

  onMouseLeave(e){
    e.preventDefault()
    this.setState({hovered: false})
    this.props.onMouseLeave()
  }

  hoverColor(){
    const { textColor, hoverColor } = this.props
    return this.state.hovered ?
      hoverColor : textColor
  }

  onLinkClick(){
    this.props.onClick()
  }

  render() {
    const { children, to, className, textColor } = this.props
    let classes = 'HoverLink'
    if(className) classes += ' ' + className

    return (
      <Link
        style={{color: textColor}}
        to={to}
        className={classes}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onClick={this.onLinkClick.bind(this)}
      >{children}</Link>
    )
  }

}



export default HoverLink