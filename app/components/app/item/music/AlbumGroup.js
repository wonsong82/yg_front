import React from 'react'
import AlbumThumb from './AlbumThumb'

const AlbumGroup = ({ albums }) => (
    <ul className="AlbumGroup">

      {albums && albums.length && albums.map( album => (
      <li key={`album-${album.id}`} >
        <AlbumThumb {...album} />
      </li>
      ))}
    </ul>
)


export default AlbumGroup

