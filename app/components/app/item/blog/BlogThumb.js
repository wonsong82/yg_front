require('./BlogThumb.scss')
import React from 'react'
import AnchorLink from '../../../../components/lib/link/AnchorLink'
import RouterLink from '../../../../components/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'


const BlogThumb = ({ id, title, url, text, date, image, facebookShareLink, twitterShareLink, thumb_2x1 }) => (


  <div className="BlogThumb">

    <div className="header">
      <h6 className="title">{title}</h6>
      <span className="by">By YGPRESENTS</span>
      <span className="date">{date}</span>
      <div className="socialLinks">
        <AnchorLink href={facebookShareLink} target="_blank">
          <span className="icon-facebook" />
        </AnchorLink>
        <AnchorLink href={facebookShareLink} target="_blank">
          <span className="icon-twitter" />
        </AnchorLink>
      </div>
    </div>

    { image ?
    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={image}/>
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb_2x1}/>
    </div>
    :
    <span className="spacer" />
    }

    <div className="text">
      {text}
    </div>

    <RouterLink to={url} className="read-more">Read More</RouterLink>


  </div>
)


export default BlogThumb

