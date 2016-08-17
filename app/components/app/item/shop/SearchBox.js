import React, { Component, PropTypes } from 'react'


class SearchBox extends Component {

  constructor(props) {
    super(props)
    this.state = { keywordValue: ''}

  }

  onSubmit(e){
    e.preventDefault()
    const { onSearchSubmit } = this.props
    onSearchSubmit(this.state.keywordValue)
    this.setState({keywordValue: ''})
    this.toggleInput()

  }


  onKeywordInputChange(e){
    this.setState({
      keywordValue: e.target.value
    })
  }

  toggleInput(){
    const input = $(this.refs.input)
    if(input.hasClass('hidden')){
      input.removeClass('hidden')
      input
        .velocity('stop')
        .velocity({
          opacity: 1
        }, {
          duration: 300,
          delay: 500
        })
      input.focus()
    }
    else {
      input.addClass('hidden')
      input
        .velocity('stop')
        .velocity({
          opacity: 0
        }, {
          duration: 300
        })
      input.blur()
    }
  }

  render() {

    return (
      <div className='SearchBox'>
        <form action="#" onSubmit={this.onSubmit.bind(this)}>

        <a className="icon" ref="icon" href="#" onClick={this.toggleInput.bind(this)}>
          <span className="icon-search" />
        </a>

        <input type="text" className="input hidden" ref="input" value={this.state.keywordValue} onChange={this.onKeywordInputChange.bind(this)} placeholder="Search products" />

        </form>
      </div>

    )
  }

}

SearchBox.propTypes = {}



export default SearchBox