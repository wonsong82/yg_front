require('./Static.scss')
import React, { Component, PropTypes } from 'react'


class Static extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.StaticPage .static-content').detach().appendTo($(this.refs.static))
    $('.StaticPage').detach()

    require('./static/AboutUs.js')

  }


  render() {
    return (
      <div className="Static" ref="static"></div>
    )
  }
}


Static.defaultProps = {
  pageType: 'Static'
}


export default Static

