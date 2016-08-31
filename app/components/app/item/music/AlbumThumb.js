import React from 'react'
import RouterLink from '../../../../components/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'
import ThumbHover from '../../../../components/lib/button/ThumbHover'

const AlbumThumb = ({ id, image, title, artistName, url, layoutStyle, layoutNum }) => (

  <RouterLink className={ `AlbumThumb style-${layoutStyle}-${layoutNum}` } to={url} >

    <Image className="img" color="rgba(0,0,0,.30)" src={image} />

    <div className="text">
      <h6 className="title">{title}</h6>
      <p className="artist">{artistName}</p>
    </div>

    <Ripple color='rgba(255,255,255,.5)' />

    <ThumbHover text="Details" />

  </RouterLink>
)


export default AlbumThumb

