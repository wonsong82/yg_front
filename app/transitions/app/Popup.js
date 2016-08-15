import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import PopupComponent from '../../components/app/Popup'


class Popup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="PopupTransition">
        {this.props.children &&
        <Transition key={this.props.reloadKey} {...this.props} />
        }
      </TransitionGroup>
    )
  }
}
Popup.propTypes = {}


class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PopupComponent {...this.props} ref="popup" />
    )
  }

  show( callback ) {
    callback()
    let x = this.props.clickPosition.x || $(window).width() * 0.5
    let y = this.props.clickPosition.y || $(window).height() * 0.5
    const popup = $(findDOMNode(this.refs.popup))
    const contents = $('.contents', popup)
    contents.css('display','none')
    popup.css({
        '-webkit-transform-origin': x + 'px ' + y + 'px',
        '-moz-transform-origin': x + 'px ' + y + 'px',
        '-ms-transform-origin': x + 'px ' + y + 'px',
        'transform-origin': x + 'px ' + y + 'px'
      })
      .velocity('stop', true)
      .velocity({
        scaleX: 0.5,
        scaleY: 0.5
      })
      .velocity('finish')
      .velocity({
        scaleX: 1,
        scaleY: 1
      }, {
        easing: 'easeOutQuart',
        duration: 600,
        queue: false,
        complete: () => {
          contents.css({display:'block', opacity:0})
            .velocity('stop', true)
            .velocity({
              translateY: '30px'
            })
            .velocity('finish')
            .velocity({
              opacity: 1,
              translateY: 0
            }, {
              duration: 700,
              easing: 'easeOutQuart'
            })
        }
      })
  }

  hide( callback ) {
    const popup = $(findDOMNode(this.refs.popup))
    const contents = $('.contents', popup)
    contents
      .velocity('stop', true)
      .velocity({
        opacity: 0
      },{
        duration: 150,
        queue: false
      })
    popup
      .velocity('stop', true)
      .velocity({
        opacity: 0
      },{
        duration: 500,
        queue: false,
        easing: 'easeOutQuart',
        complete: () => callback()
      })
  }

  componentWillAppear(callback) {
    this.show(callback)
  }

  componentWillEnter(callback) {
    this.show(callback)
  }

  componentWillLeave(callback) {
    this.hide(callback)
  }

}



export default Popup




