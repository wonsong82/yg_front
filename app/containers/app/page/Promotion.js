import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import {initPage, loadPromotionsList} from '../../../actions/'
import PromotionComponent from '../../../components/app/page/Promotion'

class Promotion extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const e = this.props
    e.initPage('Promotion')
    e.loadPromotionsList()
  }

  render(){
    return <PromotionComponent {...this.props} />
  }
}

const mapStateToProps = (state) => {
  const {tours, products, albums, events} = state.page

  return {
      tours, products, albums, events
  }
}


const mapDispatchToProps = (dispatch) =>({
  initPage: pageType => { dispatch(initPage(pageType))},
  loadPromotionsList: () => { dispatch(loadPromotionsList())}
})




export default connect(mapStateToProps, mapDispatchToProps)(Promotion)
