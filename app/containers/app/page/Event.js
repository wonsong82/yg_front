import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import EventComponent from '../../../components/app/page/Event'



const mapStateToProps = (state) => {
    console.log(state)
    const { } = state.page
    return {

    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        //onBlogViewMoreClick: count => { dispatch(loadBlogsList(count)) },

        //initPage: pageType => { dispatch(initPage(pageType)) },
        //loadBlogsList: count => { dispatch(loadBlogsList(count)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent)
