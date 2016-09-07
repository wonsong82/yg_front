require('./SquareSpinner.scss')
import React, { Component, PropTypes } from 'react'


class SquareSpinner extends Component {

  constructor(props) {
    super(props)
  }

  
  render() {
    const backgroundColor = this.props.color

    return (
      <div className="SquareSpinner">
        <span className="tl box" style={{backgroundColor}} />
        <span className="tr box" style={{backgroundColor}} />
        <span className="bl box" style={{backgroundColor}} />
        <span className="br box" style={{backgroundColor}} />
      </div>
    )
  }
}

SquareSpinner.propTypes = {
  color: PropTypes.string.isRequired
}



export default SquareSpinner
