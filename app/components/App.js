require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Page from '../components/app/Page'
import Footer from '../components/app/Footer'
import Frame from '../components/app/Frame'
import Header from '../containers/app/Header'
import Menu from '../containers/app/Menu'



class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { page } = this.props
    if(page.type.name == 'Static'){
      $('.App .Page').empty()
      $('.StaticPage').detach().appendTo('.App .Page').removeClass('StaticPage').addClass('Static')
    }
  }


  render(){
    const { page, themeColor, textColor, pageLoaded } = this.props


    return (
      <div className="App">

        <Page ready={pageLoaded} color={textColor}>{page}</Page>
        <Frame color={themeColor} />
        <Footer color={textColor} />
        <Menu />
        <Header color={textColor} />
      </div>
    )
  }
}

App.propTypes = {
  isArtistLoading: PropTypes.bool.isRequired,
  artistsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      bg: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      themeColor: PropTypes.string.isRequired
    })
  ).isRequired,
  themeColor: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(['#ffffff', '#000000']).isRequired,
  mainMenuOpened: PropTypes.bool.isRequired,
  page: PropTypes.element.isRequired,
  popup: PropTypes.element
}



export default App
