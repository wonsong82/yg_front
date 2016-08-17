require('./Tour.scss')
import React from 'react'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import Image from '../../../components/lib/image/Image'

const Tour = ({startDate, endDate, name, themeColor, title, subtitle,
  content, image, facebookShareLink, twitterShareLink, tourSchedule}) => (


    <div className="TourLayout">

      <div className="Tour">

        { image &&
        <div className="images">
          <Image className="main-image" src={image}/>
        </div>
        }

        <div className="header">
          <h1 className="title">{title && title}</h1>
          <span className="subtitle">{subtitle && subtitle}</span>
          <span className="date">{startDate} - {endDate}</span>
          <div className="socialLinks">
            <AnchorLink href={facebookShareLink} target="_blank">
              <span className="icon-facebook" />
            </AnchorLink>
            <AnchorLink href={twitterShareLink} target="_blank">
              <span className="icon-twitter" />
            </AnchorLink>
          </div>
        </div>


        <div>
          <ul className="schedule-list">
            {
              tourSchedule &&
              tourSchedule.map( schedule => (
               <li>

                 { schedule.event_time }
                 

               </li>
              ))


            }
          </ul>

        </div>


        <div className="content">
          <h2 className="title">Description</h2>
          <span className="spacer" />
          <p>
            {content}
          </p>
        </div>



      </div>



    </div>
)


export default Tour

