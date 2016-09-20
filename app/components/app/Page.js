require('./Page.scss')
import React, { Component, PropTypes } from 'react'
import SquareSpinner from '../../components/lib/spinner/SquareSpinner'

class Page extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { ready, color, children, pagescroll } = this.props

    {console.log(pagescroll)}

      return (
        <div className={pagescroll? 'Page' : 'Page disabled'}>
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

