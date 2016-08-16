const Middlewares = require('../middlewares/')


// APP
export const SET_THEME_COLOR = 'set_theme_color'
export const SET_RESPONSIVE_MODE = 'set_responsive_mode'
export const START_APP = 'start_app'
export const SET_CLICK_POSITION = 'set_click_position'
export const setThemeColor = (themeColor, textColor) => ({ type: SET_THEME_COLOR, themeColor, textColor })
export const setResponsiveMode = width => ({ type: SET_RESPONSIVE_MODE, width })
export const startApp = () => ({ type: START_APP })
export const setClickPosition = ( x, y ) => ({ type: SET_CLICK_POSITION, x, y })
export const handleResponsiveChange = Middlewares.handleResponsiveChange
export const redirect = Middlewares.redirect


// MAIN MENU
export const OPEN_MAIN_MENU = 'open_main_menu'
export const CLOSE_MAIN_MENU = 'close_main_menu'
export const TOGGLE_MAIN_MENU = 'toggle_main_menu'
export const ENABLE_MAIN_MENU = 'enable_main_menu'
export const DISABLE_MAIN_MENU = 'disable_main_menu'
export const SET_MAIN_MENU_ARTIST_LIST = 'set_main_menu_artist_list'
export const openMainMenu = () => ({ type: OPEN_MAIN_MENU })
export const closeMainMenu = () => ({ type: CLOSE_MAIN_MENU })
export const enableMainMenu = () => ({ type: ENABLE_MAIN_MENU })
export const disableMainMenu = () => ({ type: DISABLE_MAIN_MENU })
export const setMainMenuArtistList = ( artists ) => ({ type: SET_MAIN_MENU_ARTIST_LIST, artists })
export const toggleMainMenu = Middlewares.toggleMainMenu





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


// PAGE:EVENT
export const SET_EVENTS_LIST = 'set_events_list'
export const SET_EVENTS_ALL_LOADED = 'set_events_all_loaded'
export const setEventsList = events => ({ type: SET_EVENTS_LIST, events})
export const setEventsAllLoaded = bool => ({ type: SET_EVENTS_ALL_LOADED, bool})
export const loadEventsList = Middlewares.loadEventsList


//PAGE:TOUR
export const SET_TOURS_LIST = 'set_tours_list'
export const SET_TOURS_ALL_LOADED = 'set_tours_all_loaded'
export const setToursList = tours => ({type: SET_TOURS_LIST, tours})
export const setToursAllLoaded = bool => ({type: SET_TOURS_ALL_LOADED, bool})
export const loadToursList = Middlewares.loadToursList

//PAGE:MUSIC
export const SET_ALBUMS_LIST = 'set_albums_list'
export const SET_HOT_TRACKS_LIST = 'set_hot_tracks_list'
export const SET_ALBUMS_ALL_LOADED = 'set_albums_all_loaded'
export const SET_HOT_TRACKS_ALL_LOADED = 'set_hot_tracks_all_loaded'
export const setAlbumsList = albums => ({type: SET_ALBUMS_LIST, albums})
export const setHotTracksList = hotTracks => ({type: SET_HOT_TRACKS_LIST, hotTracks})
export const setAlbumsAllLoaded = bool => ({type: SET_ALBUMS_ALL_LOADED, bool})
export const setHotTracksAllLoaded = bool => ({type: SET_HOT_TRACKS_ALL_LOADED, bool})
export const loadAlbumsList = Middlewares.loadAlbumsList
export const loadHotTracksList = Middlewares.loadHotTracksList

//PAGE:SHOP
export const SET_CATEGORIES_LIST = 'set_categories_list'
export const SET_PRODUCTS_LIST = 'set_products_list'
export const SET_PRODUCTS_LIST_ON_SEARCH = 'set_products_list_on_search'
export const SET_PRODUCTS_ALL_LOADED = 'set_products_all_loaded'
export const SET_CATEGORY = 'set_category'
export const SEARCHING_REQUEST = 'searching_request'
export const setCategoriesList = categories => ({type: SET_CATEGORIES_LIST, categories})
export const setProductsList = products => ({type: SET_PRODUCTS_LIST, products})
export const setProductsListOnSearch = products => ({type: SET_PRODUCTS_LIST_ON_SEARCH, products})
export const setProductsAllLoaded = bool => ({type:SET_PRODUCTS_ALL_LOADED, bool})
export const setCategory = categoryId => ({type: SET_CATEGORY, categoryId})
export const loadProductsList = Middlewares.loadProductsList
export const loadCategoriesList = Middlewares.loadCategoriesList
export const loadProductsListOnSearch = Middlewares.loadProductsListOnSearch










/***
 * POPUP
 */
// POPUP
export const INIT_POPUP = 'init_popup'
export const initPopup = popupType => ({ type: INIT_POPUP, popupType })

// POPUP:BLOG
export const SET_BLOG_POPUP = 'set_blog_popup'
export const setBlogPopup = ( blog, related ) => ({type: SET_BLOG_POPUP, blog, related})
export const loadBlogPopup = Middlewares.loadBlogPopup


// POPUP:EVENT
export const SET_EVENT_POPUP = 'set_event_popup'
export const setEventPopup = ( event, related) => ({type: SET_EVENT_POPUP, event, related})
export const loadEventPopup = Middlewares.loadEventPopup

// POPUP:TOUR
export const SET_TOUR_POPUP = 'set_tour_popup'
export const setTourPopup = ( tour) => ({type: SET_TOUR_POPUP, tour})
export const loadTourPopup = Middlewares.loadTourPopup

// POPUP:MUSIC
export const SET_MUSIC_POPUP = 'set_music_popup'
export const setMusicPopup = ( music, related ) => ({type: SET_MUSIC_POPUP, music, related})
export const loadMusicPopup = Middlewares.loadMusicPopup

// POPUP:SHOP
export const SET_SHOP_POPUP = 'set_shop_popup'
export const setShopPopup = ( product, related ) => ({type: SET_SHOP_POPUP, product, related})
export const loadShopPopup = Middlewares.loadShopPopup


/**
 * DATA
 * : ajax data related
 */
export const SET_DATA_LOADED = 'set_data_loaded'
export const setDataLoaded = state => ({ type: SET_DATA_LOADED, state })

// DATA:ARTIST
export const REQUEST_ARTISTS = 'request_artists'
export const RECEIVE_ARTISTS = 'receive_artists'
export const requestArtists = () => ({ type: REQUEST_ARTISTS })
export const receiveArtists = json => ({ type: RECEIVE_ARTISTS, data: json })
export const getArtistsData = Middlewares.getArtistsData



// DATA:BLOG
export const REQUEST_BLOGS = 'request_blogs'
export const RECEIVE_BLOGS = 'receive_blogs'
export const requestBlogs = ()    => ({type: REQUEST_BLOGS})
export const receiveBlogs = json  => ({type: RECEIVE_BLOGS, data: json})
export const getBlogsData = Middlewares.getBlogsData

// DATA:EVENT
export const REQUEST_EVENTS = 'request_events'
export const RECEIVE_EVENTS = 'receive_events'
export const requestEvents = () => ({type: REQUEST_EVENTS})
export const receiveEvents = (json) => ({type: RECEIVE_EVENTS, data: json})
export const getEventsData = Middlewares.getEventsData

// DATA:TOUR
export const REQUEST_TOURS = 'request_tours'
export const RECEIVE_TOURS = 'receive_tours'
export const requestTours = () => ({type: REQUEST_TOURS})
export const receiveTours = (json) => ({type: RECEIVE_TOURS, data: json})
export const getToursData = Middlewares.getToursData

// DATA:MUSIC
export const REQUEST_MUSICS = 'request_musics'
export const RECEIVE_MUSICS = 'receive_musics'
export const requestMusics = () => ({type: REQUEST_MUSICS})
export const receiveMusics = (json) => ({type: RECEIVE_MUSICS, data: json})
export const getMusicsData = Middlewares.getMusicsData

// DATA:SHOP
export const REQUEST_SHOPS = 'request_shops'
export const RECEIVE_SHOPS = 'receive_shops'
export const requestShops = () => ({type: REQUEST_SHOPS})
export const receiveShops = (json) => ({type: RECEIVE_SHOPS, data: json})
export const getShopsData = Middlewares.getShopsData

// DATA:ALL
export const getAllData = Middlewares.getAllData





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






