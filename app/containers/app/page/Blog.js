import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { initPage, loadBlogsList } from '../../../actions/'
import BlogComponent from '../../../components/app/page/Blog'




class Blog extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { initPage, loadBlogsList } = this.props
    initPage('Blog')
    loadBlogsList(4)
  }

  onViewMoreClick() {
    const { onViewMoreClick } = this.props
    onViewMoreClick(4)
  }


  render() {
    return <BlogComponent {...this.props} onViewMoreClick={this.onViewMoreClick.bind(this)} />
  }
}



const mapStateToProps = (state) => {
  const { posts, hotPosts, postsAllLoaded, hotPostsAllLoaded } = state.page
  return {
    posts,
    hotPosts,
    postsAllLoaded,
    hotPostsAllLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBlogViewMoreClick: count => { dispatch(loadBlogsList(count)) },
    onHotPostViewMoreClick: () => {},
    initPage: pageType => { dispatch(initPage(pageType)) },
    loadBlogsList: count => { dispatch(loadBlogsList(count)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)