require('./ScrollArea.scss')
import ReactScrollbarScrollArea from 'react-scrollbar/dist/no-css'


import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'


class ScrollArea extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $(findDOMNode(this)).on('DOMMouseScroll mousewheel', this.disableOtherScrolls.bind(this))
  }

  componentDidUpdate() {
    $(findDOMNode(this)).off('DOMMouseScroll mousewheel', this.disableOtherScrolls.bind(this))
  }

  componentWillUnmount() {
    $(findDOMNode(this)).off('DOMMouseScroll mousewheel', this.disableOtherScrolls.bind(this))
    $(findDOMNode(this)).on ('DOMMouseScroll mousewheel', this.disableOtherScrolls.bind(this))
  }

  disableOtherScrolls(e) {
    let $this         = $('.scrollarea-content', findDOMNode(this)),
        scrollTop     = $this[0].scrollTop,
        scrollHeight  = $this[0].scrollHeight,
        height        = $this.height(),
        delta         = e.type == 'DOMMouseScroll' ? e.originalEvent.detail * -40 : e.originalEvent.wheelDelta,
        up            = delta > 0

  }

  prevent(e) {
    e.stopPropagation()
    e.preventDefault()
    e.returnValue = false
    return false
  }



  render() {
    return (
        <ReactScrollbarScrollArea {...this.props} >
          {this.props.children}
        </ReactScrollbarScrollArea>
    )
  }

}


export default ScrollArea