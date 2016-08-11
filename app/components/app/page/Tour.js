import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'

const Tour = ({tours, toursAllLoaded, onViewMoreClick}) => (
    <div className="TourLayout">
      <h3>Tour</h3>
      <ul className="tours-list">
        {
          tours &&
          tours.map( tour => (
              <li key={tour.id}>
                {tour.id}
              </li>
          ))
        }
      </ul>

      {
        !toursAllLoaded &&
        <ViewMore onClick={onViewMoreClick} />
      }
    </div>
)

Tour.defaultProps = {
  pageType: 'Tour'
}


export default Tour

