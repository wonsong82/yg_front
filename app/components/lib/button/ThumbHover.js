require('./ThumbHover.scss')
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'


class ThumbHover extends Component {

  constructor(props) {
    super(props)
  }

  show(){
    $(findDOMNode(this)).addClass('show');
  }

  hide(){
    $(findDOMNode(this)).removeClass('show');
  }

  componentDidMount() {
    $(findDOMNode(this)).parent().on('mouseover', this.show.bind(this))
    $(findDOMNode(this)).parent().on('mouseout', this.hide.bind(this))
  }

  componentWillUnmount() {
    $(findDOMNode(this)).parent().off('mouseover', this.show.bind(this))
    $(findDOMNode(this)).parent().off('mouseout', this.hide.bind(this))
  }


  render() {
    return (
      <div className="ThumbHover">
        <div className="thumbhover-text">{this.props.text}</div>
      </div>
    )
  }

}

ThumbHover.propTypes = {}
ThumbHover.defaultProps = {
  text: 'Details'
}


export default ThumbHover
