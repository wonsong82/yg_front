require('./Event.scss')
import React from 'react'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import Image from '../../../components/lib/image/Image'
import EventThumb from '../../../components/app/item/event/EventThumb'

var Entities = require('html-entities').AllHtmlEntities
var entities = new Entities()



const Event = ({ title, date, image, content, facebookShareLink, twitterShareLink, related }) => (

  <div className="EventLayout">

    <div className="Event">

      { image &&
        <div className="images">
          <Image className="main-image" src={image}/>
        </div>
      }

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

      <span className="spacer" />

      <div className="content">
          {entities.decode(content)}
      </div>

    </div>


    {
      (related && related.length) ?
      <div className="related-container">

        <h6>Related Posts</h6>
        <ul className="posts">
          {
            related.map(post => (
              <li key={'event' + post.id}>
                <EventThumb {...post} />
              </li>
            ))
          }
        </ul>
      </div>
      :null
    }


  </div>








)


export default Event

