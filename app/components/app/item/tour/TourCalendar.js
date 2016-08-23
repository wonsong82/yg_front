require('./TourCalendar.scss')
import React from 'react'


const TourCalendar = ({ calendar, calendarMonth, themeColor, textColor }) => (
    <div className="TourCalendar">

      <h3 className="title">{calendarMonth}</h3>

      <ul className="day-names">
        <li>s</li>
        <li>m</li>
        <li>t</li>
        <li>w</li>
        <li>t</li>
        <li>f</li>
        <li>s</li>
      </ul>

      <ul className="days">

        {calendar && calendar.map( (d,i) => (
        <li key={`days-${i}`} className="day" style={d.available? {backgroundColor:themeColor}:{backgroundColor:'#e5e5e5'}}>

          <div className="c">
            <span className="text" style={d.available? {color:textColor}:{color:'#000000'}}>{d.day}</span>
            <span className="num" style={d.available? {color:textColor}:{color:'#000000'}}>{d.date.substr(3,2)}</span>

          </div>
        </li>

        ))}
      </ul>



    </div>
)


export default TourCalendar

