require('./Blog.scss')
import React from 'react'
import BlogThumb from '../../../components/app/item/blog/BlogThumb'
import BlogTextLink from '../../../components/app/item/blog/BlogTextLink'
import ViewMore from '../../../components/lib/link/ViewMore'
import Image from '../../../components/lib/image/Image'


const Blog = ({ posts, hotPosts, onViewMoreClick, banners,
onHotPostsViewMoreClick, postsAllLoaded, hotPostsAllLoaded }) => (

  <div className="BlogLayout page-grid">


    <section className="main">

      <h3>Blog</h3>

      <ul className="blog-list">
      {
        posts &&
        posts.map( post => (
          <li key={'blog' + post.id}>
            <BlogThumb {...post}  />
          </li>
        ))
      }
      </ul>

      {
        !postsAllLoaded &&
        <ViewMore className="view-more" onClick={onViewMoreClick} />
      }
    </section>



    <section className="side">

      <h3>Hot Posts</h3>

      <ul className="hot-post-list">
      {
        hotPosts &&
        hotPosts.map( post => (
          <li key={'hot' + post.id}>
            <BlogTextLink {...post} />
          </li>
        ))
      }
      </ul>

      {
        !hotPostsAllLoaded &&
        <ViewMore className="view-more" onClick={onHotPostsViewMoreClick} />
      }

      <ul className="banners">
      {
        banners &&
        banners.map( (banner, i) => (
          <li key={'banner' + i}>
            <a href={banner.target_url} >
              <Image className="banner-image" color="rgba(0,0,0,.30)" src={banner.thumbnail}/>
            </a>
          </li>
        ))
      }
      </ul>


    </section>

  </div>
)

Blog.defaultProps = {
  pageType: 'Blog'
}


export default Blog

