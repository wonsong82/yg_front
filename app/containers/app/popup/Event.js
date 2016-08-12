import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initPopup, loadEventPopup } from '../../../actions/'
import EventComponent from '../../../components/app/popup/Event'


class Event extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    const e = this.props
    e.initPopup('Event')
    e.loadEventPopup(this.props.params.item)
  }




  render(){
    return <EventComponent {...this.props}/>
  }


}

const mapStateToProps = (state) => {
  const { title, date, facebookShareLink, twitterShareLink, image, content, related } = state.popup
  return {
    title, date, facebookShareLink, twitterShareLink, image, content, related
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPopup: popupType => {dispatch(initPopup(popupType))},
    loadEventPopup: name => {dispatch(loadEventPopup(name))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Event)