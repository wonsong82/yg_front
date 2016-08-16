require('./Event.scss')
import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import EventGroup from '../../../transitions/app/item/event/EventGroup'


const Event = ({eventGroups, eventsAllLoaded, onViewMoreClick}) => (
    <div className="EventLayout">

      <h3>Event</h3>

      <div className="events-list">
        {
          eventGroups &&
          eventGroups.map( (events, i) => (
            <EventGroup key={'eventGroup-'+i} events={events} />
          ))
        }

        {
          !eventsAllLoaded &&
          <ViewMore className="view-more" onClick={onViewMoreClick} />
        }
      </div>




    </div>
)

Event.defaultProps = {
  pageType: 'Event'
}


export default Event

