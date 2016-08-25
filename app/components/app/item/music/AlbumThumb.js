import React from 'react'
import RouterLink from '../../../../components/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'

const AlbumThumb = ({ id, image, title, artistName, url }) => (

  <RouterLink className="AlbumThumb" to={url} >

    <Image className="img" color="rgba(0,0,0,.30)" src={image} />

    <div className="text">
      <h6 className="title">{title}</h6>
      <p className="artist">{artistName}</p>
    </div>

    <Ripple color='rgba(255,255,255,.5)' />

  </RouterLink>
)


export default AlbumThumb

