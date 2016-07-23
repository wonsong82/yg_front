import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import MainMenuContainer from '../containers/MainMenuContainer'



class MainMenuTransition extends Component {
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
MainMenuTransition.propTypes = {
  opened: PropTypes.bool.isRequired,
  disableMainMenu: PropTypes.func.isRequired,
  enableMainMenu: PropTypes.func.isRequired
}




class Transition extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MainMenuContainer ref="mainMenu" />
    )
  }

  componentDidMount(){
    const mainMenu = this.refs.mainMenu.refs.wrappedInstance
    $(findDOMNode(mainMenu)).css({opacity:0})


  }

  componentWillEnter(callback){
    callback();
    this.props.disableMainMenu()

    const mainMenu = this.refs.mainMenu.refs.wrappedInstance
    const artists = $('a.link', mainMenu.refs.artists)

    $(findDOMNode(mainMenu))
      .velocity('stop', true)
      .velocity({
        opacity: 1
      }, {
        duration: (artists.length * 80),
        easing: 'easeInOutQuad',
        complete: () => this.props.enableMainMenu()
      })

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
    const mainMenu = this.refs.mainMenu.refs.wrappedInstance
    const artists = $('a.link', mainMenu.refs.artists)

    this.props.disableMainMenu()
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
    this.props.enableMainMenu()
  }
}




export default MainMenuTransition




