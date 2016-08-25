import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import AlbumGroupComponent from '../../../../components/app/item/music/AlbumGroup'
import { showStagger } from '../../../../functions/'


class AlbumGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="AlbumGroupTransition">
        <Transition {...this.props} />
      </TransitionGroup>
    )
  }
}
AlbumGroup.propTypes = {}


class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AlbumGroupComponent {...this.props} />
    )
  }

  show() {
    const items = $('.AlbumThumb', findDOMNode(this))
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



export default AlbumGroup




