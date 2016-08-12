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
    console.log("will mount")
  }

  /*componentWillReceiveProps(nextProps) {
    if (this.props.params.item != nextProps.params.item){
      /!*const { initPopup, loadBlogPopup } = this.props
      initPopup('Blog')
      loadBlogPopup( nextProps.params.item )*!/
      unmountComponentAtNode(findDOMNode(this.refs.mount))
    }
  }
*/

  /*componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.params.item != prevProps.params.item){
      console.log(this.refs.mount)
      //unmountComponentAtNode(findDOMNode(this.refs.mount))
    }
  }*/


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