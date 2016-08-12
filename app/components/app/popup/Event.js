import React from 'react'


const Event = ({ title, date, image, content, facebookShareLink, twitterShareLink, related }) => (
    <div className="Event page-grid">
      <h1>TITLE: {title}</h1>
      <h5>DATE: {date}</h5>
      <h5>IMAGE: {image}</h5>
      <h5>Content: {content}</h5>
      <h5>FacebookShareLink: {facebookShareLink}</h5>
      <h5>TwitterShareLink: {twitterShareLink}</h5>


        <span className="spacer" />

        <div className="related-container">
            <h6>Related Event</h6>
            {
                related &&
                related.map( event => (
                  <li key={'event' + event.id}>
                      {event.id}
                  </li>
                ))
            }

        </div>


    </div>







)


export default Event

