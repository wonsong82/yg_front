require('./MainMenu.scss')
import React, { Component, PropTypes } from 'react'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import { Link } from 'react-router'
import HoverLink from './HoverLink'
import MainMenuImage from './MainMenuImage'



class MainMenu extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      artists: {
        hovered: false
      },
      prevImage: '',
      image: ''
    }
  }

  onArtistsEnter(){
    this.setState({
      artists: {
        hovered: true
      }
    })
  }

  onArtistsLeave(){
    this.setState({
      artists: {
        hovered: false
      },
      image: '',
      prevImage: ''
    })
  }


  onArtistEnter(id) {
    if(this.props.menuDisabled) return false
    this.setState({
      image: this.getArtistImage(id),
      prevImage: this.state.image
    })

  }

  onArtistLeave() {

  }

  getArtistImage( id ){
    const { artists } = this.props
    const filteredArtist = artists.filter(artist => {
      return artist.id == id
    })
    return filteredArtist[0].bg
  }


  onLinkClick(){
    this.props.onLinkClick()
  }


  
  render() {
    const { artists, menuDisabled } = this.props

    // Static Links
    const staticLinks = [
      {to:'shop', text:'Shop'},
      {to:'music', text:'Music'},
      {to:'tour', text:'Tour'},
      {to:'event', text:'Event'},
      {to:'blog', text:'Blog'}
    ].map( link => {
      let { to, text } = link
      return <Link key={to}
                   to={'/'+to}
                   ref="staticLink"
                   className="link"
                   activeClassName="current"
                   onClick={this.onLinkClick.bind(this)}
      >
        {text}
      </Link>
    })


    // Artist Links
    const artistLinks = artists.map(( artist ) => {
      let { id, urlFriendlyName, themeColor, name } = artist
      return (
        <HoverLink key={id}
                   to={"/artist/"+urlFriendlyName}
                   className="link"
                   textColor="#000000"
                   hoverColor={themeColor}
                   onClick={this.onLinkClick.bind(this)}
                   onMouseEnter={this.onArtistEnter.bind(this, id)}
                   onMouseLeave={this.onArtistLeave.bind(this)}
        >
          {name}
        </HoverLink>
      )
    })


    return (
      <div className="MainMenu">

        <div className="menu-bg"></div>

        <TransitionGroup className="menu-image" component="div">
          {this.state.artists.hovered &&
          <MainMenuImage image={this.state.image}
                         prevImage={this.state.prevImage}
          />
          }
        </TransitionGroup>

        <div className="static" ref="static">
          {staticLinks}
        </div>

        <div className="artists" ref="artists"
             onMouseEnter={this.onArtistsEnter.bind(this)}
             onMouseLeave={this.onArtistsLeave.bind(this)}
        >
          {artistLinks}
        </div>
        
        {menuDisabled && <span className="film" />}

      </div>
    )     
  }
}

MainMenu.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      name: PropTypes.string.required,
      urlFriendlyName: PropTypes.string.required,
      bg: PropTypes.string.required,
      textColor: PropTypes.string.required,
      themeColor: PropTypes.string.required
    })
  )
}



export default MainMenu
