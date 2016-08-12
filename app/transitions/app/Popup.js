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
      <TransitionGroup>
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
    const popup = this.refs.popup
    $(findDOMNode(popup))
      .css({
        '-webkit-transform-origin': x + 'px ' + y + 'px',
        '-moz-transform-origin': x + 'px ' + y + 'px',
        '-ms-transform-origin': x + 'px ' + y + 'px',
        'transform-origin': x + 'px ' + y + 'px'
      })
      .velocity('stop', true)
      .velocity({
        scaleX: [ 0, 'easeInOutQuart' ],
        scaleY: [ 0, 'easeInOutQuart' ],
        opacity: [ 0, 'easeOutQuart' ]
      })
      .velocity('finish')
      .velocity({
        scaleX: [ 1, 'easeInOutQuart' ],
        scaleY: [ 1, 'easeInOutQuart' ],
        opacity: [ 1, 'easeOutQuart' ]
      }, {
        duration: 600,
        queue: false
      })
  }

  hide( callback ) {
    const popup = this.refs.popup
    $(findDOMNode(popup))
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




