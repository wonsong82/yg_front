import { connect } from 'react-redux'

import { updateProductInCart, removeProductInCart, closeCart } from '../../actions/'
import Cart from '../../transitions/app/Cart'


const mapStateToProps = (state) => {
  const { opened, isFetching:loading, loaded, products:data, total } = state.cart
  const { product:products, music:musics } = data
  const { themeColor, textColor } = state.app
  return {
    opened, loading, loaded, products, musics, total, themeColor, textColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuantityChange: (productId, variationId, qty) => {
      dispatch(updateProductInCart(productId, variationId, qty))
    },
    onRemove: (productId, variationId) => {
      dispatch(removeProductInCart(productId, variationId))
    },
    onCloseClick: () => dispatch(closeCart())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)