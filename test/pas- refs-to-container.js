import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainMenu from '../components/MainMenu'
import { closeMainMenu } from '../actions/'


const mapStateToProps = (state) => {
  return {
    artists: state.artists.list,
    menuDisabled: state.mainMenu.disabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkClick: () => dispatch(closeMainMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef:true})(MainMenu)



const mainMenu = this.refs.mainMenu.refs.wrappedInstance
$(findDOMNode(mainMenu)).css({opacity:0})
