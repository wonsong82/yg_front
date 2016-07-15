require('./App.scss')
import React, { Component, PropTypes } from 'react'

import Header from './Header'
import Page from './Page'
import Footer from './Footer'
import Frame from './Frame'


class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { getArtistsIfNeeded } = this.props
    getArtistsIfNeeded()
  }

  render(){
    return (
      <div className="App">

        <Page />
        <Frame color="#f87c91" />
        <Header color="#ffffff" />
        <Footer color="#f87c91" />


      </div>
    )
  }


}

App.propTypes = {
  getArtistsIfNeeded: PropTypes.func.isRequired,
  artistsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      bg: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      themeColor: PropTypes.string.isRequired
    })
  ).isRequired
}



export default App
