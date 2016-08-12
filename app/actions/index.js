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






