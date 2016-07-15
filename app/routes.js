import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './containers/AppContainer'
import HomePage from './components/pages/HomePage'
import BlogPage from './components/pages/BlogPage'
import EventPage from './components/pages/EventPage'
import ShopPage from './components/pages/ShopPage'
import TourPage from './components/pages/TourPage'
import MusicPage from './components/pages/MusicPage'
import ArtistPage from './components/pages/ArtistPage'


export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomePage} />
    <Route path="blog" components={BlogPage} />
    <Route path="event" components={EventPage} />
    <Route path="tour" components={TourPage} />
    <Route path="shop" components={ShopPage} />
    <Route path="music" components={MusicPage} />
    <Route path="artist/:name" components={ArtistPage} />
  </Route>
)