require('./MainMenu.scss')
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import HoverLink from './HoverLink'


const MainMenu = ({ artists }) => {
  const artistLinks = artists.map((artist) => {
    let { id, urlFriendlyName, themeColor, name } = artist
    return <HoverLink key={id} to={"/artist/"+urlFriendlyName} className="link" textColor="#000000" hoverColor={themeColor}>{name}</HoverLink>
  })

  return (
    <div className="MainMenu">

      <div className="static">
        <Link to="/shop" className="link" activeClassName="current">Shop</Link>
        <Link to="/music" className="link" activeClassName="current">Music</Link>
        <Link to="/tour" className="link" activeClassName="current">Tour</Link>
        <Link to="/event" className="link" activeClassName="current">Event</Link>
        <Link to="/blog" className="link" activeClassName="current">Blog</Link>
      </div>

      <div className="artists">
        {artistLinks}
      </div>

    </div>
)}


export default MainMenu

