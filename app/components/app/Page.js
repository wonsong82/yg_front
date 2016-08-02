require('./Page.scss')
import React from 'react'
import SquareSpinner from '../../components/lib/spinner/SquareSpinner'


const Page = ({ ready, color, children }) => (
    <div className="Page">
      { ready ?
        children :
        <div className="loading">
          <SquareSpinner color={color} />
        </div>
      }
    </div>
)


export default Page

