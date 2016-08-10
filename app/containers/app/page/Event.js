import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

import {initPage, loadEventsList} from '../../../actions/'
import EventComponent from '../../../components/app/page/Event'

class Event extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { initPage , loadEventsList} = this.props
        initPage('Event')
        loadEventsList(27)
    }

    onViewMoreClick(){
        const { onViewMoreClick } = this.props
        onViewMoreClick(27)
    }

    render(){
        return <EventComponent {...this.props}
                onViewMoreClick={this.onViewMoreClick.bind(this)}
        />
    }
}


const mapStateToProps = (state) => {
    const { events, eventsAllLoaded } = state.page

    return {
        events,
        eventsAllLoaded
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        initPage: pageType => { dispatch(initPage(pageType)) },
        loadEventsList: count => { dispatch(loadEventsList(count)) },
        onViewMoreClick: count => { dispatch(loadEventsList(count))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
