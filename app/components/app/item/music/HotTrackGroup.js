import React from 'react'
import HotTrackThumb from './HotTrackThumb'


const HotTrackGroup = ({ hotTracks , onAddCartClick}) => (
    <ul className="HotTrackGroup">

      {hotTracks && hotTracks.map( hotTrack => (
      <li key={`hottrack-${hotTrack.id}`}>
        <HotTrackThumb {...hotTrack} onAddCartClick={onAddCartClick}/>
      </li>
      ))}

    </ul>
)


export default HotTrackGroup

