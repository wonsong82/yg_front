require('./Cart.scss')
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ScrollArea from 'react-scrollbar/dist/no-css'
import MenuButton from '../../components/lib/button/MenuButton'
import NumberStepper  from '../../components/lib/form/NumberStepper'
import Image from '../../components/lib/image/Image'


class Cart extends Component {

  constructor(props) {
    super(props)
  }

  onQuantityChange(productID, variationID, quantity){
    if(this.props.loading) return false
    this.props.onQuantityChange(productID, variationID, quantity)
  }

  onDelete(productID, variationID, e){
    if(this.props.loading) return false
    e.preventDefault()
    this.props.onRemove(productID, variationID)

  }

  preventOtherScrolls(e){
    e.preventDefault()
  }

  componentDidMount() {
    $(findDOMNode(this)).on('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }
  componentWillUnmount() {
    $(findDOMNode(this)).off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }

  onCloseClick(e){
    e.preventDefault()
    this.props.onCloseClick()
  }


  onMouseEnter(e) {
    const { textColor, themeColor } = this.props
    $(e.target)
      .velocity('stop')
      .velocity({
        color:  textColor,
        backgroundColor: themeColor,
        borderColor: textColor
      }, {
        easing: 'easeOutQuad',
        duration: 300
      })
  }

  onMouseLeave(e) {
    $(e.target)
      .velocity('stop')
      .velocity({
        color:  '#fff',
        backgroundColor: '#000',
        borderColor: '#000'
      }, {
        duration: 300,
        easing: 'easeOutQuad'
      })
  }


  render() {
    const { opened, loading, loaded, products, musics, total, themeColor, textColor } = this.props
    const line2Color = textColor=='#ffffff' ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)'
    const bgcolor = textColor=='#ffffff' ? 'dark' : 'light'

    return (
      <div className="Cart" style={{backgroundColor: themeColor}}>

        {loaded &&
        <div className="cart-container">

          <ScrollArea className="scroll-contents"
                      speed={0.8}
                      horizontal={false}
                      smoothScrolling={true}
                      contentClassName="content">



            <div className="content-wrapper">
              <h3 style={{color:textColor}}>Shop Cart</h3>

              {products && products.length ?
              <div className="data-table">

                <div className="table-border" style={{backgroundColor:textColor}} />
                <table cellPadding={0} cellSpacing={0} >
                  <thead>
                    <th className="img">&nbsp;</th>
                    <th className="name"><b style={{color:textColor}}>Product</b></th>
                    <th className="unit-price"><b style={{color:textColor}}>Price</b></th>
                    <th className="quantity"><b style={{color:textColor}}>uantity</b></th>
                    <th className="total-price"><b style={{color:textColor}}>Total</b></th>
                    <th className="delete">&nbsp;</th>
                  </thead>

                  <tbody>
                    {products.map( (product, i) => (
                    <tr style={{borderColor:line2Color}}>
                      <td className="img" style={{borderColor:line2Color}}>
                        <Image className="image" src={product.thumb} color="rgba(0,0,0,.3)" />
                      </td>
                      <td className="name" style={{borderColor:line2Color}}>
                        <span style={{color:textColor}}>{product.product_title}</span>
                      </td>
                      <td className="unit-price" style={{borderColor:line2Color}}>
                        <span style={{color:textColor}}>{`$${product.price}`}</span>
                      </td>
                      <td className="quantity" style={{borderColor:line2Color}}>
                        <NumberStepper
                          className={bgcolor}
                          value={product.quantity}
                          min={0} max={100} step={1}
                          disabled={loading? true:false}
                          onChange={this.onQuantityChange.bind(this, product.cart_id, product.variation_id)}
                        />
                      </td>
                      <td className="total-price" style={{borderColor:line2Color}}>
                        <span style={{color:textColor}}>{`$${product.line_total}`}</span>
                      </td>
                      <td className="delete" style={{borderColor:line2Color}}>
                        <a
                          href="#"
                          onClick={this.onDelete.bind(this, product.cart_id, product.variation_id)}
                          className={loading? 'delete-btn disabled': 'delete-btn'} >
                          <span style={{color:textColor}} className="icon-delete" />
                        </a>
                      </td>

                    </tr>
                    ))}
                  </tbody>

                </table>
                <div className="table-border" style={{backgroundColor:textColor}} />
              </div>:

              <span className="not-found">0 items in this cart</span>
              }

            </div>



            <div className="content-wrapper">
              <h3 style={{color:textColor}}>Music Cart</h3>

              {musics && musics.length ?
                <div className="data-table">

                  <div className="table-border" style={{backgroundColor:textColor}} />
                  <table cellPadding={0} cellSpacing={0} >
                    <thead>
                    <th className="img">&nbsp;</th>
                    <th className="name"><b style={{color:textColor}}>Product</b></th>
                    <th className="unit-price"><b style={{color:textColor}}>Price</b></th>
                    <th className="quantity"><b style={{color:textColor}}>uantity</b></th>
                    <th className="total-price"><b style={{color:textColor}}>Total</b></th>
                    <th className="delete">&nbsp;</th>
                    </thead>

                    <tbody>
                    {musics.map( (product, i) => (
                      <tr style={{borderColor:line2Color}}>
                        <td className="img" style={{borderColor:line2Color}}>
                          <Image className="image" src={product.thumb} color="rgba(0,0,0,.3)" />
                        </td>
                        <td className="name" style={{borderColor:line2Color}}>
                          <span style={{color:textColor}}>{product.product_title}</span>
                        </td>
                        <td className="unit-price" style={{borderColor:line2Color}}>
                          <span style={{color:textColor}}>{`$${product.price}`}</span>
                        </td>
                        <td className="quantity" style={{borderColor:line2Color}}>
                          <NumberStepper
                            className={bgcolor}
                            value={product.quantity}
                            min={0} max={100} step={1}
                            disabled={loading? true:false}
                            onChange={this.onQuantityChange.bind(this, product.cart_id, product.variation_id)}
                          />
                        </td>
                        <td className="total-price" style={{borderColor:line2Color}}>
                          <span style={{color:textColor}}>{`$${product.line_total}`}</span>
                        </td>
                        <td className="delete" style={{borderColor:line2Color}}>
                          <a
                            href="#"
                            onClick={this.onDelete.bind(this, product.cart_id, product.variation_id)}
                            className={loading? 'delete-btn disabled': 'delete-btn'} >
                            <span style={{color:textColor}} className="icon-delete" />
                          </a>
                        </td>

                      </tr>
                    ))}
                    </tbody>

                  </table>
                  <div className="table-border" style={{backgroundColor:textColor}} />
                </div>:

                <span className="not-found">0 items in this cart</span>
              }

            </div>



            <div className="content-wrapper">
              <h3 style={{color:textColor}}>Cart Total</h3>

              <div className="data-table">

                <div className="table-border" style={{backgroundColor:textColor}} />

                <table cellPadding={0} cellSpacing={0} >
                  <tbody>
                    <tr className="subtotal-tr">
                      <td className="subtotal-text">
                        <span style={{color:textColor}}>Subtotal</span>
                      </td>
                      <td className="subtotal-value">
                        <span style={{color:textColor}}>{total}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="table-border" style={{backgroundColor:textColor}} />
              </div>

            </div>

            <div className="controls">
              <a href="/checkout"
                 className="checkout-btn"
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
              >
                CHECKOUT
              </a>
            </div>

          </ScrollArea>

        </div>
        }

        <a href="#" className="closebtn" onClick={this.onCloseClick.bind(this)}>
          <MenuButton color={textColor} close={true} />
        </a>

        <span className={loading? 'film' : 'film closed'} />

      </div>

    )
  }

}

Cart.propTypes = {}



export default Cart