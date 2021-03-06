import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import EventGroupComponent from '../../../../components/app/item/event/EventGroup'
import { showStagger } from '../../../../functions/'

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
    showStagger(items)
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




