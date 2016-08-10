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
        index++
      }
      dispatch(setBlogsList(newPosts))
    }
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
        index++
      }
      dispatch(setHotPostsList(newPosts))
    }
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
          console.log('NO MORE EVENTS COUNT')
          dispatch(setEventsAllLoaded(true))
        }
        break
      }
      index++
    }

    dispatch(setEventsList(newEvents))
  }
}


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
