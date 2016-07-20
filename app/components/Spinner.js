require('./Spinner.scss')
import React, { Component, PropTypes } from 'react'


class Spinner extends Component {

  constructor(props) {
    super(props)
  }

  
  render() {
    const backgroundColor = this.props.color
    return (
      <div className="Spinner">
        <span class="tl box" style={{backgroundColor}} />
        <span class="tr box" style={{backgroundColor}} />
        <span class="bl box" style={{backgroundColor}} />
        <span class="br box" style={{backgroundColor}} />
      </div>
    )
  }
}

Spinner.propTypes = {
  color: PropTypes.string.required
}



export default Spinner
