import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import ProductGroupComponent from '../../../../components/app/item/shop/ProductGroup'
import { showStagger } from '../../../../functions/'


class ProductGroup extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TransitionGroup component="div" className="ProductGroupTransition">
        <Transition {...this.props} />
      </TransitionGroup>
    )
  }
}


class Transition extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ProductGroupComponent {...this.props}  />
    )
  }

  show() {
    const items = $('.ProductThumb', findDOMNode(this))
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



export default ProductGroup




