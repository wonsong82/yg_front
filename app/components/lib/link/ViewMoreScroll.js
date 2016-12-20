import React, { Component, PropTypes } from 'react'


class ViewMoreScroll extends Component {

  constructor(props) {
    super(props)
    this.state = {
      curScrollHeight: 0,
      invalidated: false
    }
    this._timer = setInterval(()=>{}, 0)
  }


  componentDidMount() {
    this.setState({'curScrollHeight': $('body')[0].scrollHeight})

    // add event listener
    $(window).on('scroll', this.onScroll.bind(this))
  }

  componentWillUnmount() {
    $(window).off('scroll', this.onScroll.bind(this))
  }

  onScroll(){
    if(this.state.invalidated) return true

    let scrollPosition = $(window).scrollTop() + $(window).height(),
        scrollHeight = $('body')[0].scrollHeight,
        footerHeight = $('.Footer').height()

    if(scrollPosition >= scrollHeight - footerHeight){
      this.setState({
        invalidated: true
      })

      this._timer = setInterval(() => {
        //console.log('tick')
        let sh = $('body')[0].scrollHeight
        if(sh != this.state.curScrollHeight){
          clearInterval(this._timer)
          this.setState({
            invalidated: false,
            curScrollHeight : sh
          })
        }
      }, 150)
      this.props.onViewMore()
    }
  }


  render() {
    return null
  }

}

ViewMoreScroll.propTypes = {}



export default ViewMoreScroll