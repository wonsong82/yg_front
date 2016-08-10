require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Page from '../components/app/Page'
import Footer from '../components/app/Footer'
import Frame from '../components/app/Frame'
import Header from '../containers/app/Header'
import Menu from '../containers/app/Menu'
import SquareSpinner from '../components/lib/spinner/SquareSpinner'



class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { page } = this.props
    if(page.props.pageType == 'Static'){
      $('.App .Page').empty()
      $('.StaticPage').detach().appendTo('.App .Page').removeClass('StaticPage').addClass('Static')
    }
  }


  render(){
    const { page, themeColor, textColor, dataLoaded, startApp } = this.props


    if( startApp ) {
      return (
        <div className="App">
          <Page ready={dataLoaded} color={textColor}>{page}</Page>
          <Footer color={textColor} bgColor={themeColor}/>
          <Frame color={textColor} bgColor={themeColor}/>
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
