require('./SwiperScroll.scss')
import React, { Component, PropTypes } from 'react'


class SwiperScroll extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let swiper = new Swiper($(this.refs.swiperScroll), {
      scrollbar: $(this.refs.scrollbar),
      direction: 'vertical',
      scrollbarDraggable: true,
      slidesPerView: 'auto',
      mousewheelControl: true,
      autoHeight: true,
      freeMode: true,

      //touchMoveStopPropagation: false

    })
  }


  render() {
    return (
      <div className="swiper-container SwiperScroll" ref="swiperScroll">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            {this.props.children}
          </div>
        </div>
        <div className="swiper-scrollbar" ref="scrollbar" />
      </div>
    )
  }

}

SwiperScroll.propTypes = {}



export default SwiperScroll