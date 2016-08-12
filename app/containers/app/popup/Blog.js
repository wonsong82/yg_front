import React, { Component } from 'react'
import { findDOMNode, unmountComponentAtNode } from 'react-dom'
import { connect } from 'react-redux'
import { initPopup, loadBlogPopup } from '../../../actions/'
import BlogComponent from '../../../components/app/popup/Blog'


class Blog extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { initPopup, loadBlogPopup } = this.props
    initPopup('Blog')
    loadBlogPopup( this.props.params.item )
  }

  render() {
    return <BlogComponent ref="mount" {...this.props} />
  }
}


const mapStateToProps = (state) => {
  const { title, date, facebookShareLink, twitterShareLink, image, content, related } = state.popup
  const { textColor, themeColor } = state.app
  return {
    title, date, facebookShareLink, twitterShareLink, image, content, related, textColor, themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {
      dispatch(initPopup(popupType))
    },
    loadBlogPopup: name => {
      dispatch(loadBlogPopup(name))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)