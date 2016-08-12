import React from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import EventThumb from '../../../components/app/item/event/EventThumb'


const Event = ({events, eventsAllLoaded, onViewMoreClick}) => (
    <div className="EventLayout">

      <h3>Event</h3>

        <ul className="events-list">
            {
                events &&
                events.map( event => (
                    <li key={event.id}>
                        <EventThumb {...event} />
                    </li>
                ))
            }
        </ul>

        {
            !eventsAllLoaded &&
            <ViewMore onClick={onViewMoreClick} />
        }

    </div>
)

Event.defaultProps = {
  pageType: 'Event'
}


export default Event

