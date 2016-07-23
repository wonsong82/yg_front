require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Page from './Page'
import Footer from './Footer'
import Frame from './Frame'
import HeaderContainer from '../containers/HeaderContainer'
import MainMenuTransitionContainer from '../containers/MainMenuTransitionContainer'


class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { page } = this.props
    if(page.type.name == 'StaticLayout'){
      $('.App .Page').empty()
      $('.StaticPage').detach().appendTo('.App .Page').removeClass('StaticPage').addClass('StaticLayout')
    }
  }


  render(){
    const { page, themeColor, textColor } = this.props    

    
    return (
      <div className="App">
        
        <Page>{ page }</Page>
        
        <Frame color={themeColor} />

        <MainMenuTransitionContainer />

        <HeaderContainer color={textColor} />
        <Footer color={textColor} />

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
