require('./Music.scss')
import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import AlbumGroup from '../../../transitions/app/item/music/AlbumGroup'
import HotTrackGroup from '../../../transitions/app/item/music/HotTrackGroup'


const Music = ({albumGroups, hotTrackGroups, albumsAllLoaded, hotTracksAllLoaded, onAlbumViewMoreClick, onHotTrackViewMoreClick, onAddToCartClick }) => (

  <div className="MusicLayout">

    <section className="main">

      <h3>Music</h3>

      {albumGroups && albumGroups.map((albums, i) => (
      <AlbumGroup key={`albumGroup-${i}`} albums={albums} />
      ))}

      {!albumsAllLoaded && albumGroups && albumGroups.length ?
      <ViewMore onClick={onAlbumViewMoreClick} />
      : ''}

  </section>


    <section className="side">

      <h3>Hot Tracks</h3>

      {hotTrackGroups && hotTrackGroups.map((hotTracks, i) => (
        <HotTrackGroup key={`hotTrackGroup-${i}`} hotTracks={hotTracks} onAddCartClick={onAddToCartClick}/>
      ))}

      {!hotTracksAllLoaded && hotTrackGroups && hotTrackGroups.length ?
        <ViewMore onClick={onHotTrackViewMoreClick} />
        : ''}

    </section>


  </div>

)

Music.defaultProps = {
    pageType: 'Music'
}


export default Music

