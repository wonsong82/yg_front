import { combineReducers } from 'redux'
import initState from '../initialState'


// APP
import { SET_THEME_COLOR, SET_RESPONSIVE_MODE, START_APP, SET_CLICK_POSITION } from '../actions/'
const app = ( state = initState.app, action ) => {
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
    case START_APP:
      return Object.assign({}, state, {
        startApp: true
      })
    case SET_CLICK_POSITION:
      const { x, y } = action
      return Object.assign({}, state, {
        clickPosition: { x, y }
      })

    default:
      return state
  }
}


// MAIN MENU
import { OPEN_MAIN_MENU, CLOSE_MAIN_MENU, ENABLE_MAIN_MENU, DISABLE_MAIN_MENU, SET_MAIN_MENU_ARTIST_LIST } from '../actions/'
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
    case SET_MAIN_MENU_ARTIST_LIST:
      return Object.assign({}, state, {
        artistList: action.artists
      })
    default:
      return state
  }
}




// PAGE
import { INIT_PAGE, SET_BLOGS_LIST, SET_HOT_POSTS_LIST, SET_POSTS_ALL_LOADED, SET_HOT_POSTS_ALL_LOADED,
                    SET_EVENTS_LIST, SET_EVENTS_ALL_LOADED, SET_TOURS_LIST, SET_TOURS_ALL_LOADED,
                    SET_ALBUMS_LIST, SET_ALBUMS_ALL_LOADED, SET_HOT_TRACKS_LIST, SET_HOT_TRACKS_ALL_LOADED,
                    SET_PRODUCTS_LIST, SET_PRODUCTS_ALL_LOADED, SET_CATEGORY, SET_CATEGORIES_LIST,
                    SET_PRODUCTS_LIST_ON_SEARCH, SEARCHING_REQUEST
} from '../actions/'

import { blogInitState , eventInitState, tourInitState, musicInitState, shopInitState} from '../initialState'
const page = ( state = initState.page, action ) => {
  switch(action.type){
    case INIT_PAGE:
      switch(action.pageType) {
        case 'Blog':
          return Object.assign({}, state, blogInitState)

        case 'Event':
          return Object.assign({}, state, eventInitState)

        case 'Tour':
          return Object.assign({}, state, tourInitState)

        case 'Music':
          return Object.assign({}, state, musicInitState)

        case 'Shop':
          return Object.assign({}, state, shopInitState)

        default:
          return state
      }

    //BLOG
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

    //EVENT
    case SET_EVENTS_LIST:
      return Object.assign({}, state, {
        events: action.events
      })

    case SET_EVENTS_ALL_LOADED:
      return Object.assign({}, state, {
        eventsAllLoaded: action.bool
      })

    //TOUR
    case SET_TOURS_LIST:
      return Object.assign({}, state, {
        tours: action.tours
      })

    case SET_TOURS_ALL_LOADED:
      return Object.assign({}, state, {
        toursAllLoaded: action.bool
      })

    //MUSIC
    case SET_ALBUMS_LIST:
      return Object.assign({}, state,{
        albums: action.albums
      })

    case SET_ALBUMS_ALL_LOADED:
      return Object.assign({}, state, {
        albumsAllLoaded: action.bool
      })

    case SET_HOT_TRACKS_LIST:
      return Object.assign({}, state, {
        hotTracks: action.hotTracks
      })

    case SET_HOT_TRACKS_ALL_LOADED:
      return Object.assign({}, state, {
        hotTracksAllLoaded: action.bool
      })

    //SHOP
    case SET_PRODUCTS_LIST:
      return Object.assign({}, state, {
        products: action.products
      })

    case SET_PRODUCTS_LIST_ON_SEARCH:
      return Object.assign({}, state, {
        products: action.products,
        productsAllLoaded: true
      })

    case SET_PRODUCTS_ALL_LOADED:
      return Object.assign({}, state, {
        productsAllLoaded: action.bool
      })

    case SET_CATEGORIES_LIST:
      return Object.assign({}, state, {
        categories: action.categories
      })

    case SET_CATEGORY:
      return Object.assign({}, state, {
        selectedCategory: action.categoryId
      })

    default:
      return state
  }
}






// DATA
import { SET_DATA_LOADED, REQUEST_ARTISTS, RECEIVE_ARTISTS, REQUEST_BLOGS, RECEIVE_BLOGS , REQUEST_EVENTS, RECEIVE_EVENTS, REQUEST_TOURS, RECEIVE_TOURS , REQUEST_MUSICS, RECEIVE_MUSICS, REQUEST_SHOPS, RECEIVE_SHOPS } from '../actions'
const data = ( state = initState.data , action) => {
  switch(action.type){

    // SET ALL DATA LOADED
    case SET_DATA_LOADED:
      return Object.assign({}, state, {
        loaded: action.state
      })

    // ARTIST
    case REQUEST_ARTISTS:
      return Object.assign({}, state, {
        artists: Object.assign({}, state.artists, {isFetching: true})
      })
    case RECEIVE_ARTISTS:
      let artistsList = action.data
      return Object.assign({}, state, {
        artists: Object.assign({}, state.artists, {
          isFetching: false,
          loaded: true,
          contents: {
            artists: artistsList
          }
        })
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

    //EVENT
    case REQUEST_EVENTS:

      return Object.assign({}, state, {
        events: Object.assign({}, state.events, {isFetching: true})
      })

    case RECEIVE_EVENTS:
      let events  = action.data
      return Object.assign({}, state, {
        events: Object.assign({}, state.events, {
          isFetching: false,
          loaded: true,
          contents: {
            events,
            eventsCount: Object.keys(events).length
          }
        })
      })

    //TOUR
    case REQUEST_TOURS:
      return Object.assign({}, state, {
        tours: Object.assign({}, state.tours, {isFetching: true})
      })

    case RECEIVE_TOURS:
      let tours = action.data
      return Object.assign({}, state, {
        tours: Object.assign({}, state.tours,{
          isFetching: false,
          loaded: true,
          contents: {
            tours,
            toursCount: Object.keys(tours).length
          }
        })
      })

    //MUSIC
    case REQUEST_MUSICS:
      return Object.assign({}, state, {
        musics: Object.assign({}, state.musics, {isFetching: true})
      })

    case RECEIVE_MUSICS:
      let { albums, musics, hotTracks } = action.data
      return Object.assign({}, state, {
        musics: Object.assign({}, state.musics, {
          isFetching: false,
          loaded: true,
          contents: {
            albums,
            albumsCount: Object.keys(albums).length,
            musics,
            musicsCount: Object.keys(musics).length,
            hotTracks,
            hotTracksCount: Object.keys(hotTracks).length
          }
        })
      })

    case REQUEST_SHOPS:
      return Object.assign({}, state, {
        shops: Object.assign({}, state.shops, {isFetching: true})
      })

    case RECEIVE_SHOPS:
      let { products, categories } = action.data

        console.log(action.data)

      return Object.assign({}, state, {
        shops: Object.assign({}, state.shops, {
          isFetching: false,
          loaded: true,
          contents: {
            products,
            productsCount: Object.keys(products).length,
            categories,
            categoriesCount: Object.keys(categories).length,
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





const appReducer = combineReducers({ mainMenu, app, signup, data, page})
export default appReducer





