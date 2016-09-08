import React from 'react'
import AnchorLink from '../../../../components/lib/link/AnchorLink'
import Ripple from '../../../../components/lib/effect/Ripple'
import moment from 'moment'

const TourSchedule = ({ tour_date: date, event_time: time, location, place, ticket_link: link, ticket_availability: available, themeColor, textColor }) => (

    <div className="TourSchedule" >

      <div className="info">
        <Ripple color="rgba(0,0,0,.5)"/>

        <div className="date">
          <div className="wrapper">
            <div>{moment(date).format('MMM')}</div>
            <div className="d">{moment(date).format('DD')}</div>
            <div>{moment(date).format('ddd')}</div>
          </div>
        </div>

        <div className="con">
          <div className="place">{place}</div>
          <div className="loc">{location}</div>
          <div className="time">{moment(`${date} ${time}`).format('hh:mm A')}</div>
        </div>

      </div>

      {available ?
      <AnchorLink className="ticket-link link" href={link} style={{backgroundColor: themeColor}}>
        <Ripple color="rgba(255,255,255,.5)"/>
        <div className="text-wrapper">
          <span className="text1" style={{color: textColor}}>TICKET</span>
          <span className="text2" style={{color: textColor}}>BUY</span>
        </div>
      </AnchorLink> :

      <div className="disabled-link link">
        <Ripple color="rgba(255,255,255,.5)"/>
        <div className="text-wrapper">
          <span className="text1">SOLD</span>
          <span className="text2">OUT</span>
        </div>
      </div>
      }



    </div>

  )


export default TourSchedule

