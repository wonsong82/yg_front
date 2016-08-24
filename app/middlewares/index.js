import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { toArray, excerptStr, getData, getFacebookShareLink, getTwitterShareLink, loadImages } from '../functions/'
import { Site } from '../../env'
import dateformat from 'dateformat'


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
      postsData = state.data.blogs.contents.posts,
      postsDataCount = Object.keys(postsData).length
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
          eventsData = toArray(state.data.events.contents.events),
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

        const { id, post_title, post_content, url_friendly_name, excerpt, post_date, main_image, thumb_3x2, thumb_1x1, artist_id } = eventsData[i]
        const { themeColor, textColor } = artistsData[artist_id]
        const url = '/event/' + url_friendly_name

        newEvents.push({
          id,
          title:  excerptStr(post_title, 90),
          url,
          text: post_content,
          excerpt,
          date: post_date,
          image: main_image,
          thumb3x2: thumb_3x2 || main_image || false,
          thumb1x1: thumb_1x1 || main_image || false,
          themeColor,
          textColor,
          layoutStyle,
          layoutNum
        })
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


// PAGE:SHOP
import {setProductsList , setProductsAllLoaded} from '../actions/'

export const loadProductsList = ( layoutStyle=LAYOUT_STYLE.RANDOM ) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type == 'shop'){
    if(state.page.productsAllLoaded) return true
    const curCategory = state.page.selectedCategory == 0 ? null : state.page.selectedCategory
    let productsData = toArray(state.data.shops.contents.products)
    if(curCategory != null){
      productsData = productsData.filter( product => {
        return product.cat_IDs.indexOf(curCategory) != -1
      })
    }

    const products = state.page.products,
          productsDataCount = productsData.length,//productsData.legnth
          artistsData = state.data.artists.contents.artists

    const count = 6
    let curCount = products.length * count
    let nextCount = curCount + count

    let newProducts = []
    layoutStyle = getLayoutStyle(layoutStyle, 8)

    let layoutNum = 1

    for(let i=curCount; i<nextCount; i++){

      const product = productsData[i]
      const { id, post_title, url_friendly_name, images, thumb_1x1, thumb_2x1, thumb_1x2, artist_id } = product
      const artistName = artistsData[artist_id].name
      let price = null
      if(product.product_type == 'variable' && product.variation && product.variation.length){
        price = getProductPrice(product, product.variation[0]).price
      } else {
        price = getProductPrice(product).price
      }
      const url = '/shop/' + url_friendly_name
      const image = images && images.length ? images[0] : false

      newProducts.push({
        id,
        title: excerptStr(post_title, 90),
        url,
        artistName,
        thumb1x1: thumb_1x1 || image || false,
        thumb2x1: thumb_2x1 || image || false,
        thumb1x2: thumb_1x2 || image || false,
        price,
        layoutStyle,
        layoutNum
      })

      layoutNum++

      if(productsDataCount-1 == i){
        dispatch(setProductsAllLoaded(true))
        break
      }
    }
    dispatch(setProductsList(newProducts))
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
        toursData = state.data.tours.contents.tours,
        toursDataCount = state.data.tours.contents.toursCount,
        artistsData = state.data.artists.contents.artists

    let curCount = tours.length
    let nextCount = curCount + count

    let newTours = []
    var index = 0;

    for(let key in toursData){
      if(toursData.hasOwnProperty(key)){
        let tour = toursData[key]
        let { themeColor, textColor } = artistsData[tour.artist_id]
        let artistName = artistsData[tour.artist_id].name

        let {id, post_title, subtitle, url_friendly_name, tour_schedule, start_date:startDate, end_date:endDate, thumb_3x2, thumb_1x1, thumb_2x1, main_image:image} = tour
        let url = '/tour/' + url_friendly_name

        newTours.push({
          id,
          title: post_title,
          subtitle,
          url,
          thumb1x1: thumb_1x1 || image || false,
          thumb2x1: thumb_2x1 || image || false,
          thumb3x2: thumb_3x2 || image || false,
          schedule: tour_schedule,
          startDate,
          endDate,
          artistName,
          themeColor,
          textColor
        })

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

//PAGE:MUSIC
import { setAlbumsList, setAlbumsAllLoaded } from '../actions'
export const loadAlbumsList = (count) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type = 'music'){
    if(state.page.albumsAllLoaded) return true
    const albums = state.page.albums,
          albumsData = state.data.musics.contents.albums,
          albumsDataCount = state.data.musics.contents.albumsCount,
          artistData = state.data.artists.contents.artists

    const count = 6
    let curCount = albums.length * count
    let nextCount = curCount + count

    let newAlbums = []
    if(albumsDataCount > 0 && albumsDataCount > curCount){
      for(let i=curCount; i<nextCount; i++){



      }
    }


    /*const albums = state.page.albums,
        albumsData = state.data.musics.contents.albums,
        albumsDataCount = state.data.musics.contents.albumsCount,
        artistData = state.data.artists.contents.artists

    let curCount = albums.length
    let nextCount = curCount + count

    let newAlbums = []
    let index = 0

    for(let key in albumsData){
      if(albumsData.hasOwnProperty(key)){
        let album = albumsData[key]
        let artistName = artistData[album.artist_id].name

        let {id, post_title, url_friendly_name, thumb_1x1 } = album
        let url = Site + '/music/' + url_friendly_name

        newAlbums.push({
          id,
          title: post_title,
          url,
          image: thumb_1x1,
          name: artistName
        })

        if(albumsDataCount-1 == index || nextCount-1 == index){
          if(albumsDataCount-1 == index){

            dispatch(setAlbumsAllLoaded(true))
          }
          break
        }
      }
      index++
    }
    dispatch(setAlbumsList(newAlbums))*/
  }
}

const albumThumb = ( albumData, artistData ) => {
  const {id, post_title, url_friendly_name, thumb_1x1, cover_image, artist_id } = albumsData
  const { name } = artistData[artist_id]
  return {
    id,
    title: exerptStr(post_title, 90),
    url: `/music/${url_friendly_name}`,
    thumb1x1: thumb_1x1 || cover_image || false,
    artistName: name
  }
}








import {setHotTracksList, setHotTracksAllLoaded} from '../actions/'
export const loadHotTracksList = (count) => (dispatch, getState) => {
  const state = getState()
  if(state.page.type == 'music'){
    const hotTracks = state.page.hotTracks,
        hotTracksData = state.data.musics.contents.hotTracks.map( id =>
          state.data.musics.contents.musics[id]
        ),
        hotTracksDataCount = state.data.musics.contents.hotTracksCount,
        artistsData = state.data.artists.contents.artists,
        albumsData = state.data.musics.contents.albums

    let curCount = hotTracks.length
    let nextCount = curCount + count

    let newHotTracks = []
    var index = 0
    for (let key in hotTracksData) {
          if(hotTracksData.hasOwnProperty(key)) {
            let hotTrack = hotTracksData[key]
            let album = albumsData[hotTrack.album_id]
            let artistName = artistsData[album.artist_id].name
            let image = album.thumb_1x1

            const { id, post_title, subtitle, sample_link, duration} = hotTrack

            newHotTracks.push({
              id,
              order: index+1,
              title: post_title,
              subtitle,
              image,
              duration,
              artistName,
              sample_link
            })

            if(hotTracksDataCount-1 == index || nextCount-1 == index ){
              if(hotTracksDataCount-1 == index){
                dispatch(setHotTracksAllLoaded(true))
              }
              break
            }
          }
      index++
    }
    dispatch(setHotTracksList(newHotTracks))
  }
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
        const { themeColor, textColor } = state.data.artists.contents.artists[e.artist_id]
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
      let calendarMonth = dateformat('2016-' + tour_calendar[0].date.replace('/','-'), 'mmmm')

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
      let name = state.data.artists.contents.artists[thisMusic[0].artist_id].name
      let products = toArray(state.data.musics.contents.musics)
        .filter( product => product.album_id == id)


      let albumProduct = products.filter(product => product.product_type == 'album')
      let musicsProduct = products.filter(product => product.product_type == 'music')


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
        music: musicsProduct
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
import { setShopPopup, setSelectedOption, setSelectedOptions, setOptions, setProductImages, setProductPrice }  from '../actions/'
import { getDefaultOptions, getProductOptions, findProductVariation, getProductImages, getProductPrice } from '../functions/'
export const loadShopPopup = (name) => (dispatch, getState) => {

  const state = getState();

  if(state.popup.type === 'shop'){
     let thisShop = toArray(state.data.shops.contents.products)
       .filter( product => product.url_friendly_name == name)

    if(thisShop.length){
      const productData = thisShop[0]
      let { id, post_title:title, post_content:content, url_friendly_name, related } = productData
      let artistName = state.data.artists.contents.artists[productData.artist_id].name
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

    dispatch( setProductImages( getProductImages(product, variation) ))
    let { price, originalPrice } = getProductPrice(product, variation)
    dispatch( setProductPrice( price, originalPrice ) )
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
    return fetch('/api/getArtists')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveArtists(json))
        dispatch(setMainMenuArtistList( toArray(json) ))
        let imagesToLoad = []
        for( let key in json ) {
          if(json.hasOwnProperty(key)) {
            imagesToLoad.push(json[key].bg)
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

// DATA:ALL
import { setDataLoaded } from '../actions/'
export const getAllData = () => (dispatch, getState) => {
  const datas = [ 'artists', 'blogs', 'events', 'tours', 'musics', 'shops' ]
  let timer = setInterval(()=>{
    let state = getState().data
    if(datas.filter( data => state[data].loaded ).length === datas.length){
      dispatch(setDataLoaded(true))
      clearInterval(timer)
    }
  }, 150)
  datas.map( data => {
    dispatch(eval('get' + data[0].toUpperCase() + data.slice(1) + 'Data')())
  })
}
