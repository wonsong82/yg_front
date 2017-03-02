require('./Page.scss')
import React, { Component, PropTypes } from 'react'
import SquareSpinner from '../../components/lib/spinner/SquareSpinner'

class Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 'auto'
    }
  }

  componentWillReceiveProps(nextProps) {
    // temprary fix
    if(nextProps.pagescroll){
      $('body').css({height: 'initial', overflow:'initial'});
    }
    else {
      $('body').css({height: '100%', overflow:'hidden'});
    }
    
    /*if(nextProps.pagescroll){
      this.setState({
        height: 'auto'
      })
    } else {
      this.setState({
        height: $(window).height()+'px'
      })
    }*/
  }


  render() {
    const { ready, color, children } = this.props

    return (
      <div className="Page" >
        { ready ?
          children :
          <div className="loading">
            <SquareSpinner color={color}/>
          </div>
        }
      </div>
    )

  }
}



export default Page

