require('./EventThumb.scss')
import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'


const EventThumb = ({ title, url, text, date, image, thumb1x1, thumb3x2, textColor, themeColor, layoutStyle, layoutNum }) => (

  <RouterLink
    className={ image ?
    'EventThumb' + ' style-' + layoutStyle + '-' + layoutNum :
    'EventThumb' + ' style-' + layoutStyle + '-' + layoutNum + ' no-image' }
    style={ image ? {backgroundColor:"#ffffff"} : {backgroundColor:themeColor} }
    to={url} >

      { image &&
        <div className="images">
          <Image className="image-1x1" color="rgba(0,0,0,.30)" src={thumb1x1} />
          <Image className="image-3x2" color="rgba(0,0,0,.30)" src={thumb3x2} />
        </div>
      }

      <RouterLink className="title" to={url}>
        <h3 style={ image ? {color:'#000000'} : {color:textColor}}>{title}</h3>
      </RouterLink>

      <span className="date" style={ image ? {color:'#000000'} : {color:textColor} }>{date}</span>

      { !image &&
      <div className="text" style={ image ? {color:'#000000'} : {color:textColor} }>
        {text}
      </div>
      }

      <RouterLink to={url} className="read-more" style={ image ? {color:'#000000'} : {color:textColor} }>Read More</RouterLink>

    </RouterLink>

)

export default EventThumb

