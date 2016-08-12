import React from 'react'


const Music = ( {image, title, albumPrice, salePrice, albumProductId, name, content, facebookShareLink,  music, related} ) => (
    <div className="Music page-grid">

      <h1>image: {image}</h1>
      <h5>title: {title}</h5>
      <h5>albumPrice: {albumPrice}</h5>
      <h5>salePrice: {salePrice}</h5>
      <h5>name: {name}</h5>
      <h5>content: {content}</h5>

      <div className="musics-list">
        <h6>Music List</h6>
        {
          music &&
          music.map( m => (
            <li>
              {m.post_title}
            </li>
          ))
        }
      </div>

      <div className="related-container">
        <h6>Related Album</h6>
        {
          related &&
          related.map( album => (
            <li key={'album' + album.id}>
              album.title
            </li>
          ))
        }
      </div>

    </div>
)


export default Music

