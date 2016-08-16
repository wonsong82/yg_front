require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Page from '../components/app/Page'
import Popup from '../containers/app/Popup'
import Footer from '../components/app/Footer'
import Frame from '../components/app/Frame'
import Header from '../containers/app/Header'
import Menu from '../containers/app/Menu'
import SquareSpinner from '../components/lib/spinner/SquareSpinner'



class App extends Component {

  constructor(props){
    super(props)
  }


  render(){
    const { page, popup, themeColor, textColor, dataLoaded, startApp } = this.props


    if( startApp ) {
      return (
        <div className="App">
          <Page ready={page.props.pageType == 'Static' ? true : dataLoaded} color={textColor} page={page}>{page}</Page>
          <Footer color={textColor} bgColor={themeColor}/>
          <Frame color={textColor} bgColor={themeColor}/>
          <Popup color={textColor} bgColor={themeColor}>{popup}</Popup>
          <Menu />
          <Header color={textColor}/>
        </div>
      )
    }

    else {
      return (
        <div className="App">
          <div className="Page">
            <div className="loading">
              <SquareSpinner color="#000000" />
            </div>
          </div>
        </div>
      )
    }
  }
}




export default App
