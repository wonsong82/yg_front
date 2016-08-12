import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'


const ShopThumb = ({ title, url, name, price, thumb_1x1, thumb_2x1, thumb_1x2 }) => (
  <div className="ShopThumb">

    <RouterLink className="title" to={ url }>
      <h3>{title}</h3>
    </RouterLink>
  </div>

)

export default ShopThumb

