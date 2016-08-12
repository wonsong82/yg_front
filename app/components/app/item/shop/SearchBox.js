import React, { Component, PropTypes } from 'react'


class SearchBox extends Component {

  constructor(props) {
    super(props)
    this.state = { keywordValue: ''}

  }

  onSubmit(e){
    e.preventDefault()
    this.props.onSearchSubmit(this.state.keywordValue)
  }


  onKeywordInputChange(e){
    this.setState({
      keywordValue: e.target.value
    })
  }

  render() {
    
    return (
      <div className={"SearchBox"}>
        <h3>searchBox</h3>
        <p>keyword</p>

        <form action="#" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" value={this.state.keywordValue} onChange={this.onKeywordInputChange.bind(this)} />
          <button type="submit">FIND
          </button>
        </form>
      </div>
    )
  }

}

SearchBox.propTypes = {}



export default SearchBox