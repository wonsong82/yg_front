import { getData, getFacebookShareLink, getTwitterShareLink } from '../functions/'
import { Site } from '../../env'


// THEME
import { setResponsiveMode } from '../actions/'

export const handleResponsiveChange = () => (dispatch, getState) => {
  $(window).resize(function(){
    const width = $(window).width(),
      currentMode = getState().theme.responsiveMode,
      mode = width >= 1280 ? 1280 : width >= 1024 ? 1024 : width >= 768 ? 768 : width >= 480 ? 480 : 320
    if(currentMode != mode) {
      dispatch(setResponsiveMode(mode))
      // todo: change grid system
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


// ARTISTS
import { requestArtists, receiveArtists } from '../actions/'

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
    for( let key in postsData ){
      let post = postsData[key]
      let { id, post_title, url_friendly_name, excerpt, post_date, main_image } = post
      let url = Site + '/blog/' + url_friendly_name

      newPosts.push({
        id,
        title: post_title,
        url,
        text: excerpt,
        date: post_date,
        image: main_image || false,
        facebookLink: getFacebookShareLink(url),
        twitterLink: getTwitterShareLink(url),
      })

      // 인덱스가 전체 데이타 인덱스의 마지막의 경우 || 카운트의 마지막일 경우
      if(postsDataCount-1 == index || nextCount-1 == index){
        // 인덱스가 전체의 마지막일경우 뷰모어 안나오게 디스페치
        if(postsDataCount-1 == index){
          dispatch(setPostsAllLoaded(true))
        }
        break
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
    for( let key in postsData ){
      let post = postsData[key]
      let { id, post_title, url_friendly_name, excerpt, post_date, main_image } = post
      let url = Site + '/blog/' + url_friendly_name

      newPosts.push({
        id,
        title: post_title,
        url,
        text: excerpt,
        date: post_date,
        image: main_image || false,
        facebookLink: getFacebookShareLink(url),
        twitterLink: getTwitterShareLink(url),
      })

      // 인덱스가 전체 데이타 인덱스의 마지막의 경우 || 카운트의 마지막일 경우
      if(postsDataCount-1 == index || nextCount-1 == index){
        // 인덱스가 전체의 마지막일경우 뷰모어 안나오게 디스페치
        if(postsDataCount-1 == index){
          dispatch(setHotPostsAllLoaded(true))
        }
        break
      }

      index++
    }

    dispatch(setHotPostsList(newPosts))
  }
}



// DATA
import { requestBlogs, receiveBlogs } from '../actions/'

export const getBlogsData = () => (dispatch, getState) => getData('/api/getBlogs', getState().data.blogs, requestBlogs, receiveBlogs, dispatch, fetch)

