require('./Header.scss')
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import MenuButton from './MenuButton'



class Header extends React.Component {

  constructor(props){
    super(props)
  }

  onMenuClick(e){
    e.preventDefault()
    if(!this.props.isMenuButtonDisabled)
      this.props.onMenuClick()
  }

  onHomeClick(){
    this.props.onHomeClick()
  }

  render(){
    const { color, isMenuButtonDisabled, isMenuOpened } = this.props

    return (
      <div className="Header">

        <a href="#"
           onClick={this.onMenuClick.bind(this)}
           className={isMenuButtonDisabled? 'menu disabled': 'menu'} >
          
            <MenuButton color={color} close={isMenuOpened} />
          
        </a>

        <Link to="/"
              className="home"
              onClick={this.onHomeClick.bind(this)}>
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


