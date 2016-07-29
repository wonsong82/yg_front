import { connect } from 'react-redux'

import { newsletterSignup } from '../../../actions/'
import EmailSignup from '../../../components/app/footer/EmailSignup'


const mapStateToProps = (state) => {
  return {
    color: state.theme.textColor,
    themeColor: state.theme.textColor == '#000000' ? 'light' : 'dark',
    isLoading: state.signup.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (email) => dispatch(newsletterSignup(email))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailSignup)