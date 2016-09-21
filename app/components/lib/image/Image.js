require('./Image.scss')
import React, { Component, PropTypes } from 'react'
import SquareSpinner from '../spinner/SquareSpinner'


class Image extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imgLoaded: false,
      showLoading: true
    }
    this._mounted = false
  }

  componentDidMount() {
    this._mounted = true
    const { src } = this.props

    if( src ) {
      this.loadImages(src, this.showImage.bind(this) )
    }

    else {
      this.stopLoading()
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }


  showImage() {
    if(this._mounted) {
      this.setState({
        imgLoaded: true
      })
    }
    this.stopLoading()
  }

  stopLoading() {
    if(this._mounted) {
      this.setState({
        showLoading: false
      })
    }
  }


  loadImages( images, callback ) {
    images instanceof Array || (images = [images])
    const count = images.length
    var loaded = 0
    for( let i=0; i<count; i++ ){
      var img = document.createElement('img')
      img.onload = () => {
        loaded++
        loaded >= count && typeof callback === 'function' && callback()
      }
      img.src = images[i]
    }
  }

  render() {
    const { src, color } = this.props

    let classes = 'Image'
    if(this.props.className) classes += ' ' + this.props.className

    let css = {backgroundColor: color}
    if(this.state.imgLoaded){
      css.backgroundImage = 'url(' + src + ')'
    }


    return (
      <span className={classes} style={ css }>
        { this.state.showLoading && <div className="spinner"><SquareSpinner color="rgba(255,255,255,.5)" /></div> }
      </span>
    )
  }

}

Image.propTypes = {}



export default Image