import React, { Component, PropTypes } from 'react'


class Static extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.StaticPage .static-content').detach().appendTo($(this.refs.static))
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

