import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getArtistsList, setThemeColor, setTextColor } from '../actions/'
import { computeThemeColor } from '../functions/'
import App from '../components/App'


class AppContainer extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getArtistsList())
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
    
    
  }


  render(){
    return <App {...this.props} />
  }

}
AppContainer.propTypes = {}


const mapStateToProps = (state) => {
  return {
    artistLoaded: state.artists.loaded,
    isArtistLoading: state.artists.isFetching,
    artistsList: state.artists.list,
    textColor: state.theme.textColor,
    themeColor: state.theme.themeColor,
    mainMenuOpened: state.mainMenu.opened
  }
}

export default connect(mapStateToProps)(AppContainer)
