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




// ARTISTS
export const REQUEST_ARTISTS = 'request_artists'
export const requestArtists = () => {
  return {
    type: REQUEST_ARTISTS
  }
}
export const RECEIVE_ARTISTS = 'receive_artists'
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


