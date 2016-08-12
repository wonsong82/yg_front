import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import CategoryFilter from '../../../components/app/item/shop/CategoryFilter'
import SearchBox from '../../../components/app/item/shop/SearchBox'

const Shop = ({products, productsAllLoaded, categories, isLoading, onViewMoreClick,onCategoryClick, onSearchSubmit}) => (
  <div className="Shop">
    <h3>Shop</h3>

    {
      categories &&
      <CategoryFilter categories={categories} onCategoryClick={onCategoryClick} />
    }

    {
      categories &&
      <SearchBox isLoading={isLoading} onSearchSubmit={onSearchSubmit} />
    }


    <ul className="products-list">
      {
        products &&
        products.map( product => (
            <li key={product.id}>
              {product.id}
            </li>
        ))
      }
    </ul>
    {
      !productsAllLoaded &&
      <ViewMore onClick={onViewMoreClick} />
    }

  </div>
)

Shop.defaultProps = {
  pageType: 'Shop'
}

export default Shop

