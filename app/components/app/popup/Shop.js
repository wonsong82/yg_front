require('./Shop.scss')
import React, { Component, PropTypes } from 'react'
import ProductThumb from '../../../components/app/item/shop/ProductThumb'
import ProductImageSwiper from '../../../components/app/item/shop/ProductImageSwiper'
import AnchorLink from '../../../components/lib/link/AnchorLink'


class Shop extends Component {

  constructor(props) {
    super(props)
  }


  onOptionChange(e) {
    const select = $(`select[name="${e.target.name}"]`)
    const selectedOption = $(`option[value="${e.target.value}"]`, select)
    const enabled = selectedOption.attr('data-enabled')

    this.props.changeProductOption(e.target.name, e.target.value, enabled)
  }

  onAddCartClick(e) {
    e.preventDefault()

    const productId = this.props.id
    const variationId = this.props.curVariationId
    const qty = 1;

    if(this.props.options == false || (!this.props.options == false && variationId)){
      this.props.addToCart(productId,variationId, qty);
    }else{
      alert('Please select option to add to shopping cart')
    }

  }

  onMouseEnter(e) {
    /*const { textColor, themeColor } = this.props
    $(e.target)
      .velocity('stop')
      .velocity({
        color:  textColor,
        backgroundColor: themeColor
      }, {
        easing: 'easeOutQuad',
        duration: 300
      })*/
  }

  onMouseLeave(e) {
    /*$(e.target)
      .velocity('stop')
      .velocity('reverse', {
        duration: 300,
        easing: 'easeOutQuad'
      })*/
  }


  render() {
    const { id, title, price, originalPrice, artistName, content, facebookShareLink,
      twitterShareLink, type, options, selectedOptions, images, related } = this.props

    return (
      <div className="ShopLayout">

        <div className="Product">

          {images && images.length ?
          <div className="images">
            <ProductImageSwiper className="image-swiper" images={images} />
          </div>
          : null}

          <div className="header">

            <h1 className="title">{`${artistName} - ${title}`}</h1>


            <div className="price">
              {originalPrice &&
                <span className="sale">
                  <span className="text">{`$${originalPrice}`}</span>&nbsp;
                </span>
              }
              <span>{price && `$${price}`}</span>
            </div>

            <div className="socialLinks">
              <AnchorLink href={facebookShareLink} target="_blank">
                <span className="icon-facebook" />
              </AnchorLink>
              <AnchorLink href={twitterShareLink} target="_blank">
                <span className="icon-twitter" />
              </AnchorLink>
            </div>



            <div className="controls">

              {options && options.length ? options.map( ({ name, values }) => { return (
                <select
                  key={name}
                  name={name}
                  value={selectedOptions[name]||'select'}
                  onChange={this.onOptionChange.bind(this)}>

                  {values.map( (e, i) => (
                    <option
                      className={e.enabled?'enabled':'disabled'}
                      data-enabled={e.enabled?'enabled':'disabled'}
                      key={`${name}-${i}`}
                      value={e.value}
                    >
                      {e.text}
                    </option>
                  ))}

                </select>
              )}) : null }

              <a href="#"
                className="add-to-cart"
                onClick={this.onAddCartClick.bind(this)}
                onMouseOver={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
              >
                ADD TO CART
              </a>

            </div>

          </div>


          <div className="content">
            <h3>Description</h3>
            <p>
              {content}
            </p>
          </div>


        </div>


        {(related && related.length) ?
        <div className="related-container">

          <h6>Related Products</h6>
          <ul className="items">

            {related.map(item => (
            <li key={'event' + item.id}>
              <ProductThumb {...item} />
            </li>
            ))}

          </ul>
        </div>
        :null}


      </div>
    )
  }

}




export default Shop

