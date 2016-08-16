require('./Page.scss')
import React, { Component, PropTypes } from 'react'
import SquareSpinner from '../../components/lib/spinner/SquareSpinner'

class Page extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { page } = this.props
    if(page.props.pageType == 'Static'){
      $('.App .Page').empty()
      $('.StaticPage').detach().appendTo('.App .Page').removeClass('StaticPage').addClass('Static')
    }
  }


  shouldComponentUpdate(nextProps) {
    const { page } = nextProps
    return page.props.pageType!='Static'
  }


  render() {
    const { ready, color, children, page } = this.props

    if(page.props.pageType!='Static') {
      return (
        <div className="Page">
          { ready ?
            children :
            <div className="loading">
              <SquareSpinner color={color}/>
            </div>
          }
        </div>
      )
    }
    else {
      return (
        <div className="Page">
        </div>
      )
    }
  }
}



export default Page

