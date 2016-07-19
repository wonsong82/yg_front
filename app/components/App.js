require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Header from './Header'
import Page from './Page'
import Footer from './Footer'
import Frame from './Frame'
import MainMenu from './MainMenu'


class App extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const { page, themeColor, textColor, artistsList } = this.props

    return (
      <div className="App">
        <Page>{page}</Page>
        <MainMenu artists={artistsList} />
        <Frame color={themeColor} />
        <Footer bgColor={themeColor} textColor={textColor} />
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
  page: PropTypes.element.isRequired,
  popup: PropTypes.element
}



export default App
