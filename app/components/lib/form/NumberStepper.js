import React, { Component, PropTypes } from 'react'


class NumberStepper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }


  onChange(e){
    if(this.props.disabled) return false
    if(e.target.value.trim() == ''){
      this.setState({value: ''})
      return false
    }
    else if(isNaN(e.target.value)){
      return false
    }

    this.setState({value: parseFloat(e.target.value)})
    this.props.onChange(e.target.value)
  }

  onBlur(e){
    if(this.props.disabled) return false
    if(e.target.value.trim() == ''){
      this.setState({value:0})
      this.props.onChange(0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.disabled) return false
    if(this.state.value != nextProps.value)
      this.setState({value: nextProps.value})
  }


  onStepup(e){
    if(this.props.disabled) return false
    e.preventDefault()
    let { step, max } = this.props
    step = parseFloat(step)
    max = parseFloat(max)
    let cur = parseFloat(this.state.value)
    if(cur < max){
      if(cur+step > max){
        this.setState({value: max})
        this.props.onChange(max)
      }
      else {
        this.setState({value: cur+step})
        this.props.onChange(cur+step)
      }
    }
  }



  onStepdown(e){
    if(this.props.disabled) return false
    e.preventDefault()
    let { step, min } = this.props
    step = parseFloat(step)
    min = parseFloat(min)
    let cur = parseFloat(this.state.value)
    if(cur > min){
      if(cur-step < min){
        this.setState({value: min})
        this.props.onChange(min)
      }
      else {
        this.setState({value: cur-step})
        this.props.onChange(cur-step)
      }
    }
  }


  render() {
    let classes = this.props.className ? `NumberStepper ${this.props.className}` : 'NumberStepper'
    classes = this.props.disabled ? `${classes} disabled` : classes

    return (
      <div className={classes}>

        <input className="input" type="text" value={this.state.value}
               onChange={this.onChange.bind(this)}
               onBlur={this.onBlur.bind(this)}
        />
        <span className="stepup" onClick={this.onStepup.bind(this)}>▲</span>
        <span className="stepdown" onClick={this.onStepdown.bind(this)}>▼</span>


      </div>
    )
  }

}

NumberStepper.propTypes = {}
NumberStepper.defaultProps = {
  value: 0,
  step: 1,
  min: 0,
  max: 100,
  disabled: false,
  onChange: ()=>{}
}


export default NumberStepper