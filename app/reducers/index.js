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

// Tours
import { REQUEST_TOURS, RECEIVE_TOURS } from '../actions/'
const tours = ( state = initState.tours, action) => {
  switch(action.type){
    case REQUEST_TOURS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TOURS:
      return {
        isFetching: false,
        loaded: true,
        list: action.list
      }
    default:
      return state
  }
}

//Albums
import { REQUEST_ALBUMS, RECEIVE_ALBUMS} from '../actions'
const albums = ( state = initState.albums , action) => {
  switch(action.type){
    case REQUEST_ALBUMS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_ALBUMS:
      return {
        isFetching: false,
        loaded: true,
        list: action.list
      }
    default:
      return state
  }
}



// SIGNUP
import { NEWSLETTER_SIGNUP_RECEIVE, NEWSLETTER_SIGNUP_REQUEST } from '../actions/'
const signup = ( state = initState.signup, action ) => {
  switch(action.type) {
    case NEWSLETTER_SIGNUP_REQUEST:
      return {
        isLoading: true
      }
    case NEWSLETTER_SIGNUP_RECEIVE:
      return {
        isLoading: false
      }
    default:
      return state
  }
}





const appReducer = combineReducers({ artists, mainMenu, theme, signup , tours, albums})
export default appReducer





