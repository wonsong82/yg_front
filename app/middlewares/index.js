import fetch from 'isomorphic-fetch'
import { toArray, excerptStr, getData, getFacebookShareLink, getTwitterShareLink, loadImages } from '../functions/'
import { Site } from '../../env'


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
        let {id, post_title, url_friendly_name, excerpt, post_date, main_image, thumb_2x1} = post
        let url = Site + '/blog/' + url_friendly_name
        newPosts.push({
          id,
          title: excerptStr(post_title),
          url,
          text: excerpt,
          date: post_date,
          image: main_image || false,
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
        let url = Site + '/blog/' + url_friendly_name
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

export const loadEventsList = ( count ) => (dispatch, getState) => {
  const state = getState();
  if(state.page.type = 'event'){

    const events = state.page.events,
        eventsData = state.data.events.contents.events,
        eventsDataCount = state.data.events.contents.eventsCount,
        artistsData = state.data.artists.contents.artists


    let curCount = events.length
    let nextCount = curCount + count

    let newEvents = []
    var index = 0;

    for(let key in eventsData){
      if(eventsData.hasOwnProperty(key)){
        let event = eventsData[key]
        let artistThemeColor = artistsData[event.artist_id].themeColor
        let {id, post_title, subtitle, url_friendly_name, excerpt, post_date,thumb_2x2} = event
        let url = Site + '/Event/' + url_friendly_name

        newEvents.push({
          id,
          title: post_title,
          subtitle,
          url,
          text: excerpt,
          date: post_date,
          image: thumb_2x2,
          themeColor: artistThemeColor
        })

        if(eventsDataCount-1 == index || nextCount-1 == index){
          if(eventsDataCount-1 == index){
            dispatch(setEventsAllLoaded(true))
          }
          break
        }
      }
      index++
    }
    dispatch(setEventsList(newEvents))
  }
}

//PAGE: TOUR
import { setToursList, setToursAllLoaded } from '../actions'
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
        let artistThemeColor = artistsData[tour.artist_id].themeColor
        let artistName = artistsData[tour.artist_id].name

        let {id, post_title, subtitle, url_friendly_name, tour_schedule, thumb_3x2} = tour
        let url = Site + '/Tour/' + url_friendly_name

        newTours.push({
          id,
          title: post_title,
          subtitle,
          url,
          schedule: tour_schedule,
          image: thumb_3x2,
          name: artistName,
          themeColor: artistThemeColor
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
    const albums = state.page.albums,
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
        let url = Site + '/Music/' + url_friendly_name

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
    dispatch(setAlbumsList(newAlbums))
  }
}

import {setHotTracksList, setHotTracksAllLoaded} from '../actions'
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

// DATA:MUSIC
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
