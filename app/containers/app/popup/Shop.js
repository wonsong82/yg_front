import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadShopPopup } from '../../../actions/'
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
    id, title, price, salePrice, name, content, facebookShareLink, twitterShareLink,
    type, variation, images, related
  } = state.popup

  return {
    id, title, price, salePrice, name, content, facebookShareLink, twitterShareLink,
    type, variation, images, related
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadShopPopup: name => {dispatch(loadShopPopup(name))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop)