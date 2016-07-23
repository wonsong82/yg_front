import { connect } from 'react-redux'

import { enableMainMenu, disableMainMenu } from '../actions/'
import MainMenuTransition from '../transitions/MainMenuTransition'


const mapStateToProps = (state) => {
  return {
    opened: state.mainMenu.opened
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    disableMainMenu: () => dispatch(disableMainMenu()),
    enableMainMenu: () => dispatch(enableMainMenu())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainMenuTransition)