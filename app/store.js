import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import appReducer from './reducers/'
const loggerMiddleware = createLogger()

const middlewares = window.debugMode ?
  applyMiddleware(thunkMiddleware, loggerMiddleware) :
  applyMiddleware(thunkMiddleware)

const store = createStore(appReducer, {}, middlewares)


export default store