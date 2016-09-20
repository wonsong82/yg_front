require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Page from '../components/app/Page'
import Popup from '../containers/app/Popup'
import Footer from '../components/app/Footer'
import Frame from '../components/app/Frame'
import Header from '../containers/app/Header'
import Menu from '../containers/app/Menu'
import Cart from '../containers/app/Cart'
import SquareSpinner from '../components/lib/spinner/SquareSpinner'



class App extends Component {

  constructor(props){
    super(props)
  }


  render(){
    const { page, popup, mainMenuOpened, cartOpened, themeColor, textColor, dataLoaded, startApp } = this.props

    const pagescroll = !(popup || cartOpened || mainMenuOpened)

    if( startApp ) {
      return (
        <div className="App">
          <Page ready={page.props.pageType == 'Static' ? true : dataLoaded} color={textColor} page={page} pagescroll={pagescroll} >{page}</Page>
          { dataLoaded && <Footer color={textColor} bgColor={themeColor}/> }
          <Frame color={textColor} bgColor={themeColor=='#f0f0f0'? 'rgba(240,240,240,0.9)': themeColor}/>
          { dataLoaded && <Popup color={textColor} bgColor={themeColor}>{popup}</Popup> }
          { dataLoaded && <Cart /> }
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
