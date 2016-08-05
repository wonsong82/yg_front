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
    return (
      <a href="#" onClick={this.onClick.bind(this)}>VIEW MORE</a>
    )
  }

}

ViewMore.propTypes = {
  onClick: PropTypes.func.isRequired
}



export default ViewMore