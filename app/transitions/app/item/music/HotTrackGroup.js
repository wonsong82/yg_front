import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import HotTrackGroupComponent from '../../../../components/app/item/music/HotTrackGroup'
import { showStagger } from '../../../../functions/'


class HotTrackGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="HotTrackGroupTransition">
        <Transition {...this.props} />
      </TransitionGroup>
    )
  }
}
HotTrackGroup.propTypes = {}



class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HotTrackGroupComponent {...this.props} />
    )
  }

  show() {
    const items = $('.HotTrackThumb', findDOMNode(this))
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



export default HotTrackGroup




