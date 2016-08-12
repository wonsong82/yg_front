import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'


const TourThumb = ({ title, subtitle, url, text, date, image, themeColor}) => (
  <div className="TourThumb">

    <RouterLink className="title" to={url}>
      <h3>{title}</h3>
    </RouterLink>
  </div>

)

export default TourThumb

