require('./Music.scss')
import React, { Component, PropTypes } from 'react'
import Image from '../../../components/lib/image/Image'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import AlbumThumb from '../../../components/app/item/music/AlbumThumb'
import HotTrackThumb from '../../../components/app/item/music/HotTrackThumb'



class Music extends Component {

  constructor(props){
    super(props)
  }

  onAddCartClick(e){
    e.preventDefault()
    this.props.addToCart(this.props.albumProductId)
  }

  onMouseEnter(e) {
    const { textColor, themeColor } = this.props
    $(e.target)
      .velocity('stop')
      .velocity({
        color:  textColor,
        backgroundColor: themeColor
      }, {
        easing: 'easeOutQuad',
        duration: 300
      })
  }

  onMouseLeave(e) {
    $(e.target)
      .velocity('stop')
      .velocity('reverse', {
        duration: 300,
        easing: 'easeOutQuad'
      })
  }

  render() {
    const { image, title, albumPrice, salePrice, name, content,
            facebookShareLink, twitterShareLink, music, related, addToCart} = this.props

    return (
      <div className="MusicLayout">
        <div className="Music">
          {
            console.log(music)
          }


          { image &&
          <div className="images">
            <Image className="main-image" src={image}/>
          </div>
          }

          <div className="header">
            <h1 className="title">{title}</h1>
            <h6 className="name">{name}</h6>

            <div className="socialLinks">
              <AnchorLink href={facebookShareLink} target="_blank">
                <span className="icon-facebook" />
              </AnchorLink>
              <AnchorLink href={twitterShareLink} target="_blank">
                <span className="icon-twitter" />
              </AnchorLink>
            </div>

            {albumPrice &&
            <div className="price">
              {`Album $${albumPrice}`}
            </div>
            }

            {albumPrice &&
            <div className="controls">
              <a href="#"
                 className="add-to-cart"
                 onClick={this.onAddCartClick.bind(this)}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
              >
                ADD TO CART
              </a>
            </div>
            }
          </div>

          <div className="musics">
            <ul className="MusicTrackGroup">
              {music && music.map( item => (
                <li key={`track-${item.id}`}>
                  {
                    <HotTrackThumb {...item} onAddCartClick={addToCart}/>
                  }
                </li>

              ))}
            </ul>
          </div>

          <div className="content">
            <h3>Description</h3>
            <p>
              {content}
            </p>
          </div>

        </div>


        {(related && related.length) ?
          <div className="related-container">
            <div>
              <h6>Related Albums</h6>
              <ul className="items">
                {related.map(item => (
                  <li key={'music' + item.id}>
                    <AlbumThumb {...item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        :null}

      </div>

    )
  }
}

export default Music

