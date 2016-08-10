require('./Blog.scss')
import React from 'react'
import BlogThumb from '../../../components/app/item/blog/BlogThumb'
import BlogTextLink from '../../../components/app/item/blog/BlogTextLink'
import ViewMore from '../../../components/lib/link/ViewMore'


const Blog = ({ posts, hotPosts, onBlogViewMoreClick, onHotPostsViewMoreClick, postsAllLoaded, hotPostsAllLoaded }) => (

  <div className="BlogLayout page-grid">


    <section className="main">

      <h3>Blog</h3>

      <ul className="blog-list">
      {
        posts &&
        posts.map( post => (
          <li key={post.id}>
            <BlogThumb {...post}  />
          </li>
        ))
      }
      </ul>

      {
        !postsAllLoaded &&
        <ViewMore onClick={onBlogViewMoreClick} />
      }
    </section>



    <section className="side">

      <h3>Hot Posts</h3>

      <ul className="hot-post-list">
      {
        hotPosts &&
        hotPosts.map( post => (
          <li key={post.id}>
            <BlogTextLink {...post} />
          </li>
        ))
      }
      </ul>

      {
        !hotPostsAllLoaded &&
        <ViewMore onClick={onHotPostsViewMoreClick} />
      }

    </section>

  </div>
)

Blog.defaultProps = {
  pageType: 'Blog'
}


export default Blog

