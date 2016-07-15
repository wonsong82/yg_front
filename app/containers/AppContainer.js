import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getArtistsIfNeeded } from '../actions'
import App from '../components/App'



const mapStateToProps = (state) => {
  const { isFetching, list } = state.artists
  return {
    isArtistLoading: isFetching,
    artistsList: list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtistsIfNeeded: () => {
      dispatch(getArtistsIfNeeded())
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
