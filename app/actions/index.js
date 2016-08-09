import fetch from 'isomorphic-fetch'
const Middlewares = require('../middlewares/')


// THEME
export const SET_THEME_COLOR = 'set_theme_color'
export const SET_RESPONSIVE_MODE = 'set_responsive_mode'
export const setThemeColor = (themeColor, textColor) => ({ type: SET_THEME_COLOR, themeColor, textColor })
export const setResponsiveMode = width => ({ type: SET_RESPONSIVE_MODE, width })
export const handleResponsiveChange = Middlewares.handleResponsiveChange


// MAIN MENU
export const OPEN_MAIN_MENU = 'open_main_menu'
export const CLOSE_MAIN_MENU = 'close_main_menu'
export const TOGGLE_MAIN_MENU = 'toggle_main_menu'
export const ENABLE_MAIN_MENU = 'enable_main_menu'
export const DISABLE_MAIN_MENU = 'disable_main_menu' 
export const openMainMenu = () => ({ type: OPEN_MAIN_MENU })
export const closeMainMenu = () => ({ type: CLOSE_MAIN_MENU })
export const enableMainMenu = () => ({ type: ENABLE_MAIN_MENU })
export const disableMainMenu = () => ({ type: DISABLE_MAIN_MENU })
export const toggleMainMenu = Middlewares.toggleMainMenu



// ARTISTS
export const REQUEST_ARTISTS = 'request_artists'
export const RECEIVE_ARTISTS = 'receive_artists'
export const requestArtists = () => ({ type: REQUEST_ARTISTS })
export const receiveArtists = artistsList => ({ type: RECEIVE_ARTISTS, list: artistsList })
export const fetchArtists = Middlewares.fetchArtists
export const getArtistsList = Middlewares.getArtistsList




/***
 * PAGE
 */
// PAGE:PAGE
export const INIT_PAGE = 'init_page'
export const initPage = pageType => ({ type: INIT_PAGE, pageType })


// PAGE:BLOG
export const SET_BLOGS_LIST = 'set_blog_list'
export const SET_HOT_POSTS_LIST = 'set_hot_posts_list'
export const SET_POSTS_ALL_LOADED = 'set_posts_all_loaded'
export const SET_HOT_POSTS_ALL_LOADED = 'set_hot_posts_all_loaded'
export const setBlogsList      = posts => ({ type: SET_BLOGS_LIST, posts })
export const setHotPostsList   = posts => ({ type: SET_HOT_POSTS_LIST, posts })
export const setPostsAllLoaded = bool  => ({ type: SET_POSTS_ALL_LOADED, bool })
export const setHotPostsAllLoaded = bool  => ({ type: SET_HOT_POSTS_ALL_LOADED, bool })
export const loadBlogsList = Middlewares.loadBlogsList
export const loadHotPostsList = Middlewares.loadHotPostsList




/**
 * DATA
 * : ajax data related
 */
export const SET_DATA_LOADED = 'set_data_loaded'
export const setDataLoaded = state => ({ type: SET_DATA_LOADED, state })

// DATA:BLOG
export const REQUEST_BLOGS = 'request_blogs'
export const RECEIVE_BLOGS = 'receive_blogs'
export const requestBlogs = ()      => ({type: REQUEST_BLOGS})
export const receiveBlogs = (json)  => ({type: RECEIVE_BLOGS, data: json})
export const getBlogsData = Middlewares.getBlogsData












/*
//Events
export const REQUEST_EVENTS = 'request_events';
export const RECEIVE_EVENTS = 'receive_events';
export const requestEvents = () => {
  return{
    type: REQUEST_EVENTS
  }
}
export const receiveEvents = (eventsList) => {
  return{
    type: RECEIVE_EVENTS,
    list: eventsList
  }
}
export const getEventsList = () => {
  return (dispatch, getState) => {
    let state = getState()
    let shouldFetch
    const { events } = state

    shouldFetch = !(events.loaded || (!events.loaded && events.isFetching))

    if(shouldFetch){
      dispatch(requestEvents())
      return fetch('/api/getEvents')
          .then(response => response.json())
          .then(json => dispatch(receiveEvents(json)))
    }else{
      return Promise.resolve()
    }
  }
}






//Musics
export const REQUEST_MUSICS = 'request_musics';
export const RECEIVE_MUSICS = 'receive_musics';
export const requestMusics = () => {
    return{
        type: REQUEST_MUSICS
    }
}
export const receiveMusics = (musicsList) => {
    return{
        type: RECEIVE_MUSICS,
        list: musicsList
    }
}
export const getMusicsList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { musics } = state

        shouldFetch = !(musics.loaded || (!musics.loaded && musics.isFetching))

        if(shouldFetch){
            dispatch(requestMusics())
            return fetch('/api/getMusics')
                .then(response => response.json())
                .then(json => dispatch(receiveMusics(json)))
        }else{
            return Promise.resolve()
        }
    }
}


//Products
export const REQUEST_PRODUCTS = 'request_products';
export const RECEIVE_PRODUCTS = 'receive_products';
export const requestProducts = () => {
    return{
        type: REQUEST_PRODUCTS
    }
}
export const receiveProducts = (productsList) => {
    return{
        type: RECEIVE_PRODUCTS,
        list: productsList
    }
}
export const getProductsList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { products } = state

        shouldFetch = !(products.loaded || (!products.loaded && products.isFetching))

        if(shouldFetch){
            dispatch(requestProducts())
            return fetch('/api/getProducts')
                .then(response => response.json())
                .then(json => dispatch(receiveProducts(json)))
        }else{
            return Promise.resolve()
        }
    }
}


//Promotions
export const REQUEST_PROMOTIONS = 'request_promotions';
export const RECEIVE_PROMOTIONS = 'receive_promotions';
export const requestPromotions = () => {
    return{
        type: REQUEST_PROMOTIONS
    }
}
export const receivePromotions = (promotionsList) => {
    return{
        type: RECEIVE_PROMOTIONS,
        list: promotionsList
    }
}
export const getPromotionsList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { promotions } = state

        shouldFetch = !(promotions.loaded || (!promotions.loaded && promotions.isFetching))

        if(shouldFetch){
            dispatch(requestPromotions())
            return fetch('/api/getPromotions')
                .then(response => response.json())
                .then(json => dispatch(receivePromotions(json)))
        }else{
            return Promise.resolve()
        }
    }
}

//HotTracks
export const REQUEST_HOTTRACKS = 'request_hot_tracks';
export const RECEIVE_HOTTRACKS = 'receive_hot_tracks';
export const requestHotTracks = () => {
    return{
        type: REQUEST_HOTTRACKS
    }
}
export const receiveHotTracks = (hotTracksList) => {
    return{
        type: RECEIVE_HOTTRACKS,
        list: hotTracksList
    }
}
export const getHotTracksList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { hottracks } = state

        shouldFetch = !(hottracks.loaded || (!hottracks.loaded && hottracks.isFetching))

        if(shouldFetch){
            dispatch(requestHotTracks())
            return fetch('/api/getHotTracks')
                .then(response => response.json())
                .then(json => dispatch(receiveHotTracks(json)))
        }else{
            return Promise.resolve()
        }
    }
}


//Hot Blogs
export const REQUEST_HOTBLOGS = 'request_hot_blogs';
export const RECEIVE_HOTBLOGS = 'receive_hot_blogs';
export const requestHotBlogs = () => {
    return{
        type: REQUEST_HOTBLOGS
    }
}
export const receiveHotBlogs = (hotBlogsList) => {
    return{
        type: RECEIVE_HOTBLOGS,
        list: hotBlogsList
    }
}
export const getHotBlogsList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { hotblogs } = state

        shouldFetch = !(hotblogs.loaded || (!hotblogs.loaded && hotblogs.isFetching))

        if(shouldFetch){
            dispatch(requestHotBlogs())
            return fetch('/api/getHotBlogs')
                .then(response => response.json())
                .then(json => dispatch(receiveHotBlogs(json)))
        }else{
            return Promise.resolve()
        }
    }
}



//Categories
export const REQUEST_PRODUCT_CATEGORIES = 'request_product_categories';
export const RECEIVE_PRODUCT_CATEGORIES = 'receive_product_categories';
export const requestProductCategories = () => {
    return{
        type: REQUEST_PRODUCT_CATEGORIES
    }
}
export const receiveProductCategories = (hotProductCategoriesList) => {
    return{
        type: RECEIVE_PRODUCT_CATEGORIES,
        list: hotProductCategoriesList
    }
}
export const getProductCategoriesList = () => {
    return (dispatch, getState) => {
        let state = getState()
        let shouldFetch
        const { product_categories } = state

        shouldFetch = !(product_categories.loaded || (!product_categories.loaded && product_categories.isFetching))

        if(shouldFetch){
            dispatch(requestProductCategories())
            return fetch('/api/getProductCategories')
                .then(response => response.json())
                .then(json => dispatch(receiveProductCategories(json)))
        }else{
            return Promise.resolve()
        }
    }
}
*/

/*
 // TOUR
 export const REQUEST_TOURS = 'request_tours'
 export const RECEIVE_TOURS = 'receive_tours'
 export const requestTours = () => {
 return {
 type : REQUEST_TOURS
 }
 }
 export const receiveTours = (toursList) => {
 return {
 type : RECEIVE_TOURS,
 list : toursList
 }
 }
 export const getToursList = () => {
 return (dispatch, getState) => {
 let state = getState()
 let shouldFetch
 const { tours } = state
 //var tours = state.tours

 shouldFetch = !(tours.loaded || (!tours.loaded && tours.isFetching))

 if(shouldFetch){
 dispatch(requestTours())
 return fetch('/api/getTours')
 .then(response => response.json())
 .then(json =>
 {
 dispatch(receiveTours(json))
 })
 }else{
 return Promise.resolve()
 }
 }
 }


 //Albums
 export const REQUEST_ALBUMS = 'request_albums';
 export const RECEIVE_ALBUMS = 'receive_albums';
 export const requestAlbums = () => {
 return{
 type: REQUEST_ALBUMS
 }
 }
 export const receiveAlbums = (albumsList) => {
 return{
 type: RECEIVE_ALBUMS,
 list: albumsList
 }
 }
 export const getAlbumsList = () => {
 return (dispatch, getState) => {
 let state = getState()
 let shouldFetch
 const { albums } = state

 shouldFetch = !(albums.loaded || (!albums.loaded && albums.isFetching))

 if(shouldFetch){
 dispatch(requestAlbums())
 return fetch('/api/getAlbums')
 .then(response => response.json())
 .then(json => dispatch(receiveAlbums(json)))
 }else{
 return Promise.resolve()
 }
 }
 }*/




// EMAIL SIGNUP
export const NEWSLETTER_SIGNUP_REQUEST = 'newsletter_signup_request'
export const NEWSLETTER_SIGNUP_RECEIVE = 'newsletter_signup_receive'
export const newsletterSignupRequest = () => {
  return {
    type: NEWSLETTER_SIGNUP_REQUEST
  }
}
export const newsletterSignupReceive = ( code, data ) => {
  return {
    type: NEWSLETTER_SIGNUP_RECEIVE,
    code,
    data
  }
}
export const newsletterSignup = ( email ) => {
  return ( dispatch, getState ) => {
    let state = getState()
    let shoudFetch = !state.signup.isLoading
    if(shoudFetch){
      dispatch(newsletterSignupRequest())
      fetch('/api/newsletterSignup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email
        })
      })
        .then(response => {
          dispatch(newsletterSignupReceive())
          let code = response.status
          // todo: status related dispatch ....
          console.log(code)
        })
    }
    else {
      return Promise.resolve()
    }
  }
}






