import React from 'react'
import TourThumb from '../../item/tour/TourThumb'
import ProductThumb from '../../item/shop/ProductThumb'
import AlbumThumb from '../../item/music/AlbumThumb'
import EventThumb from '../../item/event/EventThumb'

const PromotionGroup = ({ tours, products, albums, events }) => (
    <div className="PromotionGroup">

      {tours && tours.length ? tours.map( (tour, i) => (
        <TourThumb key={`promotion-tour-${i}`} {...tour} />
      )):null}

      {products && products.length ? products.map( (product, i) => (
        <ProductThumb key={`promotion-product-${i}`} {...product} />
      )):null}

      {albums && albums.length ? albums.map( (album, i) => (
        <AlbumThumb key={`promotion-album-${i}`} {...album} />
      )):null}

      {events && events.length ? events.map( (event, i) => (
        <EventThumb key={`promotion-event-${i}`} {...event} />
      )):null}

    </div>
)


export default PromotionGroup
