import { connect } from 'react-redux'

import { toggleMainMenu } from '../actions/'
import Header from '../components/Header'


const mapStateToProps = (state) => {
  return {
    isMenuButtonDisabled: state.mainMenu.disabled
  }
}

const mapDispatchToProps = (dispatch) => {  
  return {
    onMenuClick: () => {
      dispatch(toggleMainMenu())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
