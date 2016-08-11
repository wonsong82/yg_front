import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setThemeColor, setResponsiveMode, handleResponsiveChange, setDataLoaded, getArtistsData, getBlogsData, getEventsData, getToursData, getMusicsData, getShopsData} from '../actions/'

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
    dispatch(getArtistsData())
    dispatch(getBlogsData())
    dispatch(getEventsData())
    dispatch(getToursData())
    dispatch(getMusicsData())
    dispatch(getShopsData())
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


    const { dispatch, dataLoaded, artistLoaded, blogsLoaded, eventsLoaded, toursLoaded, musicsLoaded , shopsLoaded} = nextProps

    if(!dataLoaded){
      if(artistLoaded && blogsLoaded && eventsLoaded && toursLoaded && musicsLoaded && shopsLoaded)
        dispatch(setDataLoaded(true))
    }
  }


  render(){
    return <AppComponent {...this.props} />
  }

}



const mapStateToProps = (state) => {
  return {

    artistLoaded      : state.data.artists.loaded,
    isArtistLoading   : state.data.artists.isFetching,
    artistsList       : state.data.artists.contents.artists,
    textColor         : state.app.textColor,
    themeColor        : state.app.themeColor,
    startApp          : state.app.startApp,
    mainMenuOpened    : state.mainMenu.opened,
    dataLoaded        : state.data.loaded,
    blogsLoaded       : state.data.blogs.loaded,
    eventsLoaded: state.data.events.loaded,
    toursLoaded: state.data.tours.loaded,
    musicsLoaded: state.data.musics.loaded,
    shopsLoaded: state.data.shops.loaded,
    //@todo other states than artist, for example blogs, tours, ..
  }
}

export default connect(mapStateToProps)(App)
