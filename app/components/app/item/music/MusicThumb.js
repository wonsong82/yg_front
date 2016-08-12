import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'


const MusicThumb = ({ title, url, image, name}) => (
  <div className="MusicThumb">

    <RouterLink className="title" to={url}>
      <h3>{title}</h3>
    </RouterLink>
  </div>

)

export default MusicThumb

