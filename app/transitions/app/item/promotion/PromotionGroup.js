import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import PromotionComponent from '../../../../components/app/item/promotion/PromotionGroup'
import { showStagger } from '../../../../functions/'


class PromotionGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="PromotionTransition">
        <Transition {...this.props} />
      </TransitionGroup>
    )
  }
}
PromotionGroup.propTypes = {}


class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PromotionComponent {...this.props} />
    )
  }

  show() {
    const items = $('.TourThumb, .ProductThumb, .AlbumThumb, .EventThumb', findDOMNode(this))
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



export default PromotionGroup




