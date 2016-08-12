import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'

import StaticPage from './components/app/page/Static'
import PromotionPage from './components/app/page/Promotion'

import ShopPage from './containers/app/page/Shop'
import MusicPage from './containers/app/page/Music'
import TourPage from './containers/app/page/Tour'
import EventPage from './containers/app/page/Event'
import BlogPage from './containers/app/page/Blog'
import ArtistPage from './components/app/page/Artist'

import BlogPopup from './containers/app/popup/Blog'
import EventPopup from './containers/app/popup/Event'
import TourPopup from './containers/app/popup/Tour'
import MusicPopup from './containers/app/popup/Music'
import ShopPopup from './components/app/popup/Shop'


export default (
  <Route path="/" component={App}>

    {/*Index*/}
    <IndexRoute 
           components={{page: PromotionPage}} />
    
    {/*Promotion*/}
    <Route path="promotion/shop/:item"
           components={{page: PromotionPage, popup: ShopPopup}} />
    <Route path="promotion/music/:item"
           components={{page: PromotionPage, popup: MusicPopup}} />
    <Route path="promotion/tour/:item"
           components={{page: PromotionPage, popup: TourPopup}} />
    <Route path="promotion/event/:item"
           components={{page: PromotionPage, popup: EventPopup}} />
    <Route path="promotion/blog/:item"
           components={{page: PromotionPage, popup: BlogPopup}} />

    {/*Shop*/}
    <Route path="shop"
           components={{page: ShopPage}} />
    <Route path="shop/:item"
           components={{page: ShopPage, popup: ShopPopup}} />

    {/*Music*/}
    <Route path="music"
           components={{page: MusicPage}} />
    <Route path="music/:item"
           components={{page: MusicPage, popup: MusicPopup}} />

    {/*Tour*/}
    <Route path="tour"
           components={{page: TourPage}} />
    <Route path="tour/:item"
           components={{page: TourPage, popup: TourPopup}} />

    {/*Event*/}
    <Route path="event"
           components={{page: EventPage}} />
    <Route path="event/:item"
           components={{page: EventPage, popup: EventPopup}} />

    {/*Blog*/}
    <Route path="blog"
           components={{page: BlogPage}} />
    <Route path="blog/:item"
           components={{page: BlogPage, popup: BlogPopup}} />

    {/*artist*/}
    <Route path="artist/:name"
           components={{page: ArtistPage}} />
    <Route path="artist/:name/shop/:item"
           components={{page: ArtistPage, popup: ShopPopup}} />
    <Route path="artist/:name/music/:item"
           components={{page: ArtistPage, popup: MusicPopup}} />
    <Route path="artist/:name/tour/:item"
           components={{page: ArtistPage, popup: TourPopup}} />
    <Route path="artist/:name/event/:item"
           components={{page: ArtistPage, popup: EventPopup}} />
    <Route path="artist/:name/blog/:item"
           components={{page: ArtistPage, popup: BlogPopup}} />

    <Route path="*"
           components={{page: StaticPage}} />


    
    
    
  </Route>
)