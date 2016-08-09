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



// PAGE
import { INIT_PAGE, SET_BLOGS_LIST, SET_HOT_POSTS_LIST, SET_POSTS_ALL_LOADED, SET_HOT_POSTS_ALL_LOADED } from '../actions/'
const page = ( state = initState.page, action ) => {
  switch(action.type){
    case INIT_PAGE:
      switch(action.pageType) {
        case 'Blog':
          return Object.assign({}, state, {
            type: 'blog',
            posts: [],
            postsAllLoaded: false,
            hotPosts: [],
            hotPostsAllLoaded: false
          })

        default:
          return state
      }

    case SET_BLOGS_LIST:
      return Object.assign({}, state, {
        posts: action.posts
      })

    case SET_HOT_POSTS_LIST:
      return Object.assign({}, state, {
        hotPosts: action.posts
      })


    case SET_POSTS_ALL_LOADED:
      return Object.assign({}, state, {
        postsAllLoaded: action.bool
      })

    case SET_HOT_POSTS_ALL_LOADED:
      return Object.assign({}, state, {
        hotPostsAllLoaded: action.bool
      })


    default:
      return state
  }
}






// DATA
import { SET_DATA_LOADED, REQUEST_BLOGS, RECEIVE_BLOGS } from '../actions'
const data = ( state = initState.data , action) => {
  switch(action.type){

    // SET ALL DATA LOADED
    case SET_DATA_LOADED:
      return Object.assign({}, state, {
        loaded: action.state
      })

    // BLOG
    case REQUEST_BLOGS:
      return Object.assign({}, state, {
        blogs: Object.assign({}, state.blogs, {isFetching: true})
      })

    case RECEIVE_BLOGS:
      let { posts, hot_posts, most_viewed_posts } = action.data
      return Object.assign({}, state, {
        blogs: Object.assign({}, state.blogs, {
          isFetching: false,
          loaded: true,
          contents: {
            posts,
            total_posts: posts.length,
            hot_posts,
            total_hot_posts: hot_posts.length,
            most_viewed_posts,
            total_most_viewed_posts: most_viewed_posts.length
          }
        })
      })


    default:
      return state
  }
}



/*// Tours
 import { REQUEST_TOURS, RECEIVE_TOURS } from '../actions/'
 const tours = ( state = initState.data.tours, action) => {
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
 }*/


/*
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


//MUSICS
import { REQUEST_MUSICS, RECEIVE_MUSICS} from '../actions'
const musics = ( state = initState.musics , action) => {
  switch(action.type){
    case REQUEST_MUSICS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_MUSICS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}


//Products
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS} from '../actions'
const products = ( state = initState.products , action) => {
  switch(action.type){
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}

//Promotions
import { REQUEST_PROMOTIONS, RECEIVE_PROMOTIONS} from '../actions'
const promotions = ( state = initState.promotions , action) => {
  switch(action.type){
    case REQUEST_PROMOTIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PROMOTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}


//Hot Tracks
import { REQUEST_HOTTRACKS, RECEIVE_HOTTRACKS} from '../actions'
const hottracks = ( state = initState.hottracks , action) => {
  switch(action.type){
    case REQUEST_HOTTRACKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HOTTRACKS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}

//Hot Blogs
import { REQUEST_HOTBLOGS, RECEIVE_HOTBLOGS} from '../actions'
const hotblogs = ( state = initState.hotblogs , action) => {
  switch(action.type){
    case REQUEST_HOTBLOGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HOTBLOGS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}



//Categories
import { REQUEST_PRODUCT_CATEGORIES, RECEIVE_PRODUCT_CATEGORIES} from '../actions'
const product_categories = ( state = initState.product_categories , action) => {
  switch(action.type){
    case REQUEST_PRODUCT_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PRODUCT_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        list: action.list
      })
    default:
      return state
  }
}
*/



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





const appReducer = combineReducers({ artists, mainMenu, theme, signup, data, page})
export default appReducer





