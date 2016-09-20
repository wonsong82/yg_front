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
    if(nextProps.pagescroll){
      this.setState({
        height: 'auto'
      })
    } else {
      this.setState({
        height: $(window).height()+'px'
      })
    }
  }


  render() {
    const { ready, color, children, pagescroll } = this.props

    return (
      <div className={pagescroll? 'Page' : 'Page disabled'} style={{height:this.state.height}}>
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

