
import React, { Component, PropTypes } from 'react'


class CategoryFilter extends Component {

  constructor(props) {
    super(props)
  }

  onCategoryClick(cat_ID, e) {
    e.preventDefault()
    this.props.onCategoryClick(cat_ID)
  }

  render() {
    const { categories, selectedCategory } = this.props

    return (
      <div className="CategoryFilter">
        <ul>
          {
            categories.map( category => (
            <li
              key={'cat-'+category.cat_ID}
              className={category.cat_ID==selectedCategory?'selected':''}
            >
              <a href="#" onClick={this.onCategoryClick.bind(this, category.cat_ID)}>{category.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

CategoryFilter.propTypes = {}



export default CategoryFilter