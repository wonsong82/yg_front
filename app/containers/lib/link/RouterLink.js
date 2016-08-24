import { connect } from 'react-redux'

import { setClickPosition } from '../../../actions/'
import RouterLink from '../../../components/lib/link/RouterLink'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: ( clickEvent ) => {
      dispatch(setClickPosition( clickEvent.clientX, clickEvent.clientY ))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RouterLink)
