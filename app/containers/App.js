import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getArtistsList, getToursList, getAlbumsList, getBlogsList, getEventsList,
    getMusicsList, getProductsList , getPromotionsList , getHotTracksList , getHotBlogsList , getProductCategoriesList ,
    setThemeColor, setTextColor, setResponsiveMode, handleResponsiveChange, setPageLoaded } from '../actions/'
import { computeThemeColor } from '../functions/'
import AppComponent from '../components/App'


class App extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(setResponsiveMode($(window).width()))
    dispatch(handleResponsiveChange())
    dispatch(getArtistsList())
    dispatch(getAlbumsList())
    dispatch(getBlogsList())
    dispatch(getEventsList())
    dispatch(getToursList())
    dispatch(getMusicsList())
    dispatch(getProductsList())
    dispatch(getPromotionsList())
    dispatch(getHotTracksList())
    dispatch(getHotBlogsList())
    dispatch(getProductCategoriesList())


    // todo: dispatch others
  }

  componentWillReceiveProps(nextProps) {

    // 프레임과 텍스트 색
    if(nextProps.artistLoaded) {
      const { dispatch, page, popup, artistsList, params } = nextProps
      const { themeColor, textColor } = computeThemeColor(page, popup, artistsList, params)

      if(themeColor != this.props.themeColor)
        dispatch(setThemeColor(themeColor, textColor))
    }

    // 로딩
    const { dispatch, pageLoaded, artistLoaded, toursLoaded, albumsLoaded, blogsLoaded } = nextProps
    if(!pageLoaded){
      if(artistLoaded && toursLoaded && albumsLoaded && blogsLoaded )
        dispatch(setPageLoaded(true))
    }
  }


  render(){
    return <AppComponent {...this.props} />
  }

}
App.propTypes = {}


const mapStateToProps = (state) => {
  return {
    artistLoaded: state.artists.loaded,
    isArtistLoading: state.artists.isFetching,
    artistsList: state.artists.list,
    textColor: state.theme.textColor,
    themeColor: state.theme.themeColor,
    mainMenuOpened: state.mainMenu.opened,

    pageLoaded: state.page.loaded,
    toursLoaded: state.tours.loaded,
    albumsLoaded: state.albums.loaded,
    blogsLoaded: state.blogs.loaded,


    //@todo other states than artist, for example blogs, tours, ..
  }
}

export default connect(mapStateToProps)(App)
