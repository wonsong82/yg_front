import fetch from 'isomorphic-fetch'


// THEME
export const SET_THEME_COLOR = 'set_theme_color'
export const setThemeColor = (themeColor, textColor) => {
  return {
    type: SET_THEME_COLOR,
    themeColor,
    textColor
  }
}


// MAIN MENU
export const OPEN_MAIN_MENU = 'open_main_menu'
export const CLOSE_MAIN_MENU = 'close_main_menu'
export const TOGGLE_MAIN_MENU = 'toggle_main_menu'
export const ENABLE_MAIN_MENU = 'enable_main_menu'
export const DISABLE_MAIN_MENU = 'disable_main_menu' 

export const openMainMenu = () => {
  return {
    type: OPEN_MAIN_MENU
  }
}
export const closeMainMenu = () => {
  return {
    type: CLOSE_MAIN_MENU
  }
}
export const enableMainMenu = () => {
  return {
    type: ENABLE_MAIN_MENU
  }
}
export const disableMainMenu = () => {
  return {
    type: DISABLE_MAIN_MENU
  }
}
export const toggleMainMenu = () => {
  return (dispatch, getState) => {
    let state = getState()
    if(state.mainMenu.opened)
      return dispatch(closeMainMenu())
    else
      return dispatch(openMainMenu())
  }
}


// ARTISTS
export const REQUEST_ARTISTS = 'request_artists'
export const RECEIVE_ARTISTS = 'receive_artists'
export const requestArtists = () => {
  return {
    type: REQUEST_ARTISTS
  }
}
export const receiveArtists = (artistsList) => {
  return {
    type: RECEIVE_ARTISTS,
    list: artistsList
  }
}
// ThunkMiddleware
export const fetchArtists = () => {
  return function(dispatch){
    dispatch(requestArtists())
    return fetch('/api/getArtists')
      .then(response => response.json())
      .then(json => dispatch(receiveArtists(json)))
  }
}
export const getArtistsList = () => {
  return (dispatch, getState) => {
    let state = getState()
    let shouldFetch
    const { artists } = state
    shouldFetch = !(artists.loaded || (!artists.loaded && artists.isFetching))

    if(shouldFetch)
      return dispatch(fetchArtists())
    else
      return Promise.resolve() // polyfill
  }
}

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
}



//Blogs
export const REQUEST_BLOGS = 'request_blogs';
export const RECEIVE_BLOGS = 'receive_blogs';
export const requestBlogs = () => {
  return{
    type: REQUEST_BLOGS
  }
}
export const receiveBlogs = (blogsList) => {
  return{
    type: RECEIVE_BLOGS,
    list: blogsList
  }
}
export const getBlogsList = () => {
  return (dispatch, getState) => {
    let state = getState()
    let shouldFetch
    const { blogs } = state

    shouldFetch = !(blogs.loaded || (!blogs.loaded && blogs.isFetching))

    if(shouldFetch){
      dispatch(requestBlogs())
      return fetch('/api/getBlogs')
          .then(response => response.json())
          .then(json => dispatch(receiveBlogs(json)))
    }else{
      return Promise.resolve()
    }
  }
}

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






