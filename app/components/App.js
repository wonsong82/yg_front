require('./App.scss')
import React, { Component, PropTypes } from 'react'
import TransitionGroup from 'react/lib/ReactTransitionGroup'

import Page from './Page'
import Footer from './Footer'
import Frame from './Frame'
import MainMenuContainer from '../containers/MainMenuContainer'
import HeaderContainer from '../containers/HeaderContainer'


class App extends Component {

  constructor(props){
    super(props)
  }
  

  render(){
    
    const { page, themeColor, textColor, artistsList, mainMenuOpened } = this.props

    return (
      <div className="App">
        <Page>{page}</Page>        
        <Frame color={themeColor} />
        
        <TransitionGroup className="MainMenuTransition" component="div">
          {mainMenuOpened && <MainMenuContainer artists={artistsList}  />}
        </TransitionGroup>
        
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
