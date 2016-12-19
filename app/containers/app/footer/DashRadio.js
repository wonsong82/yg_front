import { connect } from 'react-redux'

import DashRadio from '../../../components/app/footer/DashRadio'


const mapStateToProps = (state) => {
  return {
    color: state.app.textColor
  }
}

const mapDispatchToProps = () => {
}


export default connect(mapStateToProps, mapDispatchToProps)(DashRadio)