require('./Blog.scss')
import React from 'react'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import Image from '../../../components/lib/image/Image'
import BlogThumb from '../../../components/app/item/blog/BlogThumb'

const Blog = ({ title, date, image, content, facebookShareLink, twitterShareLink, related, textColor, themeColor }) => (

  <div className="BlogLayout">

    <div className="Blog">
      <div className="header">
        <h1 className="title" style={{color: textColor}}>{title && title}</h1>
        <span className="by" style={{color: textColor}}>By YGPRESENTS</span>
        <span className="date" style={{color: textColor}}>{date}</span>
        <div className="socialLinks">
          <AnchorLink href={facebookShareLink} target="_blank">
            <span className="icon-facebook" style={{color: textColor}} />
          </AnchorLink>
          <AnchorLink href={twitterShareLink} target="_blank">
            <span className="icon-twitter" style={{color: textColor}}/>
          </AnchorLink>
        </div>
      </div>

      { image ?
      <div className="images">
        <Image className="image-1x1" color="rgba(0,0,0,.30)" src={image}/>
      </div>
      :
      <span className="spacer" />
      }

      <div className="content">
        <p style={{color: textColor}}>
          {content}
        </p>
      </div>
    </div>

    { (related && related.length) ?
    <div className="related-container">
      <h6 style={{color: textColor}}>Related Posts</h6>
      <ul className="posts">
      {
        related.map(post => (
          <li key={'blog' + post.id}>
            <BlogThumb {...post} />
          </li>
        ))
      }
      </ul>
    </div>
    :null}

  </div>
)


export default Blog

