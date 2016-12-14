import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadShopPopup, changeProductOption , addProductsToCart} from '../../../actions/'
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
    type, variation, instock, images, related, curVariationId
  } = state.popup

  return {
    id, title, price: price || '', originalPrice: originalPrice || '', artistName: artistName || '', content, facebookShareLink, twitterShareLink, options, selectedOptions,
    type, variation, images, instock, related, themeColor: state.app.themeColor, textColor: state.app.textColor, curVariationId: curVariationId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadShopPopup: name => {dispatch(loadShopPopup(name))},
    changeProductOption: ( optionName, optionValue, optionEnabled ) => {dispatch(changeProductOption( optionName, optionValue, optionEnabled ))},
    addToCart: (productId, variationId, qty) => {dispatch(addProductsToCart(productId, variationId, qty))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop)