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
        events: [...state.events, action.events]
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
        products: [...state.products, action.products]
      })

    case SET_PRODUCTS_LIST_ON_SEARCH:
      return Object.assign({}, state, {
        products: [...state.products, action.products],
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



// POPUP
import { INIT_POPUP, SET_BLOG_POPUP , SET_EVENT_POPUP, SET_TOUR_POPUP, SET_MUSIC_POPUP, SET_SHOP_POPUP, SET_SELECTED_OPTION, SET_SELECTED_OPTIONS, SET_OPTIONS, SET_PRODUCT_IMAGES, SET_PRODUCT_PRICE, SET_VARIATION_ID } from '../actions/'
import { blogPopupInitState, eventPopupInitState, tourPopupInitState , musicPopupInitState, shopPopupInitState} from '../initialState'
const popup = ( state = initState.popup, action ) => {
  switch(action.type){

    case INIT_POPUP:
      switch(action.popupType){
        case 'Blog':
          return { ...state, ...blogPopupInitState }
        case 'Event':
          return { ...state, ...eventPopupInitState }
        case 'Tour':
          return { ...state, ...tourPopupInitState }
        case 'Music':
          return { ...state, ...musicPopupInitState }
        case 'Shop' :
          return { ...state, ...shopPopupInitState }
        default:
          return state
      }

    case SET_BLOG_POPUP:
      return { ...state, ...action.blog, related: action.related }

    case SET_EVENT_POPUP:
      return { ...state, ...action.event, related: action.related }

    case SET_TOUR_POPUP:
      return { ...state, ...action.tour }

    case SET_MUSIC_POPUP:
      return { ...state, ...action.music, related: action.related }


    // SHOP
    case SET_SHOP_POPUP:
      return { ...state, ...action.product, related: action.related }

    case SET_SELECTED_OPTION:
      let newValue = {}
      newValue[action.name] = action.value
      return { ...state, selectedOptions: { ...state.selectedOptions, ...newValue }}

    case SET_SELECTED_OPTIONS:
      return { ...state, selectedOptions: action.options }

    case SET_OPTIONS:
      return { ...state, options: action.options }

    case SET_PRODUCT_IMAGES:
      return { ...state, images: action.images }

    case SET_PRODUCT_PRICE:
      return { ...state, price: action.price, originalPrice: action.originalPrice }

    case SET_VARIATION_ID:
      return {...state, curVariationId: action.variationId}

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
      let { posts, hot_posts} = action.data
      return Object.assign({}, state, {
        blogs: Object.assign({}, state.blogs, {
          isFetching: false,
          loaded: true,
          contents: {
            posts: posts || {},
            total_posts: posts ? Object.keys(posts).length : 0,
            hot_posts: hot_posts || [],
            total_hot_posts: hot_posts ? hot_posts.length : 0
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
            events: events || {},
            eventsCount: events ? Object.keys(events).length : 0
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
            tours: tours || {},
            toursCount: tours ? Object.keys(tours).length : 0
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
            albums: albums || {},
            albumsCount: albums ? Object.keys(albums).length : 0,
            musics: musics || {},
            musicsCount: musics ? Object.keys(musics).length : 0,
            hotTracks: hotTracks || [],
            hotTracksCount: hotTracks ? hotTracks.length : 0
          }
        })
      })

    case REQUEST_SHOPS:
      return Object.assign({}, state, {
        shops: Object.assign({}, state.shops, {isFetching: true})
      })

    case RECEIVE_SHOPS:
      let { products, categories } = action.data

      return Object.assign({}, state, {
        shops: Object.assign({}, state.shops, {
          isFetching: false,
          loaded: true,
          contents: {
            products: products || {},
            productsCount: products ? Object.keys(products).length : 0,
            categories: categories || [],
            categoriesCount: categories ? Object.keys(categories).length : 0,
          }
        })
      })

    default:
      return state
  }
}




//CART
import { REQUEST_GET_CARTS, RECEIVE_GET_CARTS, REQUEST_ADD_TO_CART, RECEIVE_ATT_TO_CART, REQUEST_REMOVE_CART, RECEIVE_REMOVE_CART } from '../actions/'
const cart = ( state = initState.cart , action) => {
  switch(action.type) {
    case REQUEST_GET_CARTS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_GET_CARTS:
      let music = action.products.music || []
      let product = action.products.product || []

      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        products: { music, product },
        productsCount: music.length + product.length
      })
    case REQUEST_ADD_TO_CART:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_ATT_TO_CART:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: false
      })

    case REQUEST_REMOVE_CART:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_REMOVE_CART:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: false
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





const appReducer = combineReducers({ mainMenu, app, signup, data, page, popup, cart})
export default appReducer





