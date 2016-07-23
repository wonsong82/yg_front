window.debugMode = true

require('./static/font-klavika.css')
require('./static/icon-yg.css')
window.$ = window.jQuery = require('jquery')
require('velocity-animate/velocity')
require('velocity-animate/velocity.ui')
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
