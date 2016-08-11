import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import { initPage, loadBlogsList, loadHotPostsList, setThemeColor } from '../../../actions/'
import BlogComponent from '../../../components/app/page/Blog'




class Blog extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { initPage, loadBlogsList, loadHotPostsList } = this.props
    initPage('Blog')
    loadBlogsList(4)
    loadHotPostsList(4)
    // test
    //this.props.setThemeColor('#ff6600', '#000000')

  }

  onViewMoreClick() {
    const { onViewMoreClick } = this.props
    onViewMoreClick(4)
  }

  onHotPostsViewMoreClick() {
    const { onHotPostsViewMoreClick } = this.props
    onHotPostsViewMoreClick(4)
  }

  render() {
    return <BlogComponent {...this.props}
                          onViewMoreClick={this.onViewMoreClick.bind(this)}
                          onHotPostsViewMoreClick={this.onHotPostsViewMoreClick.bind(this)} />
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
    onHotPostsViewMoreClick: count => { dispatch(loadHotPostsList(count)) },
    initPage: pageType => { dispatch(initPage(pageType)) },
    loadBlogsList: count => { dispatch(loadBlogsList(count)) },
    loadHotPostsList: count => { dispatch(loadHotPostsList(count)) },
    // test
    //setThemeColor: ( bgColor, textColor ) => { dispatch(setThemeColor(bgColor, textColor)) }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)