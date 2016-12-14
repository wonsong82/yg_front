import React from 'react'

import RouterLink from '../../../../containers/lib/link/RouterLink'
import Image from '../../../../components/lib/image/Image'
import Ripple from '../../../../components/lib/effect/Ripple'
import ThumbHover from '../../../../components/lib/button/ThumbHover'


const MainBannerThumb = ({ url, thumb1x1, thumb2x1, thumb3x2, layoutStyle, layoutNum }) => (

  <RouterLink className={`MainBannerThumb style-${layoutStyle}-${layoutNum}`} to={url}>

    <div className="images">
      <Image className="image-1x1" color="rgba(0,0,0,.30)" src={thumb1x1}/>
      <Image className="image-2x1" color="rgba(0,0,0,.30)" src={thumb2x1}/>
      <Image className="image-3x2" color="rgba(0,0,0,.30)" src={thumb3x2}/>
      <span className="film"/>
    </div>


    <Ripple color="rgba(255,255,255,.5)" />

    <ThumbHover text="Details" />

  </RouterLink>

)

export default MainBannerThumb

