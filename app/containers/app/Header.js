import { connect } from 'react-redux'

import { toggleMainMenu, closeMainMenu } from '../../actions/'
import Header from '../../components/app/Header'


const mapStateToProps = (state) => {
  return {
    isMenuButtonDisabled: state.mainMenu.disabled,
    isMenuOpened: state.mainMenu.opened
  }
}

const mapDispatchToProps = (dispatch) => {  
  return {
    onMenuClick: () => {
      dispatch(toggleMainMenu())
    },
    onHomeClick: () => {
      dispatch(closeMainMenu())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
