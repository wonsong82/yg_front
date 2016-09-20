require('./Header.scss')
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import MenuButton from '../../components/lib/button/MenuButton'
import AnchorLink from '../../components/lib/link/AnchorLink'



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

  onCartClick(e){
    e.preventDefault()
    this.props.onCartClick()
  }

  render(){
    const { color, isMenuButtonDisabled, isMenuOpened, productsCount } = this.props

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


        <AnchorLink
          href="/my-account"
          className="my-account"
           >
          <span className="icon-log-in" style={{color}} />
        </AnchorLink>

        <a href="#"
           onClick={this.onCartClick.bind(this)}
           className="cart" >
          <span className="icon-shopping-bag" style={{color}} />
          <span className="quantity" style={{color}}>{productsCount}</span>
        </a>

        {/*<div className="cart-notifier">
          <i class="material-icons">&#xE5C7;</i>
          <div className="cart-notified-content">aoefjiofij</div>
        </div>*/}

      </div>
    )
  }

}

Header.propTypes = {
  color: PropTypes.string.isRequired,
  isMenuButtonDisabled: PropTypes.bool.isRequired
}



export default Header


