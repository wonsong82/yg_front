import React from 'react'

import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'
import dateformat from 'dateformat'


const TourThumb = ({ artistName, title, subtitle, url, thumb1x1, thumb2x1, thumb3x2, startDate, endDate, textColor, themeColor}) => (

  <RouterLink className="TourThumb" to={url}>

    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={thumb1x1}/>
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb2x1}/>
      <Image className="image-3x2" color="rgba(0,0,0,.30)" src={thumb3x2}/>
      <span className="film"/>
    </div>

    <h6 className="artist" style={{color:themeColor}}>{artistName}</h6>
    <h6 className="title" style={{color:textColor}}>{title}</h6>
    <span className="subtitle" style={{color:textColor}}>{subtitle}</span>

    <span className="date" style={{color:textColor}}>
      { dateformat(startDate, 'ddmmm(ddd)') }&nbsp;-&nbsp;
      { dateformat(endDate,   'ddmmm(ddd)') }
    </span>

    <Ripple color="rgba(255,255,255,.5)" />

  </RouterLink>

)

export default TourThumb

