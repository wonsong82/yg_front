import { connect } from 'react-redux'

import { toggleMainMenu, closeMainMenu, toggleCart, closeCart } from '../../actions/'
import Header from '../../components/app/Header'


const mapStateToProps = (state) => {
  return {
    productsCount: state.cart.productsCount,
    isMenuButtonDisabled: state.mainMenu.disabled,
    isMenuOpened: state.mainMenu.opened
  }
}

const mapDispatchToProps = (dispatch) => {  
  return {
    onMenuClick: () => {
      dispatch(toggleMainMenu())
    },
    onCartClick: () => {
      dispatch(toggleCart())
    },
    onHomeClick: () => {
      dispatch(closeMainMenu())
      dispatch(closeCart())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
