import React from 'react'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import Image from '../../../components/lib/image/Image'
import BlogThumb from '../../../components/app/item/blog/BlogThumb'

const Blog = ({ title, date, image, content, facebookShareLink, twitterShareLink, related }) => (

  <div className="Blog page-grid">

    <div className="header">

      <h1 className="title">{title && title}</h1>

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
    </div>
    :
    <span className="spacer" />
    }

    <div className="content">
      <p>
        {content}
      </p>
    </div>

    <span className="spacer" />

    <div className="related-container">
      <h6>Related Posts</h6>
      {
        related &&
        related.map( post => (
          <li key={'blog' + post.id}>
            <BlogThumb {...post} />
          </li>
        ))
      }

    </div>

  </div>
)


export default Blog

