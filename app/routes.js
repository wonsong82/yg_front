import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './containers/AppContainer'
import PromotionLayout from './components/layouts/PromotionLayout'
import ShopLayout from './components/layouts/ShopLayout'
import MusicLayout from './components/layouts/MusicLayout'
import TourLayout from './components/layouts/TourLayout'
import EventLayout from './components/layouts/EventLayout'
import BlogLayout from './components/layouts/BlogLayout'
import ArtistLayout from './components/layouts/ArtistLayout'
import StaticLayout from './components/layouts/StaticLayout'

import ShopItem from './components/items/ShopItem'
import MusicItem from './components/items/MusicItem'
import TourItem from './components/items/TourItem'
import EventItem from './components/items/EventItem'
import BlogItem from './components/items/BlogItem'



export default (
  <Route path="/" component={AppContainer}>

    {/*Index*/}
    <IndexRoute 
           components={{page: PromotionLayout}} />    
    
    {/*Promotion*/}
    <Route path="promotion/shop/:item"
           components={{page: PromotionLayout, popup: ShopItem}} />
    <Route path="promotion/music/:item"
           components={{page: PromotionLayout, popup: MusicItem}} />
    <Route path="promotion/tour/:item"
           components={{page: PromotionLayout, popup: TourItem}} />
    <Route path="promotion/event/:item"
           components={{page: PromotionLayout, popup: EventItem}} />
    <Route path="promotion/blog/:item"
           components={{page: PromotionLayout, popup: BlogItem}} />

    {/*Shop*/}
    <Route path="shop"
           components={{page: ShopLayout}} />
    <Route path="shop/:item"
           components={{page: ShopLayout, popup: ShopItem}} />

    {/*Music*/}
    <Route path="music"
           components={{page: MusicLayout}} />
    <Route path="music/:item"
           components={{page: MusicLayout, popup: MusicLayout}} />

    {/*Tour*/}
    <Route path="tour"
           components={{page: TourLayout}} />
    <Route path="tour/:item"
           components={{page: TourLayout, popup: TourItem}} />

    {/*Event*/}
    <Route path="event"
           components={{page: EventLayout}} />
    <Route path="event/:item"
           components={{page: EventLayout, popup: EventItem}} />

    {/*Blog*/}
    <Route path="blog"
           components={{page: BlogLayout}} />
    <Route path="blog/:item"
           components={{page: BlogLayout, popup: BlogItem}} />

    {/*artist*/}
    <Route path="artist/:name"
           components={{page: ArtistLayout}} />
    <Route path="artist/:name/shop/:item"
           components={{page: ArtistLayout, popup: ShopItem}} />
    <Route path="artist/:name/music/:item"
           components={{page: ArtistLayout, popup: MusicItem}} />
    <Route path="artist/:name/tour/:item"
           components={{page: ArtistLayout, popup: TourItem}} />
    <Route path="artist/:name/event/:item"
           components={{page: ArtistLayout, popup: EventItem}} />
    <Route path="artist/:name/blog/:item"
           components={{page: ArtistLayout, popup: BlogItem}} />

    <Route path="*"
           components={{page: StaticLayout}} />


    
    
    
  </Route>
)