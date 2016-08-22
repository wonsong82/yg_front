require('./ProductImageSwiper.scss')
import React, { Component, PropTypes } from 'react'


class ProductImageSwiper extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let galleryTop = new Swiper($(this.refs.galleryTop), {
      nextButton: $(this.refs.nextBtn),
      prevButton: $(this.refs.prevBtn),
      spaceBetween: 10,
      slidesPerView: 'auto',
      nested: true
    })

    let galleryThumb = new Swiper($(this.refs.galleryThumb), {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      nested: true
    })

    galleryTop.params.control = galleryThumb
    galleryThumb.params.control = galleryTop

  }


  render() {
    const { className, images } = this.props
    let classes = 'ProductImageSwiper'
    if(className) classes += ' ' + className

    return (
      <div className={classes}>

        <div className="gallery-top">
          <div className="swiper-container" ref="galleryTop">
            <div className="swiper-wrapper">
              {images.map( (image, i) => (
                <div
                  key={`ProductImageSwiperGalleryTop-${i}`}
                  className="swiper-slide"
                  style={{backgroundImage:`url(${image})`}} />
              ))}
            </div>
            <div className="swiper-button-next swiper-button-black" ref="nextBtn" />
            <div className="swiper-button-prev swiper-button-black" ref="prevBtn" />
          </div>
        </div>


        <div className="gallery-thumb">
          <div className="swiper-container" ref="galleryThumb">
            <div className="swiper-wrapper">
              {images.map( (image, i) => (
                <div
                  key={`ProductImageSwiperGalleryThumb-${i}`}
                  className="swiper-slide"
                  style={{backgroundImage:`url(${image})`}} />
              ))}
            </div>
          </div>
        </div>




      </div>
    )
  }

}

ProductImageSwiper.propTypes = {}



export default ProductImageSwiper