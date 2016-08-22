import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadShopPopup, changeProductOption } from '../../../actions/'
import ShopComponent from '../../../components/app/popup/Shop'


class Shop extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const e = this.props
    e.initPopup('Shop')
    e.loadShopPopup( this.props.params.item )
  }

  render() {
    return <ShopComponent {...this.props} />
  }
}


const mapStateToProps = (state) => {
  const {
    id, title, price, originalPrice, artistName, content, facebookShareLink, twitterShareLink, options, selectedOptions,
    type, variation, images, related
  } = state.popup

  return {
    id, title, price: price || '', originalPrice: originalPrice || '', artistName: artistName || '', content, facebookShareLink, twitterShareLink, options, selectedOptions,
    type, variation, images, related, themeColor: state.app.themeColor, textColor: state.app.textColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadShopPopup: name => {dispatch(loadShopPopup(name))},
    changeProductOption: ( optionName, optionValue, optionEnabled ) => {dispatch(changeProductOption( optionName, optionValue, optionEnabled ))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop)