import React from 'react'
import ProductThumb from './ProductThumb'


const ProductGroup = ({ products }) => (
  <div className="ProductGroup">
    {
      products &&
      products.map( product => (
        <ProductThumb key={'product-'+product.id} {...product} />
      ))
    }
  </div>
)


export default ProductGroup

