import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import {initPage, loadToursList} from '../../../actions/'
import TourComponent from '../../../components/app/page/Tour'

class Tour extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const {initPage, loadToursList} = this.props
        initPage('Tour')
        loadToursList(4)
    }

    onViewMoreClick(){
        const { onViewMoreClick } = this.props
        onViewMoreClick(4)
    }


    render(){
        return <TourComponent {...this.props}
                              onViewMoreClick={this.onViewMoreClick.bind(this)}
        />
    }
}


const mapStateToProps = (state) => {
    const { tours , toursAllLoaded} = state.page

    return {
        tours,
        toursAllLoaded
    }
}


const mapDispatchToProps = (dispatch) =>({
    initPage: pageType => { dispatch(initPage(pageType))},
    loadToursList: count => { dispatch(loadToursList(count))},
    onViewMoreClick: count => { dispatch(loadToursList(count))}
})




export default connect(mapStateToProps, mapDispatchToProps)(Tour)
