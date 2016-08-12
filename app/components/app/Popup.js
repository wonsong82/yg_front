require('./Popup.scss')
import React, { Component, PropTypes } from 'react'
import ScrollArea from 'react-scrollbar/dist/no-css'
import MenuButton from '../../components/lib/button/MenuButton'

class Popup extends Component {

  constructor(props) {
    super(props)
  }


  onCloseClick(e){
    e.preventDefault()
    this.props.onCloseClick()
  }


  render() {
    const { children } = this.props

    return (
      <div className="Popup">

        <div className="popup-container">
          <div className="header">
            <a className="close-button" href="#" onClick={this.onCloseClick.bind(this)}>
              <MenuButton color="#000000" close={true} />
            </a>
          </div>

          <ScrollArea className="contents"
                      speed={0.8}
                      horizontal={false}
                      smoothScrolling={true}
                      contentClassName="content" >
            {children}

          </ScrollArea>
        </div>
      </div>
    )
  }
}

export default Popup