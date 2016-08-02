import { combineReducers } from 'redux'
import initState from '../initialState'

// THEME
import { SET_THEME_COLOR, SET_RESPONSIVE_MODE } from '../actions/'
const theme = ( state = initState.theme, action ) => {
  switch(action.type){
    case SET_THEME_COLOR:
      return Object.assign({}, state, {
        themeColor: action.themeColor,
        textColor: action.textColor
      })
    case SET_RESPONSIVE_MODE:
      const { width } = action
      return Object.assign({}, state, {
        responsiveMode:
          width >= 1280 ? 1280 :
          width >= 1024 ? 1024 :
          width >= 768  ? 768 :
          width >= 480  ? 480 :
                          320
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
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
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
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
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
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}


//Blogs
import { REQUEST_BLOGS, RECEIVE_BLOGS, SET_MORE_BLOG_POSTS} from '../actions'
const blogs = ( state = initState.blogs , action) => {
  switch(action.type){
    case REQUEST_BLOGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_BLOGS:
      let { posts, hot_posts, most_viewed_posts } = action.data
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        data: {
          posts,
          total_posts: posts.length,
          hot_posts,
          total_hot_posts: hot_posts.length,
          most_viewed_posts,
          total_most_viewed_posts: most_viewed_posts.length
        }
      })
    case SET_MORE_BLOG_POSTS:
      const postsLoaded = state.postsLoaded,
            postsCount = state.data.postsCount,
            next = postsLoaded + action.count > postsCount ? postsCount : postsLoaded + action.count
      return Object.assign({}, state, {
        postsLoaded : next
      })


    default:
      return state
  }
}

//Events
import { REQUEST_EVENTS, RECEIVE_EVENTS} from '../actions'
const events = ( state = initState.events , action) => {
  switch(action.type){
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}


// PAGE
import { SET_PAGE_LOADED } from '../actions/'
const page = ( state = initState.page, action ) => {
  switch(action.type) {
    case SET_PAGE_LOADED:
      return Object.assign({}, state, {
        loaded: action.state
      })
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





const appReducer = combineReducers({ artists, mainMenu, theme, signup , tours, albums, blogs, events, page})
export default appReducer





