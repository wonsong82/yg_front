import { combineReducers } from 'redux'
import initState from '../initialState'

// THEME
import { SET_THEME_COLOR } from '../actions/'
const theme = ( state = initState.theme, action ) => {
  switch(action.type){
    case SET_THEME_COLOR:
      return Object.assign({}, state, {
        themeColor: action.themeColor,
        textColor: action.textColor
      })
    default:
      return state
  }
}


// MAIN MENU
import { OPEN_MAIN_MENU, CLOSE_MAIN_MENU, ENABLE_MAIN_MENU, DISABLE_MAIN_MENU } from '../actions/'
const mainMenu = ( state = initState.mainMenu, action) => {
  switch(action.type){
    case OPEN_MAIN_MENU:
      return Object.assign({}, state,
        {
          opened: true
        })
    case CLOSE_MAIN_MENU:
      return Object.assign({}, state,
        {
          opened: false
        })
    case ENABLE_MAIN_MENU:
      return Object.assign({}, state, 
        {
          disabled: false
        })
    case DISABLE_MAIN_MENU:
      return Object.assign({}, state,        
        {
          disabled: true
        })
    default:
      return state
  }
}




// ARTISTS
import { REQUEST_ARTISTS, RECEIVE_ARTISTS } from '../actions/'
const artists = ( state = initState.artists, action) => {
  switch(action.type){
    case REQUEST_ARTISTS:
      return Object.assign({}, state, {        
        isFetching: true
      })
    case RECEIVE_ARTISTS:
      return {
        isFetching: false,
        loaded: true,
        list: action.list
      }
    default:
      return state
  }
}







const appReducer = combineReducers({ artists, mainMenu, theme })
export default appReducer





