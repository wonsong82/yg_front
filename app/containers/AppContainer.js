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
  }

  componentWillReceiveProps(nextProps) {

    // 프레임과 텍스트 색
    if(nextProps.artistLoaded) {
      const { dispatch, page, popup, artistsList, params } = nextProps
      const { themeColor, textColor } = computeThemeColor(page, popup, artistsList, params)
      dispatch(setThemeColor(themeColor, textColor))
    }
  }


  render(){
    return <App {...this.props} />
  }

}
AppContainer.propTypes = {}


const mapStateToProps = (state) => {
  const { isFetching, loaded, list } = state.artists
  const { textColor, themeColor } = state.theme
  return {
    artistLoaded: loaded,
    isArtistLoading: isFetching,
    artistsList: list,
    textColor,
    themeColor
  }
}

export default connect(mapStateToProps)(AppContainer)
