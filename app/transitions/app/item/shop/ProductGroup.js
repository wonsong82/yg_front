import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import ProductGroupComponent from '../../../../components/app/item/shop/ProductGroup'


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



export default ProductGroup




