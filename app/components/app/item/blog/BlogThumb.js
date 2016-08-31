require('./BlogThumb.scss')
import React from 'react'
import AnchorLink from '../../../../components/lib/link/AnchorLink'
import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'
import ThumbHover from '../../../../components/lib/button/ThumbHover'


const BlogThumb = ({ title, url, text, date, image, facebookShareLink, twitterShareLink, thumb_3x2, thumb_2x1 }) => (


  <RouterLink className={image? 'BlogThumb': 'BlogThumb no-image'} to={url}>

    <Ripple color='rgba(0,0,0,.5)' />

    <div className="header">
      <RouterLink className="title" to={url}>
        <h6>{title}</h6>
      </RouterLink>
      <span className="by">By YGPRESENTS</span>
      <span className="date">{date}</span>
      <div className="socialLinks">
        <AnchorLink href={facebookShareLink} target="_blank">
          <span className="icon-facebook" />
        </AnchorLink>
        <AnchorLink href={twitterShareLink} target="_blank">
          <span className="icon-twitter" />
        </AnchorLink>
      </div>
    </div>

    { image ?
    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={image}/>
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb_2x1}/>
      <Image className="image-3x2" color="rgba(0,0,0,.30)" src={thumb_3x2}/>
    </div>
    :
    <span className="spacer" />
    }

    <div className="text">
      {text}
    </div>

    <ThumbHover text="Details" />


    <RouterLink to={url} className="read-more">Read More</RouterLink>


  </RouterLink>
)


export default BlogThumb

