require('./Popup.scss')
import React, { Component, PropTypes } from 'react'
import ScrollArea from 'react-scrollbar/dist/no-css'
import MenuButton from '../../components/lib/button/MenuButton'

class Popup extends Component {

  constructor(props) {
    super(props)
  }


  preventOtherScrolls(e){
    e.preventDefault()
  }


  componentDidMount() {
    $(this.refs.popup).on('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }
  componentWillUnmount() {
    $(this.refs.popup).off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }



  onCloseClick(e){
    e.preventDefault()
    this.props.onCloseClick()
  }


  render() {
    const { children } = this.props

    return (
      <div className="Popup" ref="popup">

        <div className="popup-container">

          <ScrollArea className="contents"
                      speed={0.8}
                      horizontal={false}
                      smoothScrolling={true}
                      contentClassName="content" >
            {children}

          </ScrollArea>

          <a className="close-button" href="#" onClick={this.onCloseClick.bind(this)}>
            <MenuButton color="#000000" close={true} />
          </a>


        </div>
      </div>
    )
  }
}

export default Popup