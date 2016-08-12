import { connect } from 'react-redux'

import { redirect } from '../../actions/'
import Popup from '../../transitions/app/Popup'


const mapStateToProps = (state) => {
  return {
    clickPosition: state.app.clickPosition
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let to = undefined
  if(ownProps.children) {
    const {location, params} = ownProps.children.props
    const fullpath = location.pathname

    if (fullpath.match(/^\/promotion\//)) {
      to = '/promotion'
    }
    else if (fullpath.match(/^\/artist\//)) {
      to = '/artist/' + params.name
    }
    else {
      to = fullpath.substring(0, fullpath.indexOf('/' + params.item))
    }
  }

  return {
    onCloseClick: () => { dispatch(redirect(to)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Popup)