import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import MusicThumbs from '../../../components/app/item/music/MusicThumb'

const Music = ({albums, hotTracks, albumsAllLoaded, hotTracksAllLoaded, onAlbumViewMoreClick, onHotTrackViewMoreClick}) => (
    <div className="MusicLayout">
        <section className="main">
            <h3>Music</h3>
            <ul className="music-list">
                {
                    albums &&
                    albums.map( album => (
                        <li key={album.id}>
                          <MusicThumbs {...album} />
                        </li>
                    ))
                }
                </ul>

            {
                !albumsAllLoaded &&
                <ViewMore onClick={onAlbumViewMoreClick} />
            }
        </section>

        <section>
            <h3>Hot Tracks</h3>
            <ul className="hot_track-list">
                {
                    hotTracks &&
                    hotTracks.map( hotTrack => (
                        <li key={hotTrack.id}>
                            {hotTrack.id}
                        </li>
                    ))
                }
            </ul>

            {
                !hotTracksAllLoaded &&
                <ViewMore onClick={onHotTrackViewMoreClick} />
            }

        </section>



    </div>

)

Music.defaultProps = {
    pageType: 'Music'
}

export default Music

