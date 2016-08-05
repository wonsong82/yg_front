import React from 'react'


const BlogLink = ({ id, title, url, text, date, image, facebookLink, twitterLink }) => (

  <div className="BlogThumb">

    <div>{id} {title} {url} {text} {date} {image} {facebookLink} {twitterLink}</div>



  </div>
)


export default BlogLink

