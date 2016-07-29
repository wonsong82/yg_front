require('./EmailSignup.scss')
import React, { Component, PropTypes } from 'react'
import SquareSpinner from '../../../components/lib/spinner/SquareSpinner'


class EmailSignup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      emailValue: ''
    }
  }

  onSubmit(e){
    e.preventDefault()
    if(!this.props.isLoading){
      this.props.onSubmit(this.state.emailValue)

    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.isLoading){
      this.setState({
        emailValue: ''
      })
    }
  }


  onEmailInputChange(e){
    this.setState({
      emailValue: e.target.value
    })
  }

  render() {
    const { title, themeColor, isLoading, color } = this.props

    return (
      <div className={"EmailSignup " + themeColor}>
        <h3>{title}</h3>
        <p>Enter your email address to receive all news from our website.</p>

        <form action="#" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="Enter your E-mail" value={this.state.emailValue} onChange={this.onEmailInputChange.bind(this)} />
          <button type="submit">
            { !isLoading ?
              <span className="icon-email"/>
            : <span className="loading-container">
                <SquareSpinner color={color}/>
              </span> }
          </button>
        </form>

      </div>
    )
  }
}

EmailSignup.propTypes = {
  title: PropTypes.string.isRequired,
  themeColor: PropTypes.oneOf(['dark', 'light']),
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}



export default EmailSignup