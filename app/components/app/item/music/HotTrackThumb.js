import React, { Component, PropTypes } from 'react'
import MusicPlayer from '../../../../components/lib/media/MusicPlayer'
import Image from '../../../../components/lib/image/Image'
import RouterLink from '../../../../components/lib/link/RouterLink'
import AnchorLink from '../../../../components/lib/link/AnchorLink'
import Ripple from '../../../../components/lib/effect/Ripple'

class HotTrackThumb extends Component {

  constructor(props) {
    super(props)
  }

  onAddCartClick(e){
    e.preventDefault()

    const productId = this.props.id
    this.props.onAddCartClick(productId)
  }

  render() {
    const { title, subtitle, url, image, artistName, sampleLink, youtubeLink, orderID } = this.props
    return (
      <div className={image? 'HotTrackThumb image':'HotTrackThumb'}>

        {image &&
        <RouterLink className="image-link" to={url}>
          <Image color="rgba(0,0,0,.30)" src={image}/>
          <Ripple color='rgba(255,255,255,.5)' />
        </RouterLink>
        }

        <MusicPlayer songs={[{
          url: sampleLink,
          artist: {
            name: artistName,
            song: title,
            sub: subtitle
          }
        }]} orderID={orderID} />

        <a href="#" className="add-to-cart"
           onClick={this.onAddCartClick.bind(this)}
        >
          <span className="icon-play-cart"/>
        </a>

        {youtubeLink &&
        <AnchorLink href={youtubeLink} className="youtube-link" target="_blank">
          <span className="icon-youtube" />
        </AnchorLink>
        }

      </div>
    )
  }

}




export default HotTrackThumb

