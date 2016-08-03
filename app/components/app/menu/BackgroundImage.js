require('./BackgroundImage.scss')
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'


class MainMenuImage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillEnter(callback){
    callback()
    $(findDOMNode(this))
      .velocity('stop', true)
      .velocity({opacity:1}, {
        duration: 500,
        easing: 'easeInOutQuad'
      })
  }

  componentWillLeave(callback){
    $(findDOMNode(this))
      .velocity('stop', true)
      .velocity({opacity:0}, {
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
          try {
            callback()
          }
          catch(e){}

        }
      })
  }

  shouldComponentUpdate(nextProps) {
      return this.props.image != nextProps.image
  }


  componentWillUpdate() {
    this.currentOpacity = $(findDOMNode(this.refs.current)).css('opacity')

  }

  componentDidUpdate() {
    $(findDOMNode(this.refs.prev))
      .css({opacity: this.currentOpacity})


    $(findDOMNode(this.refs.current))
      .velocity('stop',true)
      .velocity({opacity:1}, {
        duration: 500,
        easing: 'easeInOutQuad',
        begin: e => $(e).css({opacity: 0})
      })
  }


  render() {
    const { image, prevImage } = this.props 

    return (
      <div className="BackgroundImage">
        <span ref="prev" className="image prev" style={{backgroundImage:'url("'+prevImage+'")'}}  />
        <span ref="current" className="image current" style={{backgroundImage:'url("'+image+'")'}} />
      </div>
      
    )
  }
  
}

MainMenuImage.propTypes = {}



export default MainMenuImage