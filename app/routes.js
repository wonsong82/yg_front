import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'

import PromotionPage from './components/app/page/Promotion'
import ShopPage from './components/app/page/Shop'
import MusicPage from './components/app/page/Music'
import TourPage from './components/app/page/Tour'
import EventPage from './containers/app/page/Event'
import BlogPage from './containers/app/page/Blog'
import ArtistPage from './components/app/page/Artist'
import StaticPage from './components/app/page/Static'


import ShopItem from './components/app/item/Shop'
import MusicItem from './components/app/item/Music'
import TourItem from './components/app/item/Tour'
import EventItem from './components/app/item/Event'
import BlogItem from './components/app/item/Blog'


export default (
  <Route path="/" component={App}>

    {/*Index*/}
    <IndexRoute 
           components={{page: PromotionPage}} />
    
    {/*Promotion*/}
    <Route path="promotion/shop/:item"
           components={{page: PromotionPage, popup: ShopItem}} />
    <Route path="promotion/music/:item"
           components={{page: PromotionPage, popup: MusicItem}} />
    <Route path="promotion/tour/:item"
           components={{page: PromotionPage, popup: TourItem}} />
    <Route path="promotion/event/:item"
           components={{page: PromotionPage, popup: EventItem}} />
    <Route path="promotion/blog/:item"
           components={{page: PromotionPage, popup: BlogItem}} />

    {/*Shop*/}
    <Route path="shop"
           components={{page: ShopPage}} />
    <Route path="shop/:item"
           components={{page: ShopPage, popup: ShopItem}} />

    {/*Music*/}
    <Route path="music"
           components={{page: MusicPage}} />
    <Route path="music/:item"
           components={{page: MusicPage, popup: MusicItem}} />

    {/*Tour*/}
    <Route path="tour"
           components={{page: TourPage}} />
    <Route path="tour/:item"
           components={{page: TourPage, popup: TourItem}} />

    {/*Event*/}
    <Route path="event"
           components={{page: EventPage}} />
    <Route path="event/:item"
           components={{page: EventPage, popup: EventItem}} />

    {/*Blog*/}
    <Route path="blog"
           components={{page: BlogPage}} />
    <Route path="blog/:item"
           components={{page: BlogPage, popup: BlogItem}} />

    {/*artist*/}
    <Route path="artist/:name"
           components={{page: ArtistPage}} />
    <Route path="artist/:name/shop/:item"
           components={{page: ArtistPage, popup: ShopItem}} />
    <Route path="artist/:name/music/:item"
           components={{page: ArtistPage, popup: MusicItem}} />
    <Route path="artist/:name/tour/:item"
           components={{page: ArtistPage, popup: TourItem}} />
    <Route path="artist/:name/event/:item"
           components={{page: ArtistPage, popup: EventItem}} />
    <Route path="artist/:name/blog/:item"
           components={{page: ArtistPage, popup: BlogItem}} />

    <Route path="*"
           components={{page: StaticPage}} />


    
    
    
  </Route>
)