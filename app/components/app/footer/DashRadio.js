require('./DashRadio.scss')
import React, { Component, PropTypes } from 'react'


class DashRadio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  onClick(e){
    if(this.state.isOpen){
      this.setState({isOpen: false})
    }
    else {
      this.setState({isOpen: true})
    }
    e.preventDefault()
  }

  render(){
    const { color } = this.props
    const classes = this.state.isOpen ? 'DashRadio show' : 'DashRadio'

    return (
      <div className={classes} >

        {/*<span className="border" style={{backgroundColor: color}} />*/}

        <div className="header" onClick={this.onClick.bind(this)}>
          <h6 className="title" style={{color}} >RADIO</h6>
          <div className="button">
            <span className="icon-arrow-up icon" style={{color}} title="Open dash radio" />
            <span className="icon-arrow-down icon" style={{color}} title="Close dash radio" />
          </div>
        </div>

        <iframe className="radio" src="https://dashradio.com/player/?id=125&autoplay=0" frameborder="0"></iframe>

        {/*<span className="border" style={{backgroundColor: color}} />*/}
      </div>
    )
  }
}




export default DashRadio
