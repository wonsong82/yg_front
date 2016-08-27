require('./Artist.scss')
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ViewMore from '../../../components/lib/link/ViewMore'
import TourThumb from '../../../components/app/item/tour/TourThumb'
import TourSchedule from '../../../components/app/item/tour/TourSchedule'
import ScrollArea from 'react-scrollbar/dist/no-css'
import ProductGroup from '../../../transitions/app/item/shop/ProductGroup'
import AlbumGroup from '../../../transitions/app/item/music/AlbumGroup'
import HotTrackGroup from '../../../transitions/app/item/music/HotTrackGroup'
import EventGroup from '../../../transitions/app/item/event/EventGroup'


class Artist extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $(window).on('resize', this.resizeImage.bind(this))
    this.resizeImage()
  }

  componentWillUnmount() {
    $(window).off('resize', this.resizeImage.bind(this))
  }

  resizeImage() {
    $(findDOMNode(this.refs.artistImage)).css({
      width: `${$(window).width()}px`,
      height: `${$(window).height()}px`
    })
  }


  render() {

    const { bg, name, tours, themeColor, textColor, toursAllLoaded, onToursViewMoreClick, products, productsAllLoaded, onProductsViewMoreClick, albums, albumsAllLoaded, onAlbumsViewMoreClick, hotTracks, hotTracksAllLoaded, onHotTracksViewMoreClick, onAddToCartClick, events, eventsAllLoaded, onEventsViewMoreClick } = this.props

    return (
      <div className="ArtistLayout">


        <div className="artist-image" ref="artistImageWrapper">
          <span className="image" style={{backgroundImage:`url("${bg}")`}} ref="artistImage" />
        </div>

        <h1 className="page-title" style={{color:themeColor}}>{name}</h1>


        {tours && tours.length ?
        <div className="tour-container">
          <h3>Tour</h3>
          <ul className="tours-list" ref="toursList">
            {tours.map( (e,i) => (
              <li key={`tours-${i}`}>
                <div className="thumb-con">
                  <TourThumb {...e} />
                </div>
                <ScrollArea className="schedules" speed={0.8} horizontal={false} smoothScrolling={true} contentClassName="content" >
                  {e.schedule && e.schedule.length ? e.schedule.map( (schedule, y) => (
                    <div key={`tour-${i}-schedule-${y}`} className="schedule-con">
                      <TourSchedule key={`${e.id}-${y}`} {...schedule} textColor={e.textColor} themeColor={e.themeColor} />
                    </div>
                  )):null}
                </ScrollArea>
              </li>
            ))}
          </ul>
          {!toursAllLoaded &&
          <ViewMore onClick={onToursViewMoreClick} />
          }
        </div>
        :null}


        {products && products.length ?
        <div className="shop-container">
          <h3>Shop</h3>
          <ul className="products-list">
            {products.map( (item, i) => (
              <ProductGroup key={`products-${i}`} products={item} />
            ))}
          </ul>
          {!productsAllLoaded &&
          <ViewMore onClick={onProductsViewMoreClick} />
          }
        </div>
        :null}


        {albums && albums.length ?
        <div className="music-container">
          <section className="main">
            <h3>Album</h3>
            {albums && albums.length ? albums.map( (item, i) => (
              <AlbumGroup key={`albumGroup-${i}`} albums={item} />
            )):null}
            {!albumsAllLoaded && albums && albums.length ?
              <ViewMore onClick={onAlbumsViewMoreClick} />
              : ''}
          </section>
          <section className="side">
            <h3>Hot Tracks</h3>
            {hotTracks && hotTracks.length ? hotTracks.map( (item, i) => (
              <HotTrackGroup key={`hotTrackGroup-${i}`} hotTracks={item} onAddCartClick={onAddToCartClick}/>
            )): null}
            {!hotTracksAllLoaded && hotTracks && hotTracks.length ?
              <ViewMore onClick={onHotTracksViewMoreClick} />
              : ''}
          </section>
        </div>
        :null}


        {events && events.length ?
        <div className="event-container">
          <h3>Event</h3>
          <div className="events-list">
            {events.map( (item, i) => (
              <EventGroup key={'eventGroup-'+i} events={item} />
            ))}
          </div>
          {!eventsAllLoaded &&
          <ViewMore onClick={onEventsViewMoreClick} />
          }
        </div>
        :null}




      </div>
    )
  }

}

Artist.propTypes = {}



export default Artist