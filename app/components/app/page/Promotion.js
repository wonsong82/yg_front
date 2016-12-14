require('./Promotion.scss')
import React from 'react'
import PromotionGroup from '../../../transitions/app/item/promotion/PromotionGroup'


const Promotion = ({albums, tours, banners, products, events}) => (
    <div className="PromotionLayout">

      <div className="promotions">

        {albums && albums.length==3 && tours && tours.length==3 && banners && banners.length==3 &&
         products && products.length==3 && events && events.length==3 ?

          <PromotionGroup
            tours={tours}
            banners={banners}
            products={products}
            albums={albums}
            events={events}
          />

          :null
        }

      </div>

    </div>
)

Promotion.defaultProps = {
  pageType: 'Promotion'
}


export default Promotion

