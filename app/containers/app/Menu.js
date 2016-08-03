import { connect } from 'react-redux'
import { enableMainMenu, disableMainMenu, closeMainMenu } from '../../actions/'
import Menu from '../../transitions/app/Menu'



const mapStateToProps = (state) => {
  return {
    opened: state.mainMenu.opened,
    disabled: state.mainMenu.disabled,
    artists: state.artists.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransitionStart: () => dispatch(disableMainMenu()),
    onTransitionFinish: () => dispatch(enableMainMenu()),
    onLinkClick: () => dispatch(closeMainMenu()),
    onESCPressed: () => dispatch(closeMainMenu())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)