import { connect } from 'react-redux'
import React, { Component, ProTypes} from 'react'
import ShopComponent from '../../../components/app/page/Shop'

import { initPage , loadProductsList, setCategory, loadCategoriesList, loadProductsListOnSearch} from '../../../actions/'

class Shop extends Component{
    constructor(props) {
      super(props)
    }


    componentDidMount() {
      let { initPage, loadCategoriesList, loadProductsList } = this.props
      initPage('Shop')
      loadCategoriesList()
      loadProductsList(1)
      loadProductsList()
      loadProductsList()
    }

    onViewMoreClick(){
      let { onViewMoreClick } = this.props
      onViewMoreClick()
      onViewMoreClick()
      onViewMoreClick()
    }

    onCategoryClick(catID){
      let { initPage, loadCategoriesList, setCategory, loadProductsList } = this.props
      initPage('Shop')
      loadCategoriesList()
      setCategory(catID)
      loadProductsList(1)
      loadProductsList()
      loadProductsList()
    }

    onSearchSubmit(keyword){
      let { initPage, loadCategoriesList, setCategory, loadProductsListOnSearch } = this.props
      initPage('Shop')
      loadCategoriesList()
      setCategory(keyword.replace(' ','_'))
      loadProductsListOnSearch(keyword)
    }



    render() {
        return <ShopComponent {...this.props}
               onViewMoreClick={this.onViewMoreClick.bind(this)}
               onCategoryClick={this.onCategoryClick.bind(this)}
               onSearchSubmit={this.onSearchSubmit.bind(this)}
        />
    }
}

const mapStateToProps = (state) => {
  const { products, productsAllLoaded, selectedCategory, isLoading} = state.page
  const categories = state.page.categories ?
    [ {cat_ID:0, name:'All'}, ...state.page.categories ] : []


  return {
    categories,
    selectedCategory: selectedCategory || 0,
    productGroups: products,
    productsAllLoaded,
    isLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
    initPage: pageType => { dispatch(initPage(pageType)) },
    loadCategoriesList: () => { dispatch(loadCategoriesList())},
    loadProductsList: ( layoutType ) => { dispatch(loadProductsList( layoutType ))},
    setCategory: (categoryId) => { dispatch(setCategory( categoryId ))},
    loadProductsListOnSearch: ( keyword ) => { dispatch(loadProductsListOnSearch( keyword )) },
    onViewMoreClick: ( layoutType ) => { dispatch(loadProductsList( layoutType ))}
})


export default connect(mapStateToProps, mapDispatchToProps)(Shop)