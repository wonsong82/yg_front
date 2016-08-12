import React from 'react'


const Tour = ({startDate, endDate, name, themeColor, title, subtitle,
  content, image, facebookShareLink, twitterShareLink, tourSchedule}) => (
  <div className="Tour page-grid">


    <h1>{startDate} - {endDate}</h1>
    <h5>{name}</h5>
    <h5>Content: {content}</h5>

    <div className="tour-schedule">
      <h6>Tour Schedule</h6>
      {
        tourSchedule.map( schedule => (
          <li>
            {schedule.ticket_link}
          </li>
        ))

      }

    </div>

  </div>
)


export default Tour

