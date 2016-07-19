require('./Header.scss')
import React from 'react'
import { Link } from 'react-router'


class Header extends React.Component {

  constructor(props){
    super(props)
  }

  onMenuClick(e){
    e.preventDefault()
  }

  render(){
    const { color } = this.props

    return (
      <div className="Header">

        <a href="#" onClick={this.onMenuClick.bind(this)} className="menu">
          <span className="icon-main-menu" style={{color}} />
        </a>

        <Link to="/" className="home">
          <span className="icon-logo" style={{color}} />
        </Link>

        


      </div>
    )
  }

}



export default Header


