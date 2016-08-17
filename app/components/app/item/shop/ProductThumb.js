require('./ProductThumb.scss')
import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'


const ProductThumb = ({ title, url, artistName, price, thumb1x1, thumb2x1, thumb1x2, layoutStyle, layoutNum }) => (


  <RouterLink className={ `ProductThumb style-${layoutStyle}-${layoutNum}` } to={url}>

    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={thumb1x1} />
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb2x1} />
      <Image className="image-1x2" color="rgba(0,0,0,.30)" src={thumb1x2} />
    </div>

    <RouterLink className="title" to={url}>
      <h3>{`${artistName.replace(' ','')} - ${title}`}</h3>
    </RouterLink>

    <span className="price">{`$${price}`}</span>

  </RouterLink>

)

export default ProductThumb

