require('./Header.scss')
import React, { PropTypes } from 'react'
import { Link } from 'react-router'


class Header extends React.Component {

  constructor(props){
    super(props)
  }

  onMenuClick(e){
    e.preventDefault()
    if(!this.props.isMenuButtonDisabled)
      this.props.onMenuClick()
  }

  render(){
    const { color, isMenuButtonDisabled } = this.props

    return (
      <div className="Header">

        <a href="#"
           onClick={this.onMenuClick.bind(this)}
           className={isMenuButtonDisabled? 'menu disabled': 'menu'} >
          <span className="icon-main-menu" style={{color}} />
        </a>

        <Link to="/" className="home">
          <span className="icon-logo" style={{color}} />
        </Link>

        {/* My Page Link */}

        {/* Cart Link */}


      </div>
    )
  }

}

Header.propTypes = {
  color: PropTypes.string.isRequired,
  isMenuButtonDisabled: PropTypes.bool.isRequired
}



export default Header


