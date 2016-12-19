require('./ProductThumb.scss')
import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'
import ThumbHover from '../../../../components/lib/button/ThumbHover'

const ProductThumb = ({ title, url, artistName, price, originalPrice, isInstock, thumb1x1, thumb2x1, thumb1x2, layoutStyle, layoutNum }) => (


  //isInstock == false // then Out stock display somewhere

  <RouterLink className={ `ProductThumb style-${layoutStyle}-${layoutNum}` } to={url} style={{color:'#000'}}>

    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={thumb1x1} />
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb2x1} />
      <Image className="image-1x2" color="rgba(0,0,0,.30)" src={thumb1x2} />
    </div>

    <Ripple color='rgba(0,0,0,.5)' />

    <div className="title" to={url}>
      <h3>{`${artistName} - ${title}`}</h3>
    </div>

    <span className="price">
      {originalPrice &&
        <span className="sale">
          <span className="text">{`$${originalPrice}`}</span>&nbsp;
        </span>
      }
      {`$${price}`}
    </span>

    {
      isInstock ?
        <ThumbHover text="Details" /> :
        <div className="disabled-film">
          <span className="text">SOLD<br /><span>OUT</span></span>
        </div>
    }


  </RouterLink>

)

export default ProductThumb

