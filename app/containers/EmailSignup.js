import { connect } from 'react-redux'

import {  } from '../actions/'
import EmailSignup from '../components/EmailSignup'


const mapStateToProps = (state) => {
  return {
    color: state.theme.textColor,
    themeColor: state.theme.textColor == '#000000' ? 'light' : 'dark',
    isLoading: state.signup.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailSignup)