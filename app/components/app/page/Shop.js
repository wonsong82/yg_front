require('./Shop.scss')
import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import CategoryFilter from '../../../components/app/item/shop/CategoryFilter'
import SearchBox from '../../../components/app/item/shop/SearchBox'
import ProductGroup from '../../../transitions/app/item/shop/ProductGroup'


const Shop = ({ productGroups, productsAllLoaded, categories, isLoading, onViewMoreClick,onCategoryClick, onSearchSubmit }) => (
  <div className="Shop">

    <h3>Shop</h3>

    <div className="header">
      {
        categories &&
        <CategoryFilter categories={categories} onCategoryClick={onCategoryClick} />
      }

      {
        categories &&
        <SearchBox isLoading={isLoading} onSearchSubmit={onSearchSubmit} />
      }
    </div>


    <ul className="products-list">
      {
        productGroups &&
        productGroups.map( (products, i) => (
          <ProductGroup key={'productGroup-'+i} products={products} />
        ))
      }
    </ul>
    {
      !productsAllLoaded &&
      <ViewMore className="view-more" onClick={onViewMoreClick} />
    }

  </div>
)

Shop.defaultProps = {
  pageType: 'Shop'
}

export default Shop

