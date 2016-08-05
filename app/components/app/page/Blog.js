import React from 'react'
import BlogLink from '../../../components/app/item/BlogLink'
import BlogTextLink from '../../../components/app/item/BlogTextLink'
import ViewMore from '../../../components/lib/link/ViewMore'


const Blog = ({ posts, hotPosts, onBlogViewMoreClick, onHotPostViewMoreClick, postsAllLoaded, hotPostsAllLoaded }) => (

  <div className="BlogLayout">


    <section className="main">

      <h3>Blog</h3>

      <ul className="blog-list">
      {
        posts &&
        posts.map( post => (
          <li>
            <BlogLink key={post.id} {...post}  />
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
          <li>
            <BlogTextLink key={post.id} {...post} />
          </li>
        ))
      }
      </ul>

      {
        !hotPostsAllLoaded &&
        <ViewMore onClick={onHotPostViewMoreClick} />
      }

    </section>

  </div>
)

Blog.defaultProps = {
  pageType: 'Blog'
}


export default Blog

