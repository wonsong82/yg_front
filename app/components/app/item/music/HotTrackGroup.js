import React from 'react'
import HotTrackThumb from './HotTrackThumb'


const HotTrackGroup = ({ hotTracks }) => (
    <ul className="HotTrackGroup">

      {hotTracks && hotTracks.map( hotTrack => (
      <li key={`hottrack-${hotTrack.id}`}>
        <HotTrackThumb {...hotTrack} />
      </li>
      ))}

    </ul>
)


export default HotTrackGroup

