export const toArray = obj => Object.keys(obj).map(key => obj[key])
export const excerptStr = ( string, length=120 ) => string.length > length ? string.substr(0, length) + '...' : string


/***
 * 맞는 띰칼라 찾기
 */
export const computeThemeColor = ( props ) => {

  const artists = toArray(props.data.artists.contents.artists)
  const { item, name } = props.params
  const defaultTheme = { themeColor: '#f0f0f0', textColor: '#000000' }

  if(!artists.length)
    return defaultTheme

  if( !item ){ // 페이지
    if ( name ){ // 아티스트 페이지
      let found = artists.filter( artist => {
        return name === artist.urlFriendlyName
      })
      if(found.length){ // 아티스트 찾을경우
        return {
          themeColor: found[0].themeColor,
          textColor: found[0].textColor
        }
      }
      else { // 아티스트 없을경우
        return defaultTheme
      }
    }
    else { // 다른 페이지
      return defaultTheme
    }
  }

  else { // 팝업
    if(!props.routes[1]) // 잘못된 라우트
      return defaultTheme

    let type = props.routes[1].path.match(/(blog|shop|music|tour|event)\/:item$/i)[1]
    switch(type){
      case 'blog':
        return defaultTheme
      case 'event':
        if(!props.data.events.contents.events) return defaultTheme
        let data = toArray(props.data.events.contents.events)
        let found = data.filter( e => {
          return item === e.url_friendly_name
        })
        if(!found.length) return defaultTheme
        let { themeColor, textColor } = props.data.artists.contents.artists[found[0].artist_id]
        return { themeColor, textColor }

      default:
        return defaultTheme
    }
  }
}



export const getData = ( apiURL, state, onStart, onComplete, dispatch, fetch ) => {
  let shouldFetch = !( state.loaded || (!state.loaded && state.isFetching) )
  if(shouldFetch){
    dispatch(onStart())
    return fetch(apiURL)
      .then(response => response.json())
      .then(json => dispatch(onComplete(json)))
  }
  else {
    return Promise.resolve()
  }
}



export const getFacebookShareLink = ( url ) => {
  return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
}

export const getTwitterShareLink = ( url ) => {
  return 'https://twitter.com/home?status=' + encodeURIComponent(url)
}


export const loadImages = ( images, callback ) => {
  images instanceof Array || (images = [images])
  const count = images.length
  var loaded = 0
  for( let i=0; i<count; i++ ){
    var img = document.createElement('img')
    img.onload = () => {
      loaded++
      loaded >= count && typeof callback === 'function' && callback()
    }
    img.src = images[i]
  }
}

















