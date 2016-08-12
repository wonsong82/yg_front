import { connect } from 'react-redux'
import React, { Component, ProTypes} from 'react'
import ShopComponent from '../../../components/app/page/Shop'

import { initPage , loadProductsList, setCategory, loadCategoriesList, loadProductsListOnSearch} from '../../../actions/'

class Shop extends Component{
    constructor(props) {
      super(props)
    }

    componentWillReceiveProps(props, state){

    }

    componentDidMount() {
      const e = this.props

      e.initPage('Shop')
      e.loadCategoriesList()
      e.loadProductsList(18)
    }

    onViewMoreClick(){
      const e = this.props
      e.loadProductsList(6)
    }

    onCategoryClick(catID){
      const e = this.props
      e.initPage('Shop')
      e.loadCategoriesList()
      e.setCategory(catID)
      e.loadProductsList(18)
    }

    onSearchSubmit(keyword){
      const e = this.props

      e.initPage('Shop')
      e.loadCategoriesList()
      e.setCategory(null)
      e.loadProductsListOnSearch(keyword)
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
  const { categories, products, productsAllLoaded, selectedCategory, isLoading} = state.page
  return {
    categories,
    selectedCategory,
    products,
    productsAllLoaded,
    isLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
    initPage: pageType => { dispatch(initPage(pageType)) },
    loadCategoriesList: () => { dispatch (loadCategoriesList())},
    loadProductsList: (count) => { dispatch (loadProductsList(count))},
    setCategory: (categoryId) => { dispatch(setCategory(categoryId))},
    loadProductsListOnSearch: (keyword) => {dispatch(loadProductsListOnSearch(keyword)) }
})


export default connect(mapStateToProps, mapDispatchToProps)(Shop)