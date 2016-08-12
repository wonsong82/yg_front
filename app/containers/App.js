import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setThemeColor, setResponsiveMode, handleResponsiveChange, getAllData } from '../actions/'
import { computeThemeColor } from '../functions/'
import AppComponent from '../components/App'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pathname: ''
    }
  }

  componentDidMount(){
    const { setResponsiveMode, handleResponsiveChange, getAllData } = this.props
    setResponsiveMode($(window).width())
    handleResponsiveChange()
    getAllData()
  }

  componentWillReceiveProps(nextProps) {
    // 프레임과 텍스트 색
    if(this.state.pathname !== nextProps.location.pathname && nextProps.dataLoaded){
      const { themeColor, textColor } = computeThemeColor(nextProps)
      if(themeColor != this.props.themeColor)
        this.setState({
          pathname: nextProps.location.pathname
        })
        this.props.setThemeColor(themeColor, textColor)
    }

    // 팝업 라우트 핸들러
    console.log(nextProps)
  }


  render(){
    return <AppComponent {...this.props} />
  }

}



const mapStateToProps = (state) => {
  return {
    textColor         : state.app.textColor,
    themeColor        : state.app.themeColor,
    startApp          : state.app.startApp,
    mainMenuOpened    : state.mainMenu.opened,
    dataLoaded        : state.data.loaded,
    data              : state.data,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setThemeColor: ( themeColor, textColor ) => { dispatch(setThemeColor(themeColor, textColor) )},
    setResponsiveMode: ( width ) => { dispatch(setResponsiveMode(width)) },
    handleResponsiveChange: () => { dispatch(handleResponsiveChange()) },
    getAllData: () => { dispatch(getAllData()) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
