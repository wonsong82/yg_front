import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadTourPopup } from '../../../actions/'
import TourComponent from '../../../components/app/popup/Tour'

class Tour extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const e = this.props
    e.initPopup('Tour')
    e.loadTourPopup( this.props.params.item )
  }

  render() {

    return <TourComponent {...this.props} />
  }
}

const mapStateToProps = (state) => {
  const {
    startDate, endDate, name, themeColor, title, subtitle,
    content, image, facebookShareLink, twitterShareLink, tourSchedule
  } = state.popup
  return {
    startDate, endDate, name, themeColor, title, subtitle,
    content, image, facebookShareLink, twitterShareLink, tourSchedule
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadTourPopup: name => {dispatch(loadTourPopup(name))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tour)