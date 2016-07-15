require('./static/font-klavika.css')
require('./static/icon-yg.css')
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { Router, browserHistory } from 'react-router'

import reducer from './reducers'
import routes from './routes'


const initialState = {}

const loggerMiddleware = createLogger()
const store = createStore(reducer, initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware))




import AppContainer from './containers/AppContainer'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.querySelector('#root')
)

/*



  </
*/



