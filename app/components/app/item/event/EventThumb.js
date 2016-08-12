import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'


const EventThumb = ({ title, subtitle, url, text, date, image, name, themeColor, schedule}) => (
    <div className="EventThumb">

      <RouterLink className="title" to={url}>
        <h3>{title}</h3>
      </RouterLink>
    </div>

)

export default EventThumb

