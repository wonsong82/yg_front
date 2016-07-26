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


// EMAIL SIGNUP




