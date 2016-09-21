import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import CartComponent from '../../components/app/Cart'


class Cart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TransitionGroup component="div" className="CartTransition">
        {this.props.opened &&
        <Transition {...this.props} />
        }
      </TransitionGroup>
    )
  }
}
Cart.propTypes = {}


class Transition extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CartComponent {...this.props} ref="cart" />
    )
  }

  componentDidMount() {
    const container = $(findDOMNode(this.refs.cart))
    //const contents = $('.cart-container', container)
    //const closeBtn = $('.close-btn', container)
    container.css('opacity', 0)
  }


  componentWillEnter(callback) {
    callback()
    const container = $(findDOMNode(this.refs.cart))
    container
      .velocity('stop', true)
      .velocity({opacity: 1}, {duration: 700, easing: 'easeInOutQuart'})

    /*const contents = $('.cart-container', container)
    const closeBtn = $('.close-btn', container)

    container
      .velocity('stop', true)
      .velocity({opacity: 0})
      .velocity('finish')
      .velocity('reverse', {
        duration: 350,
        queue: false,
        easing: 'easeInOutQuad',
        complete: () => {
          contents.css({display:'block', opacity:0})
            .velocity('stop', true)
            .velocity({
              translateY: '0'
            })
            .velocity('finish')
            .velocity({
              opacity: 1,
              translateY: 0
            }, {
              duration: 700,
              easing: 'easeOutQuart'
            })
          closeBtn.css({display:'block', opacity:0})
            .velocity('stop', true)
            .velocity({
              opacity: 1
            }, {
              delay: 200,
              duration: 700,
              easing: 'easeOutQuart'
            })
        }
      })*/


  }


  // This is called when the child has been removed from the ReactTransitionGroup. Though the child has been removed, ReactTransitionGroup will keep it in the DOM until callback is called.
  componentWillLeave(callback) {
    const container = $(findDOMNode(this.refs.cart))
    /*const contents = $('.cart-container', container)
    const closeBtn = $('.close-btn', container)

    contents
      .velocity('stop', true)
      .velocity({
        opacity: 0
      }, {
        duration: 150,
        queue: false
      })

    closeBtn
      .velocity('stop', true)
      .velocity({
        opacity: 0
      }, {
        duration: 150,
        queue: false
      })
*/
    container
      .velocity('stop', true)
      .velocity({
        opacity:0
      }, {
        duration: 500,
        queue:false,
        easeing: 'easeInOutQuart',
        complete: () => callback()
      })

  }

}



export default Cart




