import { Env } from '../env'
if( Env == 'production' ){
  window.onerror = function(){
    return true;
  }
}

require('./static/font-klavika.css')
require('./static/icon-yg.css')
window.$ = window.jQuery = require('jquery')
require('velocity-animate/velocity')
require('velocity-animate/velocity.ui')
require('./static/swiper/css/swiper.css')
require('./static/swiper/js/swiper.js')

import 'babel-polyfill'


import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import routes from './routes'


render (

  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,

  document.querySelector('#root')

)
