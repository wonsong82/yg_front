import { combineReducers } from 'redux'


const init = {
  artists: {
    isFetching: false,
    list: []
  }
}

import { REQUEST_ARTISTS, RECEIVE_ARTISTS } from './actions'
const artists = ( state = init.artists, action) => {
  switch(action.type){

    case REQUEST_ARTISTS:
      return Object.assign({}, state, {
        isFetching: true
      })      
      
    case RECEIVE_ARTISTS:
      return {
        isFetching: false,
        list: action.list
      }
      
    default:
      return state
  }
}


const appReducer = combineReducers({ artists })
export default appReducer





