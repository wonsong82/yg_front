import React from 'react'
import EventThumb from './EventThumb'


const EventGroup = ({ events }) => (
    <div className="EventGroup">
      {
        events && events.length &&
        events.map( event => (
          <EventThumb key={'event-'+event.id} {...event} />
        ))
      }
    </div>
)


export default EventGroup

