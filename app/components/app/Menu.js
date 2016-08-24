require('./Menu.scss')
import React, { Component, PropTypes } from 'react'
import TransitionGroup from 'react/lib/ReactTransitionGroup'
import ScrollArea from 'react-scrollbar/dist/no-css'

import RouterLink from '../../components/lib/link/RouterLink'
import HoverLink from '../../components/lib/link/HoverLink'
import BackgroundImage from '../../components/app/menu/BackgroundImage'



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

  onArtistsOver(){
    if(!this.state.artists.hovered){
      this.setState({
        artists: {
          hovered: true
        }
      })
    }
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

  onESCPressed(e){
    e.stopPropagation()
    if(e.keyCode == 27){
      this.props.onESCPressed()
    }
  }

  componentDidMount() {
    $(window).on('keyup', this.onESCPressed.bind(this))
    $('.links').on('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }

  componentWillUnmount() {
    $(window).off('keyup', this.onESCPressed)
    $('.links').off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }

  preventOtherScrolls(e){
    e.preventDefault()
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
    {console.log('what')}
    const { artists, disabled } = this.props

    // Static Links
    const staticLinks = [
      {to:'shop', text:'Shop'},
      {to:'music', text:'Music'},
      {to:'tour', text:'Tour'},
      {to:'event', text:'Event'},
      {to:'blog', text:'Blog'}
    ].map( link => {
      let { to, text } = link
      return (
        <li key={`static-${to}`}>
          <RouterLink key={to}
                    to={'/'+to}
                    className="link"
                    activeClassName="current"
                    onClick={this.onLinkClick.bind(this)}>
            {text}
          </RouterLink>
        </li>
      )
    })


    // Artist Links
    const artistLinks = artists.map(( artist ) => {
      let { id, urlFriendlyName, themeColor, name } = artist
      return (
        <li key={`artist-${id}`}>
          <HoverLink key={id}
                     to={"/artist/"+urlFriendlyName}
                     className="link"
                     textColor="#000000"
                     hoverColor={themeColor}
                     onClick={this.onLinkClick.bind(this)}
                     onMouseEnter={this.onArtistEnter.bind(this, id)}
                     onMouseLeave={this.onArtistLeave.bind(this)}>
            {name}
          </HoverLink>
        </li>
      )
    })


    return (
      <div className="Menu" ref="menu">

        <div className="menu-bg"></div>

        <TransitionGroup className="menu-image" component="div">
          {this.state.artists.hovered &&
          <BackgroundImage image={this.state.image || ""}
                           prevImage={this.state.prevImage || ""}
          />
          }
        </TransitionGroup>


        <ScrollArea className="links"
          speed={0.8}
          horizontal={false}
          smoothScrolling={true}
          contentClassName="content">

          <div className="static" ref="static">
            {staticLinks}
          </div>

          <div className="artists" ref="artists"
               onMouseEnter={this.onArtistsEnter.bind(this)}
               onMouseLeave={this.onArtistsLeave.bind(this)}
               onMouseMove={this.onArtistsOver.bind(this)} >
            {artistLinks}
          </div>



        </ScrollArea>



        
        {disabled && <span className="film" />}

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
