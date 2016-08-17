require('./Ripple.scss')
import React, { Component, PropTypes } from 'react'


class Ripple extends Component {

  constructor(props) {
    super(props)
    this.state = {
      diameter: 0,
      hold: false,
      transit: false
    }
  }

  componentDidMount() {
    this.element = $(this.refs.ripple).parent()
    this.showTimer = setTimeout(()=>{}, 0)
    this.hideTimer = setTimeout(()=>{}, 0)

    if(this.element.css('position')=='static'){
      this.element.css('position','relative')
    }
    this.setState({
      diameter: this.getDiameter()
    })
    this.element.on('mousedown',  this.onMouseDown.bind(this))
    this.element.on('mouseup',    this.onMouseUp.bind(this))
    this.element.on('mouseleave', this.onMouseLeave.bind(this))
  }

  componentWillUnmount() {
    this.element.off('mousedown', this.onMouseDown.bind(this))
    this.element.off('mouseup',   this.onMouseUp.bind(this))
    this.element.off('mouseleave', this.onMouseLeave.bind(this))
  }

  shouldComponentUpdate() {
    return this.getDiameter() != this.state.diameter
  }

  componentWillUpdate() {
    this.setState({
      diameter: this.getDiameter()
    })
  }


  render() {
    const { diameter } = this.state
    return (
      <span className="Ripple" ref="ripple">
        <span className="diameter" ref="diameter"  style={ {width: diameter, height: diameter, opacity:0} }>
          <span className="bg" ref="bg" style={ {backgroundColor: $(this.element).css('color')} } />
        </span>
      </span>

    )
  }

  onMouseDown(e) {
    if(this.props.disabled) return false

    const { left, top } = this.getMousePos(e)
    const { diameter } = this.state
    const { opacity, duration, easing, color } = this.props

    $(this.refs.diameter)
      .velocity('stop')
      .css({
        opacity: 0, width: 0, height: 0, left, top
      })
      .velocity({
        opacity: opacity * 2, width: diameter, height: diameter
      }, {
        duration: duration * 3, easing
      })
    $(this.refs.bg)
      .css({backgroundColor: color })

    clearTimeout(this.showTimer)
    this.showTimer = setTimeout(()=>{
      if(!this.state.hold){

        $(this.refs.diameter)
          .velocity('stop')
          .velocity({
            width: diameter * 1.2, height: diameter * 1.2, opacity: 0
          }, {
            duration: duration * 3, easing
          })
      }
      this.setState({ transit: false })
    }, duration * 0.5)

    this.setState({ hold: true, transit: true })
  }

  onMouseUp() {
    if(this.props.disabled) return false

    const { diameter } = this.state
    const { duration, easing } = this.props

    this.setState({ hold: false })
    if(!this.state.transit) {
      $(this.refs.diameter)
        .velocity('stop')
        .velocity({
          width : diameter * 1.2, height: diameter * 1.2, opacity: 0
        }, {
          duration: duration * 3, easing
        })
    }
  }

  onMouseLeave() {
    if(this.props.disabled) return false

    if(this.props.disabled) return false

    const { diameter } = this.state
    const { duration, easing } = this.props

    this.setState({ hold: false })
    if(!this.state.transit) {
      $(this.refs.diameter)
        .velocity('stop')
        .velocity({
          width : diameter * 1.2, height: diameter * 1.2, opacity: 0
        }, {
          duration: duration * 3, easing
        })
    }
  }

  getMousePos(e) {
    const left  = Math.abs(this.element[0].getBoundingClientRect().left - e.clientX),
          top   = Math.abs(this.element[0].getBoundingClientRect().top  - e.clientY)
    return { left, top }
  }


  getDiameter() {
    const w = parseFloat($(this.element).css('width'))
    const h = parseFloat($(this.element).css('height'))
    const radius = Math.sqrt(Math.pow(w,2) + Math.pow(h,2))
    return radius * this.props.radius

  }
}

Ripple.defaultProps = {
  duration: 300,
  easing: 'easeOutCubic',
  radius: 1.1,
  opacity: 0.15,
  disabled: false,
  color: 'rgba(0,0,0, 0.5)'
}




export default Ripple