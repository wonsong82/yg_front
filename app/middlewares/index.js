import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { toArray, excerptStr, getData, getFacebookShareLink, getTwitterShareLink, loadImages } from '../functions/'
import { Site } from '../../env'
import moment from 'moment'


// APP
import { setResponsiveMode } from '../actions/'

export const handleResponsiveChange = () => (dispatch, getState) => {
  $(window).resize(function(){
    const width = $(window).width(),
      currentMode = getState().app.responsiveMode,
      mode = width >= 1280 ? 1280 : width >= 1024 ? 1024 : width >= 768 ? 768 : width >= 512 ? 512 : 320
    if(currentMode != mode) {
      dispatch(setResponsiveMode(mode))
    }
  })
}

export const redirect = to => () => {
  to && browserHistory.push(to)
}




// MAIN MENU
import { closeMainMenu, openMainMenu } from '../actions/'

export const toggleMainMenu = () => {
  return (dispatch, getState) => {
    let state = getState()
    if(state.mainMenu.opened)
      return dispatch(closeMainMenu())
    else
      return dispatch(openMainMenu())
  }
}


/***
 * PAGE
 */
import { LAYOUT_STYLE, getLayoutStyle } from '../functions/'

// PAGE:BLOG
import { setBlogsList, setHotPostsList, setPostsAllLoaded, setHotPostsAllLoaded } from '../actions/'

export const loadBlogsList = ( count ) => (dispatch, getState) => {
  const state = getState()

  if(state.page.type == 'blog'){
    const posts = state.page.posts,
      postsData = state.data.blogs.contents.posts_order.map(id =>
        state.data.blogs.contents.posts[id]
      ),
      postsDataCount = postsData.length

    let curCount  = posts.length
    let nextCount = curCount + count
    let newPosts = []
    var index = 0



    for( let key in postsData ) {
      if (postsData.hasOwnProperty(key)) {
        let post = postsData[key]
        let {id, post_title, url_friendly_name, excerpt, post_date, main_image, thumb_2x1, thumb_3x2} = post
        let url = Site + '/blog/' + url_friendly_name
        let path = '/blog/' + url_friendly_name
        newPosts.push({
          id,
          title: excerptStr(post_title),
          url: path,
          text: excerpt,
          date: post_date,
          image: main_image || false,
          thumb_3x2: thumb_3x2 || main_image || false,
          thumb_2x1: thumb_2x1 || main_image || false,
          facebookShareLink: getFacebookShareLink(url),
          twitterShareLink: getTwitterShareLink(url),
        })
        // 인덱스가 전체 데이타 인덱스의 마지막의 경우 || 카운트의 마지막일 경우
        if (postsDataCount - 1 == index || nextCount - 1 == index) {
          // 인덱스가 전체의 마지막일경우 뷰모어 안나오게 디스페치
          if (postsDataCount - 1 == index) {
            dispatch(setPostsAllLoaded(true))
          }
          break
        }
      }
      index++
    }
    dispatch(setBlogsList(newPosts))
  }
}

export const loadHotPostsList = ( count ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type == 'blog'){
    const posts = state.page.hotPosts,
      postsData = state.data.blogs.contents.hot_posts.map( id =>
        state.data.blogs.contents.posts[id]
      ),
      postsDataCount = postsData.length


    let curCount = posts.length
    let nextCount = curCount + count

    let newPosts = []
    var index = 0
    for( let key in postsData ) {
      if (postsData.hasOwnProperty(key)) {
        let post = postsData[key]
        let { id, post_title, url_friendly_name, excerpt, post_date } = post
        let url = '/blog/' + url_friendly_name
        newPosts.push({
          id,
          title: excerptStr(post_title, 90),
          url,
          text: excerpt,
          date: post_date,
        })
        // 인덱스가 전체 데이타 인덱스의 마지막의 경우 || 카운트의 마지막일 경우
        if (postsDataCount - 1 == index || nextCount - 1 == index) {
          // 인덱스가 전체의 마지막일경우 뷰모어 안나오게 디스페치
          if (postsDataCount - 1 == index) {
            dispatch(setHotPostsAllLoaded(true))
          }
          break
        }
      }
      index++
    }
    dispatch(setHotPostsList(newPosts))
  }
}


//PAGE:EVENT
import { setEventsList , setEventsAllLoaded} from '../actions/'

export const loadEventsList = ( layoutStyle=LAYOUT_STYLE.RANDOM ) => (dispatch, getState) => {
  const state = getState();
  if(state.page.type = 'event'){

    if(state.page.eventsAllLoaded) return true

    const events = state.page.events,
          eventsData = state.data.events.contents.eventsOrder.map(id =>
            state.data.events.contents.events[id]
          ),

          eventsDataCount = state.data.events.contents.eventsCount,
          artistsData = state.data.artists.contents.artists

    const count = 9
    let curCount = events.length * count
    let nextCount = curCount + count

    let newEvents = []
    layoutStyle = getLayoutStyle(layoutStyle, 6)

    let layoutNum = 1

    if(eventsDataCount > 0 && eventsDataCount > curCount){
      for(let i=curCount; i<nextCount; i++){

        let e = createEventThumb(eventsData[i], artistsData, layoutStyle, layoutNum)
        newEvents.push(e)

        layoutNum++

        if(eventsDataCount-1 == i){
          dispatch(setEventsAllLoaded(true))
          break
        }
      }
      dispatch(setEventsList(newEvents))
    }
  }
}


const createEventThumb = ( data, artistData, layoutStyle, layoutNum, curArtistId = null ) => {
  const { id, post_title, post_content, url_friendly_name, excerpt, post_date, main_image, thumb_3x2, thumb_1x1, artist_id } = data

  let artistId;

  if(curArtistId != null) artistId = curArtistId
  else artistId = artist_id[0]

  let artist = artistData[artistId];
  if(!artist){
    artist = {name:'', themeColor:'#f0f0f0', textColor:'#000000'}
  }

  let { name, themeColor, textColor } = artist

  return {
    id,
    title: excerptStr(post_title, 90),
    url: `/event/${url_friendly_name}`,
    text: post_content,
    excerpt,
    date: post_date,
    image: main_image,
    thumb3x2: thumb_3x2 || main_image || false,
    thumb1x1: thumb_1x1 || main_image || false,
    themeColor,
    textColor,
    layoutStyle,
    layoutNum,
    artistName: name
  }
}



// PAGE:SHOP
import {setProductsList , setProductsAllLoaded} from '../actions/'

export const loadProductsList = ( layoutStyle=LAYOUT_STYLE.RANDOM ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type == 'shop'){
    if(state.page.productsAllLoaded) return true
    const curCategory = state.page.selectedCategory == 0 ? null : state.page.selectedCategory
    // let productsData = toArray(state.data.shops.contents.products)'
    let productsData = state.data.shops.contents.productsOrder.map(id =>
      state.data.shops.contents.products[id]
    )

    if(curCategory != null){
      productsData = productsData.filter( product => {
        return product.cat_IDs.indexOf(curCategory) != -1
      })
    }

    const products = state.page.products,
          productsDataCount = productsData.length,
          artistsData = state.data.artists.contents.artists

    const count = 6
    let curCount = products.length * count
    let nextCount = curCount + count

    let newProducts = []
    layoutStyle = getLayoutStyle(layoutStyle, 8)

    let layoutNum = 1

    if(productsDataCount > 0 && productsDataCount > curCount){
      for(let i=curCount; i<nextCount; i++){

        let e = createProductThumb(productsData[i], artistsData, layoutStyle, layoutNum)
        newProducts.push(e)

        layoutNum++

        if(productsDataCount-1 == i){
          dispatch(setProductsAllLoaded(true))
          break
        }
      }

      dispatch(setProductsList(newProducts))
    }
  }
}

const createProductThumb = ( data, artistData, layoutStyle, layoutNum ) => {
  const {id, post_title, url_friendly_name, images, thumb_1x1, thumb_2x1, thumb_1x2, artist_id} = data
  const artistName = artist_id ? artistData[artist_id].name : 'YG'
  let price = null
  let originalPrice = null
  if(data.product_type == 'variable' && data.variation && data.variation.length){
    price = getProductPrice(data, data.variation[0]).price
    originalPrice = getProductPrice(data, data.variation[0]).originalPrice
  }
  else {
    price = getProductPrice(data).price
    originalPrice = getProductPrice(data).originalPrice
  }
  const image = images && images.length ? images[0] : false
  return {
    id,
    title: excerptStr(post_title, 90),
    url: `/shop/${url_friendly_name}`,
    artistName,
    thumb1x1: thumb_1x1 || image || false,
    thumb2x1: thumb_2x1 || image || false,
    thumb1x2: thumb_1x2 || image || false,
    price, originalPrice,
    layoutStyle,
    layoutNum
  }
}






import { setProductsListOnSearch } from '../actions/'
export const loadProductsListOnSearch = (keyword) => (dispatch, getState) => {
  const state = getState()

  if(state.page.type == 'shop'){
    let productsData = state.data.shops.contents.products,
        artistsData = state.data.artists.contents.artists

    productsData = toArray(productsData).filter(product => {
      let foundInTitle = true, foundInContent = true
      keyword.split(' ').forEach( e => {
        if(product.post_title.toLowerCase().indexOf(e.trim().toLowerCase()) == -1) foundInTitle = false
        if(product.post_content.toLowerCase().indexOf(e.trim().toLowerCase()) == -1) foundInContent = false
      })
      return foundInTitle || foundInContent
    })

    let layoutStyle = null,
        layoutNum = 1,
        count = 6

    productsData = productsData.map( product => {
      const { id, post_title, url_friendly_name, images, thumb_1x1, thumb_2x1, thumb_1x2, artist_id } = product
      const artistName = artistsData[artist_id].name
      const price = product.product_type == "simple" ?
        product._regular_price :
        product.variation[0].display_price
      const image = images && images.length ? images[0] : false
      const url = '/shop/' + url_friendly_name
      if(!layoutStyle || layoutNum > count){
        layoutStyle = getLayoutStyle(LAYOUT_STYLE.RANDOM, 8)
        layoutNum = 1
      }

      return {
        id,
        title: excerptStr(post_title, 90),
        url,
        artistName,
        thumb1x1: thumb_1x1 || image || false,
        thumb2x1: thumb_2x1 || image || false,
        thumb1x2: thumb_1x2 || image || false,
        price,
        layoutStyle,
        layoutNum: layoutNum++
      }
    })

    while (productsData.length){
      dispatch(setProductsListOnSearch(productsData.splice(0, count)))
    }
  }
}

import { setCategoriesList } from '../actions/'
export const loadCategoriesList = () => (dispatch, getState) => {
  dispatch(setCategoriesList(toArray(getState().data.shops.contents.categories)))
}


//PAGE:TOUR
import { setToursList, setToursAllLoaded } from '../actions/'
export const loadToursList = ( count ) => (dispatch, getState) => {
  const state = getState();
  if(state.page.type = 'tour'){

    const tours = state.page.tours,
        toursData = state.data.tours.contents.toursOrder.map(id =>
          state.data.tours.contents.tours[id]
        ),
        toursDataCount = state.data.tours.contents.toursCount,
        artistsData = state.data.artists.contents.artists

    let curCount = tours.length
    let nextCount = curCount + count

    let newTours = []
    var index = 0

    for(let key in toursData){
      if(toursData.hasOwnProperty(key)){
        let tour = toursData[key]

        let e = createTourThumb(tour, artistsData, 1, index+1 )
        newTours.push(e)

        if(toursDataCount-1 == index || nextCount-1 == index){
          if(toursDataCount-1 == index){
            dispatch(setToursAllLoaded(true))
          }
          break
        }
      }
      index++
    }
    dispatch(setToursList(newTours))
  }
}

const createTourThumb = ( data, artistData, layoutStyle, layoutNum ) => {
  const {id, post_title, subtitle, url_friendly_name, tour_schedule, start_date, end_date, main_image, thumb_3x2, thumb_1x1, thumb_2x1, artist_id } = data
  const { name, themeColor, textColor } = artistData[artist_id]
  return {
    id,
    title: post_title,
    subtitle: subtitle,
    url: `/tour/${url_friendly_name}`,
    thumb1x1: thumb_1x1 || main_image || false,
    thumb2x1: thumb_2x1 || main_image || false,
    thumb3x2: thumb_3x2 || main_image || false,
    schedule: tour_schedule,
    startDate: start_date,
    endDate: end_date,
    artistName: name,
    layoutStyle,
    layoutNum,
    themeColor,
    textColor
  }
}






//PAGE:MUSIC
import { setAlbumsList, setAlbumsAllLoaded, setHotTracksAllLoaded, setHotTracksList } from '../actions'

export const loadAlbumsList = (count=6) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type = 'music'){
    if(state.page.albumsAllLoaded) return true

    const albums = state.page.albums,
          // albumsData = toArray(state.data.musics.contents.albums),
          albumsData = state.data.musics.contents.albumsOrder.map(id =>
            state.data.musics.contents.albums[id]
          ),
          albumsDataCount = state.data.musics.contents.albumsCount,
          artistData = state.data.artists.contents.artists

    let curCount = albums.length * count
    let nextCount = curCount + count

    if(albumsDataCount > 0 && albumsDataCount > curCount){

      let newAlbums = [];
      let y = 1

      for(let i=curCount; i<nextCount; i++){
        newAlbums.push( createAlbumThumb( albumsData[i], artistData, 1, y ) )
        y++
        if(albumsDataCount-1 == i){
          dispatch(setAlbumsAllLoaded(true))
          break
        }
      }

      dispatch(setAlbumsList(newAlbums))
    }
  }
}


const createAlbumThumb = ( albumData, artistData, layoutStyle, layoutNum ) => {
  const {id, post_title, url_friendly_name, thumb_1x1, cover_image, individual_name, artist_id } = albumData

  const artistName = artist_id ? artistData[artist_id].name : '';

  const name  = individual_name || artistName


  return {
    id,
    title: excerptStr(post_title, 90),
    url: `/music/${url_friendly_name}`,
    image: thumb_1x1 || cover_image || false,
    artistName: name,
    layoutStyle,
    layoutNum
  }
}

export const loadHotTracksList = (count=6) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type == 'music'){
    if(state.page.hotTracksAllLoaded) return true

    const hotTracks = state.page.hotTracks,
          hotTracksData = state.data.musics.contents.hotTracks.map( id => state.data.musics.contents.musics[id] ),
          hotTracksDataCount = state.data.musics.contents.hotTracksCount,
          artistsData = state.data.artists.contents.artists,
          albumsData = state.data.musics.contents.albums

    let curCount = hotTracks.length * count
    let nextCount = curCount + count

    if(hotTracksDataCount > 0 && hotTracksDataCount > curCount){

      let newHotTracks = []

      for(let i=curCount; i<nextCount; i++){
        newHotTracks.push( createHotTrackThumb(hotTracksData[i], albumsData, artistsData, i+1) )
        if(hotTracksDataCount-1 == i){
          dispatch(setHotTracksAllLoaded(true))
          break
        }
      }

      dispatch(setHotTracksList(newHotTracks))
    }
  }
}

const createHotTrackThumb = ( hotTrackData, albumsData, artistsData, orderID=1 ) => {

  const { id, post_title, post_content, sample_link, album_id, youtube_link, _regular_price, _sale_price } = hotTrackData
  const { cover_image, thumb_1x1, url_friendly_name, individual_name, artist_id } = albumsData[album_id]

  const artistName = artist_id ? artistsData[artist_id].name : '';
  const name  = individual_name || artistName


  return {
    id,
    title: excerptStr(post_title, 90),
    subtitle: post_content,
    url: `/music/${url_friendly_name}`,
    image: thumb_1x1 || cover_image || false,
    artistName: name,
    sampleLink: sample_link,
    youtubeLink: youtube_link,
    orderID,
    price: _sale_price || _regular_price
  }
}

//PAGE:PROMOTION
import {setPromotions_list} from '../actions'
export const loadPromotionsList = () => (dispatch, getState) => {
  const state = getState();
  if(state.page.type == 'promotion'){

    const {tours, albums, events, products} = state.data.promotions.contents
    const toursData = state.data.tours.contents.tours,
          albumsData = state.data.musics.contents.albums,
          eventsData = state.data.events.contents.events,
          productsData = state.data.shops.contents.products,
          artistsData = state.data.artists.contents.artists

    let i=1;
    let newTours = []
    for(let key in tours){
      if(tours.hasOwnProperty(key)){
        const tour = toursData[tours[key].id]
        let e = createTourThumb(tour, artistsData, 1, i)
        e.url = `/promotion${e.url}`
        newTours.push(e)
        i++
      }
    }

    i = 1
    let newAlbums = []
    for(let key in albums){
      if(albums.hasOwnProperty(key)) {
        const album = albumsData[albums[key].id]
        let e = createAlbumThumb(album, artistsData, 1, i)
        e.url = `/promotion${e.url}`
        newAlbums.push(e)
        i++
      }
    }

    i = 1
    let newEvents = []
    for(let key in events){
      if(events.hasOwnProperty(key)) {
        let event = eventsData[events[key].id]
        let e = createEventThumb(event, artistsData, 1, i)
        e.url = `/promotion${e.url}`
        newEvents.push(e)
        i++
      }
    }

    i = 1
    let newProducts = []
    for(let key in products){
      if(products.hasOwnProperty(key)) {
        let product = productsData[products[key].id]
        let e = createProductThumb(product, artistsData, 1, i)
        e.url = `/promotion${e.url}`
        newProducts.push(e)
        i++
      }
    }

    let promotions = {tours: newTours, albums: newAlbums, products: newProducts, events: newEvents}

    dispatch(setPromotions_list(promotions))
  }
}


//PAGE:ARTIST
import { initPage, setArtistPage, setAlbumsByArtist, setAlbumsByArtistAllLoaded, setToursByArtist, setToursByArtistAllLoaded, setProductsByArtist, setProductsByArtistAllLoaded, setHotTracksByArtist, setHotTracksByArtistAllLoaded, setEventsByArtist, setEventsByArtistAllLoaded, setSNSByArtist, setSNSByArtistAllLoaded } from '../actions/'
import {artistInitState} from '../initialState'

export const initArtistPage = ( name ) => (dispatch,getState) => {
  // 먼저 artistPageInitState 으로 페이지를 만든다
  dispatch( initPage('Artist') )

  const state = getState()
  if(state.page.type != 'artist') return true

  let activeIndex = 0

  const artistsData = state.data.artists.contents.artistsOrder.map(id =>
    state.data.artists.contents.artists[id]
  )

  const artists = artistsData.map((artist, i) => {
    if(artist.urlFriendlyName == name){
      activeIndex = i
    }
    return { index: i, ...artist, ...artistInitState }
  })

  // 그다음 page 를 artistInitState 으로 만든다
  dispatch( setArtistPage({ activeIndex, artists }) )
}


export const loadToursByArtist = ( index, count=1 ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]
  if(artist.toursAllLoaded) return true

  const tours   = artist.tours,
        data = state.data.tours.contents.toursOrder.map(id =>
          state.data.tours.contents.tours[id]
        ).filter( e => e.artist_id == artist.id ),

        dataCount = data.length,
        artistData = state.data.artists.contents.artists

  let curCount = tours.length,
      nextCount = curCount + count

  if(dataCount > 0 && dataCount > curCount){
    let list = []; let y = 1
    for(let i=curCount; i<nextCount; i++){
      let e = createTourThumb(data[i], artistData, 1, y)
      e.url = `/artist/${artist.urlFriendlyName}${e.url}`
      list.push(e)
      y++
      if(dataCount-1 == i){
        dispatch(setToursByArtistAllLoaded(index, true))
      }
    }

    dispatch(setToursByArtist(index, list))
  }
}

export const loadProductsByArtist = ( index, layoutStyle=LAYOUT_STYLE.RANDOM, count=6 ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]
  if(artist.productsAllLoaded) return true

  const products    = artist.products,
        data        = state.data.shops.contents.productsOrder.map(id =>
                        state.data.shops.contents.products[id]
                      ).filter( e => e.artist_id == artist.id ),
        dataCount   = data.length,
        artistData  = state.data.artists.contents.artists

  let curCount = products.length * count,
      nextCount = curCount + count

  layoutStyle = getLayoutStyle(layoutStyle, 8)
  let layoutNum = 1

  if(dataCount > 0 && dataCount > curCount){
    let list = []
    for(let i=curCount; i<nextCount; i++){
      let e = createProductThumb(data[i], artistData, layoutStyle, layoutNum)
      e.url = `/artist/${artist.urlFriendlyName}${e.url}`
      list.push(e)
      layoutNum++

      if(dataCount-1 == i){
        dispatch(setProductsByArtistAllLoaded(index, true))
        break;
      }
    }

    dispatch(setProductsByArtist(index, list))
  }
}


export const loadAlbumsByArtist = ( index, count=6 ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]
  if(artist.albumsAllLoaded) return true

  const albums  = artist.albums,
        data    = state.data.musics.contents.albumsOrder.map(id=>state.data.musics.contents.albums[id])
                    .filter( e => e.artist_id == artist.id ),
        dataCount = data.length,
        artistData = state.data.artists.contents.artists

  let curCount  = albums.length * count,
      nextCount = curCount + count

  if(dataCount > 0 && dataCount > curCount){
    let list = []; let y=1
    for(let i=curCount; i<nextCount; i++){
      let e = createAlbumThumb(data[i], artistData, 1, y)
      e.url = `/artist/${artist.urlFriendlyName}${e.url}`
      list.push(e)
      y++
      if(dataCount-1 == i){
          dispatch(setAlbumsByArtistAllLoaded(index, true))
        break
      }
    }

    dispatch(setAlbumsByArtist(index, list))
  }
}


export const loadHotTracksByArtist = ( index, count=6 ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]
  if(artist.hotTracksAllLoaded) return true

  const hotTracks   = artist.hotTracks,
        albumData   = state.data.musics.contents.albums,
        data        = state.data.musics.contents.hotTracks
                        .map( id => state.data.musics.contents.musics[id] )
                        .filter( music => albumData[music.album_id].artist_id == artist.id ),
        dataCount   = data.length,
        artistData  = state.data.artists.contents.artists

  let curCount  = hotTracks.length * count
  let nextCount = curCount + count

  if(dataCount > 0 && dataCount > curCount){
    let list = []
    for(let i=curCount; i<nextCount; i++){
      let e = createHotTrackThumb(data[i], albumData, artistData, i+1)
      e.url = `/artist/${artist.urlFriendlyName}${e.url}`
      list.push(e)
      if(dataCount-1 == i){
        dispatch(setHotTracksByArtistAllLoaded(index, true))
        break
      }
    }

    dispatch(setHotTracksByArtist(index, list))
  }
}


export const loadEventsByArtist = ( index,layoutStyle=LAYOUT_STYLE.RANDOM,  count=9 ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]
  if(artist.eventsAllLoaded) return true

  const events      = artist.events,
        data        = state.data.events.contents.eventsOrder.map(id=>state.data.events.contents.events[id])
                      .filter( e => e.artist_id.indexOf(artist.id) != -1 ),
        dataCount   = data.length,
        artistData  = state.data.artists.contents.artists




  let curCount = events.length * count,
      nextCount = curCount + count

  layoutStyle = getLayoutStyle(layoutStyle, 6)
  let layoutNum = 1

  if(dataCount > 0 && dataCount > curCount){
    let list = []
    for(let i=curCount; i<nextCount; i++){
      let e = createEventThumb(data[i], artistData, layoutStyle, layoutNum, artist.id)
      e.url = `/artist/${artist.urlFriendlyName}${e.url}`
      list.push(e)
      layoutNum++

      if(dataCount-1 == i){
        dispatch(setEventsByArtistAllLoaded(index, true))
        break;
      }
    }

    dispatch(setEventsByArtist(index, list))
  }
}

export const loadSNSByArtist = (index) => (dispatch, getState) => {

  const state = getState()
  if(state.page.type != 'artist') return true
  const artist = state.page.artists[index]

  const data = state.data.socialFeeds.contents.feeds[artist.id],
    dataCount = data && data.length

  let list = [];

  if(dataCount > 0){

    for(let i=0; i<dataCount; i++){
      const {type, created_at, url, username, image, profile_image, text} = data[i];

      list.push({
        type,
        data: created_at,
        url,
        username,
        image,
        profile_image,
        text
      })
    }
  }

  dispatch(setSNSByArtist(index, list))
}


  /***
 * POPUP
 */
// POPUP:BLOG
import { setBlogPopup } from '../actions/'
export const loadBlogPopup = ( name ) => (dispatch, getState) => {
  const state = getState()
  if(state.popup.type === 'blog'){
    let thisBlog = toArray(state.data.blogs.contents.posts)
      .filter( e => e.url_friendly_name == name )
    if(thisBlog.length){
      let {id, post_title, url_friendly_name, post_date, main_image, post_content, related_blog } = thisBlog[0]
      let url = Site + '/blog/' + url_friendly_name
      const blog = {
        title: post_title,
        date: post_date,
        image: main_image || false,
        content: post_content,
        facebookShareLink: getFacebookShareLink(url),
        twitterShareLink: getTwitterShareLink(url)
      }
      const related = related_blog.map( id => {
        let e = state.data.blogs.contents.posts[id]
        let path = '/blog/' + e.url_friendly_name
        return {
          id: e.id,
          title: e.post_title,
          url: path,
          text: excerptStr(e.post_title),
          date: e.post_date,
          image: e.main_image || false,
          thumb_2x1: e.thumb_2x1 || e.main_image || false,
          thumb_3x2: e.thumb_3x2 || e.main_image || false,
          facebookShareLink: getFacebookShareLink(Site + path),
          twitterShareLink: getTwitterShareLink(Site + path)
        }
      })
      dispatch(setBlogPopup(blog, related))
    }
  }
}

//POPUP:EVENT
import { setEventPopup }  from '../actions/'
export const loadEventPopup = (name) => (dispatch, getState) => {
  const state = getState()
  if(state.popup.type === 'event'){
    let thisEvent = toArray(state.data.events.contents.events)
      .filter( event => event.url_friendly_name == name)

    if(thisEvent.length){
      let {post_title, url_friendly_name, post_date, main_image, post_content, related_event } = thisEvent[0]
      let url = Site + '/event/' + url_friendly_name
      const event = {
        title: post_title,
        date: post_date,
        image: main_image,
        content: post_content,
        facebookShareLink: getFacebookShareLink(url),
        twitterShareLink: getTwitterShareLink(url)
      }

      const related = related_event.map ( id => {
        let e = state.data.events.contents.events[id]
        const { themeColor, textColor } = state.data.artists.contents.artists[e.artist_id[0]]
        let path = '/event/' + e.url_friendly_name
        return {
          id: e.id,
          title: excerptStr(e.post_title, 90),
          url: path,
          text: e.post_content,
          date: post_date,
          themeColor: themeColor,
          textColor: textColor,
          image: e.main_image || false,
          thumb3x2: e.thumb_3x2 || e.main_image || false
        }
      })
      dispatch(setEventPopup(event, related))
    }
  }
}


//POPUP:TOUR
import { setTourPopup }  from '../actions/'
export const loadTourPopup = (name) => (dispatch, getState) => {
  const state = getState()
  if(state.popup.type === 'tour'){
    let thisTour = toArray(state.data.tours.contents.tours)
      .filter( tour => tour.url_friendly_name == name)

    if(thisTour.length){
      let {start_date, end_date, post_title, subtitle, post_content, main_image, url_friendly_name, tour_schedule, tour_calendar} = thisTour[0]
      let artist = state.data.artists.contents.artists[thisTour[0].artist_id]
      let {themeColor, textColor, name} = artist
      let calendarMonth = moment('2016-' + tour_calendar[0].date.replace('/','-')).format('MMMM')

      let url = Site + '/tour/' + url_friendly_name
      const tour = {
        startDate: start_date,
        endDate: end_date,
        title: post_title,
        subtitle: subtitle,
        image: main_image,
        content: post_content,
        facebookShareLink: getFacebookShareLink(url),
        twitterShareLink: getTwitterShareLink(url),
        schedule: tour_schedule,
        calendarMonth,
        calendar: tour_calendar,
        themeColor: themeColor,
        textColor: textColor,
        artistName: name
      }

      dispatch(setTourPopup(tour))
    }
  }
}


//POPUP:MUSIC
import { setMusicPopup }  from '../actions/'
export const loadMusicPopup = (name) => (dispatch, getState) => {
  const state = getState()
  if(state.popup.type === 'music'){
    let thisMusic = toArray(state.data.musics.contents.albums)
      .filter( album => album.url_friendly_name == name)

    if(thisMusic.length){
      let {id, post_title, cover_image, post_content, url_friendly_name , related_album } = thisMusic[0]

      let products = toArray(state.data.musics.contents.musicsOrder).map(
        id => state.data.musics.contents.musics[id]
      ).filter( product => product.album_id == id)

      let albumProduct = products.filter(product => product.product_type == 'album')
      let musicsProduct = products.filter(product => product.product_type == 'music')

      let artistName = state.data.artists.contents.artists[thisMusic[0].artist_id].name
      let individualName = thisMusic[0].individual_name || ''
      let name = individualName || artistName


      let index = 0
      const trackList = musicsProduct.map ( track => {
        const {id, _regular_price, _sale_price, post_title, post_content, sample_link, youtube_link} = track
        index++
        return {
          id,
          title: excerptStr(post_title, 90),
          subtitle: post_content,
          artistName: name,
          sampleLink: sample_link,
          youtubeLink: youtube_link,
          orderID: index,
          price: _sale_price || _regular_price
        }
      })

      let albumPrice = albumProduct.length > 0 ? albumProduct[0]._regular_price : ''
      let albumSalePrice = albumProduct.length > 0 ? albumProduct[0]._sale_price : ''
      let albumProductId = albumProduct.length > 0 ? albumProduct[0].id : ''

      let url = Site + '/music/' + url_friendly_name




      const music = {
        image: cover_image,
        title: post_title,
        albumPrice,
        albumSalePrice,
        albumProductId,
        name,
        content: post_content,
        facebookShareLink: getFacebookShareLink(url),
        twitterShareLink: getTwitterShareLink(url),
        music: trackList
      }

      const related = related_album.map ( id => {
        let e = state.data.musics.contents.albums[id]
        let artistName = state.data.artists.contents.artists[e.artist_id].name
        let path = '/music/' + e.url_friendly_name
          return {
            id: e.id,
            title: e.post_title,
            url: path,
            image: e.cover_image || false,
            thumb_1x1: e.thumb_1x1 || e.cover_image || false,
            name: artistName
          }
        })

      dispatch(setMusicPopup(music,related))
    }
  }
}



//POPUP:SHOP
import { setShopPopup, setSelectedOption, setSelectedOptions, setOptions, setProductImages, setProductPrice, setVariationId }  from '../actions/'
import { getDefaultOptions, getProductOptions, findProductVariation, getProductImages, getProductPrice } from '../functions/'
export const loadShopPopup = (name) => (dispatch, getState) => {

  const state = getState();

  if(state.popup.type === 'shop'){
     let thisShop = toArray(state.data.shops.contents.products)
       .filter( product => product.url_friendly_name == name)

    if(thisShop.length){
      const productData = thisShop[0]
      let { id, post_title:title, post_content:content, url_friendly_name, related } = productData
      let artistName = productData.artist_id ? state.data.artists.contents.artists[productData.artist_id].name : 'YG'
      let url = '/shop/' + url_friendly_name
      let productType = ''
      let selectedOptions = getDefaultOptions(productData)
      let options = getProductOptions(productData, selectedOptions)
      let variation = false

      if(productData.product_type == 'variable' && productData.variation){
        productType = 'variable'
        variation = findProductVariation(productData.variation, selectedOptions)
      }
      else if(productData.product_type == 'simple'){
        productType = 'simple'
      }

      let images = getProductImages( productData, variation )
      let { price, originalPrice } = getProductPrice( productData, variation )

      const product = {
        id,
        title,
        content,
        images,
        artistName,
        facebookShareLink: getFacebookShareLink(Site + url),
        twitterShareLink: getTwitterShareLink(Site + url),
        type: productType,
        price,
        originalPrice,
        options,
        selectedOptions
      }


      related = related.map ( id => {

        let e = state.data.shops.contents.products[id]
        let path = '/shop/' + e.url_friendly_name
        let { name } = state.data.artists.contents.artists[e.artist_id]
        let image = e.images && e.images.length ? e.images[0] : false
        let price = null
        if(e.product_type == 'variable' && e.variation && e.variation.length){
          price = getProductPrice(e, e.variation[0]).price
        } else {
          price = getProductPrice(e).price
        }

        return {
          id : e.id,
          title: excerptStr(e.post_title, 90),
          url: path,
          artistName: name,
          thumb1x1: e.thumb_1x1 || image || false,
          thumb2x1: e.thumb_2x1 || image || false,
          thumb1x2: e.thumb_1x2 || image || false,
          price,
          facebookShareLink: getFacebookShareLink(Site + path),
          twitterShareLink: getTwitterShareLink(Site + path)
        }
      })


      dispatch(setShopPopup(product, related))
    }
  }
}

export const changeProductOption = ( optionName, optionValue, optionEnabled ) => (dispatch, getState) => {
  const { popup, data } = getState()
  const product = data.shops.contents.products[popup.id]

  if( optionValue == 'select' ){
    let { selectedOptions } = getState().popup
    let newSelectedOptions = { ...selectedOptions }
    delete newSelectedOptions[optionName]
    dispatch( setSelectedOptions( newSelectedOptions ))
    let options = getProductOptions( product, getState().popup.selectedOptions )
    dispatch( setOptions( options ))
  }

  else if( optionEnabled == 'enabled' ){
    dispatch( setSelectedOption(optionName, optionValue) )
    let { selectedOptions } = getState().popup
    let options = getProductOptions( product, selectedOptions )
    dispatch( setOptions( options ))
  }

  else {
    let newSelectedOptions = {}
    newSelectedOptions[optionName] = optionValue
    dispatch( setSelectedOptions( newSelectedOptions ))
    let options = getProductOptions( product, getState().popup.selectedOptions )
    dispatch( setOptions( options ))
  }


  if(product.variation){
    let variation = findProductVariation(product.variation, getState().popup
      .selectedOptions )
    let variationId = variation.variation_id

    dispatch( setProductImages( getProductImages(product, variation) ))
    let { price, originalPrice } = getProductPrice(product, variation)
    dispatch( setProductPrice( price, originalPrice ) )
    dispatch( setVariationId (variationId))
  }

}







/***
 * DATA SECTION
 */

// DATA:ARTIST
import { requestArtists, receiveArtists, setMainMenuArtistList, startApp } from '../actions/'
export const getArtistsData = () => ( dispatch, getState ) => {
  const state = getState().data.artists
  let shouldFetch = !( state.loaded || (!state.loaded && state.isFetching) )
  if(shouldFetch){
    dispatch(requestArtists())
    return fetch('/api/getArtists', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => {
        dispatch(receiveArtists(json))

        let artistsData = json.artists_order.map(id =>
          json.artists[id]
        )

        dispatch(setMainMenuArtistList( artistsData ))
        let imagesToLoad = []
        for( let key in artistsData ) {
          if(artistsData.hasOwnProperty(key)) {
            if(artistsData[key].bg) {
              imagesToLoad.push(artistsData[key].bg)
            }
          }
        }
        loadImages(imagesToLoad, ()=>{
          dispatch(startApp())
        })
      })
  }
  else {
    return Promise.resolve()
  }
}

// DATA:BLOG
import { requestBlogs, receiveBlogs } from '../actions/'
export const getBlogsData = () => (dispatch, getState) => getData('/api/getBlogs', getState().data.blogs, requestBlogs, receiveBlogs, dispatch, fetch)

// DATA:EVENT
import { requestEvents, receiveEvents } from '../actions/'
export const getEventsData = () => (dispatch, getState) => getData('/api/getEvents', getState().data.events, requestEvents, receiveEvents, dispatch, fetch)

// DATA:TOUR
import {requestTours, receiveTours} from '../actions'
export const getToursData = () => (dispatch, getState) =>getData('/api/getTours', getState().data.tours, requestTours, receiveTours, dispatch, fetch)

// DATA:MUSIC
import {requestMusics, receiveMusics} from '../actions'
export const getMusicsData = () => (dispatch, getState) =>getData('/api/getMusics', getState().data.musics, requestMusics, receiveMusics, dispatch, fetch)

// DATA:SHOP
import {requestShops, receiveShops} from '../actions'
export const getShopsData = () => (dispatch, getState) =>getData('/api/getShops', getState().data.shops, requestShops, receiveShops, dispatch, fetch)

// DATA:PROMOTION
import {requestPromotions, receivePromotions} from '../actions'
export const getPromotionsData = () => (dispatch, getState) =>getData('/api/getPromotions', getState().data.promotions, requestPromotions, receivePromotions, dispatch, fetch)

// DATA:SOCIAL FEEDS
import {requestSocialFeeds, receiveSocialFeeds} from '../actions'
export const getSocialFeedsData = () => (dispatch, getState) =>getData('/api/getSocialFeeds', getState().data.socialFeeds, requestSocialFeeds, receiveSocialFeeds, dispatch, fetch)


// DATA:ALL
import { setDataLoaded } from '../actions/'
export const getAllData = () => (dispatch, getState) => {
  const datas = [ 'artists', 'blogs', 'events', 'tours', 'musics', 'shops', 'promotions', 'socialFeeds' ]
  let timer = setInterval(()=>{
    let state = getState().data
    if(datas.filter( data => state[data].loaded ).length === datas.length){
      dispatch(setDataLoaded(true))
      clearInterval(timer)

      dispatch(getProductsInCart())
    }
  }, 150)

  datas.map( data => {
    dispatch(eval('get' + data[0].toUpperCase() + data.slice(1) + 'Data')())
  })
}


// CART
import { openCart, closeCart } from '../actions/'
export const toggleCart = () => (dispatch, getState) => {
  return getState().cart.opened ?
    dispatch(closeCart()) :
    dispatch(openCart())
}



import {requestGetCarts, receiveGetCarts, requestAddToCart, receiveAddToCart, getProductsInCart, requestRemoveCart, receiveRemoveCart, showBlockFilm, hideBlockFilm } from '../actions'
export const _getProductsInCart = () => (dispatch, getState) => {
  getData('/api/getProductsInCart', getState().cart, requestGetCarts, receiveGetCarts, dispatch, fetch, ()=> dispatch(hideBlockFilm()) )
}


export const _addProductsToCart = (productId, variationId, qty) => (dispatch, getState) => {

  let state = getState()
  let shouldFetch = !state.cart.isFetching
  if(shouldFetch){
    dispatch(requestAddToCart())
    dispatch(showBlockFilm())
    fetch('/api/addProductsToCart', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'product_id' : productId,
        'variation_id' : variationId,
        'qty': qty
      })
    }).then(response => {
        dispatch(receiveAddToCart())
      if(response.status == 200){
        dispatch(requestGetCarts())
        return fetch('/api/getProductsInCart', {credentials: 'same-origin'})
          .then(response => response.json())
          .then(json => {
            dispatch(receiveGetCarts(json))
            dispatch(hideBlockFilm())
          })
      }
    })
  }
}


export const _removeProductInCart = (productId, variationId) => (dispatch, getState) => {

  let state = getState()
  let shouldFetch = !state.cart.isFetching
  if(shouldFetch){
    dispatch(requestRemoveCart())
    dispatch(showBlockFilm())
    fetch('/api/deleteProductsInCart', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'product_id' : productId,
        'variation_id' : variationId
      })
    }).then(response => {
      dispatch(receiveRemoveCart())
      if(response.status == 200){
        dispatch(requestGetCarts())
        return fetch('/api/getProductsInCart', {credentials: 'same-origin'})
          .then(response => response.json())
          .then(json => {
            dispatch(receiveGetCarts(json))
            dispatch(hideBlockFilm())
          })
      }
    })
  }
}

export const _updateProductInCart = (productId, variationId, qty) => (dispatch, getState) => {
  let state = getState()
  let shouldFetch = !state.cart.isFetching
  if(shouldFetch){
    dispatch(requestAddToCart())
    dispatch(showBlockFilm())
    fetch('/api/updateProductsInCart', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'product_id' : productId,
        'variation_id' : variationId,
        'qty': qty
      })
    }).then(response => {
      dispatch(receiveAddToCart())
      if(response.status == 200){
        dispatch(requestGetCarts())
        return fetch('/api/getProductsInCart', {credentials: 'same-origin'})
          .then(response => response.json())
          .then(json => {
            dispatch(receiveGetCarts(json))
            dispatch(hideBlockFilm())
          })
      }
    })
  }
}



// export const getProductsInCart = () => ( dispatch, getState ) => {
//   const state = getState().cart
//   let shouldFetch = !( state.loaded || (!state.loaded && state.isFetching) )
//   if(shouldFetch){
//     dispatch(getCarts())
//     return fetch('/api/getProductsInCart')
//       .then(response => response.json())
//       .then(json => {
//         dispatch(receiveArtists(json))
//
//         let imagesToLoad = []
//         for( let key in json ) {
//           if(json.hasOwnProperty(key)) {
//             imagesToLoad.push(json[key].bg)
//           }
//         }
//         loadImages(imagesToLoad, ()=>{
//           dispatch(startApp())
//         })
//       })
//   }
//   else {
//     return Promise.resolve()
//   }
// }
