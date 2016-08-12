import React, { Component } from 'react'
import { connect } from 'react-redux'
import { redirect } from '../../actions/'
import PopupComponent from '../../transitions/app/Popup'

class Popup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      key: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.children !== 'undefined' && typeof this.props.children !== 'undefined' && typeof nextProps.children.props !== 'undefined' && typeof this.props.children.props !== 'undefined' && nextProps.children.props.params.item != this.props.children.props.params.item){
      this.setState({key: this.state.key+1})
    }
  }


  render() {
    return <PopupComponent reloadKey={this.state.key} {...this.props} />
  }
}


const mapStateToProps = (state) => {
  return {
    clickPosition: state.app.clickPosition
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let to = undefined
  if(ownProps.children) {
    const {location, params} = ownProps.children.props
    const fullpath = location.pathname

    if (fullpath.match(/^\/promotion\//)) {
      to = '/promotion'
    }
    else if (fullpath.match(/^\/artist\//)) {
      to = '/artist/' + params.name
    }
    else {
      to = fullpath.substring(0, fullpath.indexOf('/' + params.item))
    }
  }

  return {
    onCloseClick: () => { dispatch(redirect(to)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Popup)