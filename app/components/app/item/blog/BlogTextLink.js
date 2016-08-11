require('./BlogTextLink.scss')
import React from 'react'
import RouterLink from '../../../../containers/lib/link/RouterLink'



const BlogTextLink = ({ title, url, text, date }) => (

  <div className="BlogTextLink">
    <RouterLink className="title" to={url}>{title}</RouterLink>
    <span className="date">{date}</span>
  </div>
)


export default BlogTextLink

