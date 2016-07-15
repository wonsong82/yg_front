import fetch from 'isomorphic-fetch'



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


// THUNK
export const getArtists = () => {
  return function(dispatch){
    dispatch(requestArtists())

    return fetch('/api/getArtists')
      .then(response => response.json())
      .then(json => dispatch(receiveArtists(json)))
  }
}

export const getArtistsIfNeeded = () => {
  return (dispatch, getState) => {
    let state = getState()
    let shouldFetch
    const { artists } = state

    if(artists.isFetching){
      shouldFetch = false
    }
    else if (!artists.list.length){
      shouldFetch = true
    }

    if(shouldFetch){
      return dispatch(getArtists())
    }
    else {
      return Promise.resolve() // polyfill
    }
  }
}


