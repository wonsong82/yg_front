import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadMusicPopup } from '../../../actions/'
import MusicComponent from '../../../components/app/popup/Music'


class Music extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const e = this.props
    e.initPopup('Music')
    e.loadMusicPopup( this.props.params.item )
  }

  render() {
    return <MusicComponent {...this.props} />
  }
}


const mapStateToProps = (state) => {
  const { image, title, albumPrice, salePrice, albumProductId, name, content, facebookShareLink,  music, related} = state.popup
  return {
    image, title, albumPrice, salePrice, albumProductId, name, content, facebookShareLink,  music, related
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadMusicPopup: name => {dispatch(loadMusicPopup(name))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Music)