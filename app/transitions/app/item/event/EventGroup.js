import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import EventGroupComponent from '../../../../components/app/item/event/EventGroup'


class EventGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="EventGroupTransition">
        <Transition {...this.props} />
      </TransitionGroup>
    )
  }
}
EventGroup.propTypes = {}


class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <EventGroupComponent {...this.props}  />
    )
  }

  show() {
    const items = $('.EventThumb', findDOMNode(this))
    items.each((i, e)=>{
      $(e)
        .velocity('stop', true)
        .velocity({
          opacity: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          translateX: 60,
          translateY: 80
        })
        .velocity('finish')
        .velocity('reverse', {
          duration: 350,
          delay: i * 80,
          queue: false,
          easing: 'easeInOutQuad'
        })
    })
  }

  componentWillAppear(callback) {
    callback()
    this.show()
  }

  componentWillEnter(callback) {
    callback()
    this.show()
  }
}



export default EventGroup




