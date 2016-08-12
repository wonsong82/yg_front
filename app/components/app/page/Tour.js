import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import TourThumb from '../../../components/app/item/tour/TourThumb'

const Tour = ({tours, toursAllLoaded, onViewMoreClick}) => (
    <div className="TourLayout">
      <h3>Tour</h3>
      <ul className="tours-list">
        {
          tours &&
          tours.map( tour => (
              <li key={tour.id}>
                <TourThumb {...tour} />
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

