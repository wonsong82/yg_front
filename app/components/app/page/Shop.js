require('./Shop.scss')
import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import CategoryFilter from '../../../components/app/item/shop/CategoryFilter'
import SearchBox from '../../../components/app/item/shop/SearchBox'
import ProductGroup from '../../../transitions/app/item/shop/ProductGroup'
import ViewMoreScroll from '../../../components/lib/link/ViewMoreScroll'


const Shop = ({ productGroups, productsAllLoaded, categories, isLoading, onViewMoreClick,onCategoryClick, onSearchSubmit, selectedCategory }) => (
  <div className="ShopLayout">

    <div className="header">
      <h3>Shop</h3>

      {
        categories &&
        <CategoryFilter categories={categories} onCategoryClick={onCategoryClick} selectedCategory={selectedCategory} />
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
          <ProductGroup key={`productGroup-${selectedCategory}-${i}`} products={products} />
        ))
      }
      {
        productGroups && !productGroups.length ?
          <h6 className="not-found">Sorry, that didn't match any product</h6> : ''
      }
    </ul>

    {/*{
      !productsAllLoaded && productGroups && productGroups.length ?
      <ViewMore className="view-more" onClick={onViewMoreClick} /> : ''
    }*/}

    {
      !productsAllLoaded && productGroups && productGroups.length ?
        <ViewMoreScroll onViewMore={onViewMoreClick} /> : ''
    }

  </div>
)

Shop.defaultProps = {
  pageType: 'Shop'
}

export default Shop

