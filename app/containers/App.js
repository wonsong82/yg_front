import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getArtistsList, setThemeColor, setTextColor, setResponsiveMode, handleResponsiveChange, setDataLoaded, getBlogsData, getEventsData} from '../actions/'
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
    dispatch(getBlogsData())
    dispatch(getEventsData())
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
    const { dispatch, dataLoaded, artistLoaded, blogsLoaded, eventsLoaded } = nextProps
    if(!dataLoaded){
      if(artistLoaded && blogsLoaded && eventsLoaded )
        dispatch(setDataLoaded(true))
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

    dataLoaded: state.data.loaded,
    blogsLoaded: state.data.blogs.loaded,
    eventsLoaded: state.data.events.loaded
    //@todo other states than artist, for example blogs, tours, ..
  }
}

export default connect(mapStateToProps)(App)
