import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import appReducer from './reducers/'


console.log(window.NODE_ENV)
const loggerMiddleware = createLogger()



const store = createStore(appReducer, {}, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
))


export default store