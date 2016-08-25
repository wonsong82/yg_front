import { connect } from 'react-redux'
import React, { Component, PropTypes} from 'react'

import MusicComponent from '../../../components/app/page/Music'
import {initPage, loadAlbumsList, loadHotTracksList} from '../../../actions'

class Music extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const { initPage , loadAlbumsList , loadHotTracksList} = this.props
        initPage('Music')
        loadAlbumsList(6)
        loadHotTracksList(6)
    }

    onAlbumViewMoreClick() {
        const { onAlbumViewMoreClick } = this.props
        onAlbumViewMoreClick(6)
    }

    onHotTrackViewMoreClick() {
        const { onHotTrackViewMoreClick } = this.props
        onHotTrackViewMoreClick(6)
    }

    render(){
        return <MusicComponent
            {...this.props}
            onAlbumViewMoreClick={this.onAlbumViewMoreClick.bind(this)}
            onHotTrackViewMoreClick={this.onHotTrackViewMoreClick.bind(this)}
        />
    }
}


const mapStateProps = state => {
    const { albums, hotTracks, albumsAllLoaded, hotTracksAllLoaded } = state.page
    return {
        albumGroups: albums,
        hotTrackGroups: hotTracks,
        albumsAllLoaded,
        hotTracksAllLoaded
    }
}

const mapDispatchToProps = dispatch => ({
    initPage: pageType => {dispatch(initPage(pageType))},
    loadAlbumsList: count => {dispatch(loadAlbumsList(count))},
    loadHotTracksList: count => {dispatch(loadHotTracksList(count))},
    onAlbumViewMoreClick: count => {dispatch(loadAlbumsList(count))},
    onHotTrackViewMoreClick: count => {dispatch(loadHotTracksList(count))}
})

export default connect(mapStateProps, mapDispatchToProps)(Music)
