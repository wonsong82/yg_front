import React from 'react'


const Shop = ({
  id, title, price, salePrice, name, content, facebookShareLink,
  twitterShareLink, type, variation, images, related
}) => (

    <div className="Shop page-grid">

      {
        console.log(images)
      }
      <h1>id: {id}</h1>
      <h1>title: {title}</h1>

      <h1>name: {name}</h1>
      <h1>content: {content}</h1>

      <h1>twitterShareLink: {twitterShareLink}</h1>
      <h1>type: {type}</h1>
      <h1>images: {images}</h1>


      { (variation && variation.length) ?
        <div className="variation-container">

          {
            variation.map(e => (
              <li>
                { e.variation_id }
              </li>
            ))
          }
        </div>
        :null}


      { (related && related.length) ?
        <div className="related-container">

            {
              related.map(product => (
                <li>
                  { product.id }
                </li>
              ))
            }
        </div>
        :null}

    </div>
)


export default Shop

