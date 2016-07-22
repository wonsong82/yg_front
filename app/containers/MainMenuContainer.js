import React, { Component } from 'react'
import { connect } from 'react-redux'
import connectWithTransitionGroup from 'connect-with-transition-group'

import { disableMainMenu, enableMainMenu, closeMainMenu } from '../actions/'
import MainMenu from '../components/MainMenu'


const mapStateToProps = (state) => {
  return {
    artistsList: state.artists.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterBefore: () => dispatch(disableMainMenu()),
    onEnterAfter: () => dispatch(enableMainMenu()),
    onLeaveBefore: () => dispatch(disableMainMenu()),
    onLeaveAfter: () => dispatch(enableMainMenu()),
    onLinkClick: () => dispatch(closeMainMenu())
  }
}


export default connectWithTransitionGroup(
  connect(mapStateToProps, mapDispatchToProps, null, {withRef:true})(MainMenu)
)

