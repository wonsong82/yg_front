import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import MenuComponent from '../../components/app/Menu'



class Menu extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TransitionGroup>
        {this.props.opened &&
        <Transition {...this.props} />
        }
      </TransitionGroup>
    )
  }
}
Menu.propTypes = {
  opened: PropTypes.bool.isRequired,
  onTransitionStart: PropTypes.func.isRequired,
  onTransitionFinish: PropTypes.func.isRequired
}




class Transition extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MenuComponent {...this.props} ref="mainMenu" />
    )
  }

  componentDidMount(){
    const mainMenu = this.refs.mainMenu
    $(findDOMNode(mainMenu)).css({opacity:0})


  }

  componentWillEnter(callback){
    callback();
    this.props.onTransitionStart()

    const mainMenu = this.refs.mainMenu
    const artists = $('a.link', mainMenu.refs.artists)

    // Show Main Menu
    $(findDOMNode(mainMenu))
      .velocity('stop', true)
      .velocity({
        opacity: 1
      }, {
        duration: (artists.length * 80),
        easing: 'easeInOutQuad',
        complete: () => this.props.onTransitionFinish()
      })

    // Show artists staggering
    artists.each((i, e)=>{
      $(e)
        .velocity('stop', true)
        .velocity({
          opacity: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          translateY: 30
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

  componentWillLeave(callback){
    const mainMenu = this.refs.mainMenu
    const artists = $('a.link', mainMenu.refs.artists)

    this.props.onTransitionStart()
    $(findDOMNode(this))
      .velocity('stop', true)
      .velocity(
        'reverse', {
        duration: 200,
        easing: 'easeInOutQuad',
        delay: artists.length * 60,
        complete: () => callback()
      })

    artists.each((i, e) => {
      $(e)
        .velocity('stop', true)
        .velocity({
          opacity: 0,
          scaleX: 0.8,
          scaleY: 0.8,
          translateY: 20
        }, {
          duration: 150,
          easing: 'easeInOutQuad',
          queue: false,
          delay: (artists.length - i ) * 50
        })
    })
  }
  componentDidLeave(){
    this.props.onTransitionFinish()
  }
}




export default Menu




