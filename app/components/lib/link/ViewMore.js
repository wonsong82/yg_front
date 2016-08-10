import React, { Component, PropTypes } from 'react'


class ViewMore extends Component {

  constructor(props) {
    super(props)
  }

  onClick(e) {
    e.preventDefault()
    const { onClick } = this.props
    onClick()
  }

  render() {
    let classes = 'ViewMore'
    if(this.props.className) classes += ' ' + this.props.className
    let text = this.props.text || 'VIEW MORE'

    return (
      <a className={classes} href="#" onClick={this.onClick.bind(this)}>{text}</a>
    )
  }

}

ViewMore.propTypes = {
  onClick: PropTypes.func.isRequired
}



export default ViewMore