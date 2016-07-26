require('./EmailSignup.scss')
import React, { Component, PropTypes } from 'react'

import Spinner from './Spinner'


class EmailSignup extends Component {

  constructor(props) {
    super(props)
  }

  onSubmit(){

  }

  render() {
    const { title, themeColor, isLoading, color } = this.props

    return (
      <div className={"EmailSignup " + themeColor}>
        <h3>{title}</h3>
        <p>Enter your email address to receive all news from our website.</p>

        <form action="#" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="Enter your E-mail" />
          <button type="submit">
            { !isLoading ?
              <span className="icon-email"/>
            : <span className="loading-container">
                <Spinner color={color}/>
              </span> }
          </button>
        </form>

      </div>
    )
  }

}

EmailSignup.propTypes = {}



export default EmailSignup