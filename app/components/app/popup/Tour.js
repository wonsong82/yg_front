require('./Tour.scss')
import React, { Component, PropTypes } from 'react'
import AnchorLink from '../../../components/lib/link/AnchorLink'
import Image from '../../../components/lib/image/Image'
import moment from 'moment'
//import ScrollArea from 'react-scrollbar/dist/no-css'
import ScrollArea from '../../../components/lib/scroll/ScrollArea'
import TourSchedule from '../../../components/app/item/tour/TourSchedule'
import TourCalendar from '../../../components/app/item/tour/TourCalendar'


class Tour extends Component {

  constructor(props) {
    super(props)
  }

  preventOtherScrolls(e){
    var _$this = $()

    console.log(_$this)



      /*scrollTop = this.scrollTop,
      scrollHeight = this.scrollHeight,
      height = _$this.height(),
      delta = (ev.type == 'DOMMouseScroll' ?
      ev.originalEvent.detail * -40 :
        ev.originalEvent.wheelDelta),
      up = delta > 0;

    var prevent = function() {
      ev.stopPropagation();
      ev.preventDefault();
      ev.returnValue = false;
      return false;
    };

    if (!up && -delta > scrollHeight - height - scrollTop) {
      // Scrolling down, but this will take us past the bottom.
      _$this.scrollTop(scrollHeight);
      return prevent();
    } else if (up && delta > scrollTop) {
      // Scrolling up, but this will take us past the top.
      _$this.scrollTop(0);
      return prevent();
    }*/
  }

  onScroll(e){
    //this.disableOtherScrolls(e, this.refs.)

  }

  disableOtherScrolls(scrollEvent, target){

  }


 /* componentDidMount() {
    $('.schedules', this.refs.tour).off('DOMMouseScroll mousewheel', this.onScroll.bind(this))
    $('.schedules', this.refs.tour).on('DOMMouseScroll mousewheel', this.onScroll.bind(this))
  }
  componentWillUnmount() {
    $('.schedules', this.refs.tour).off('DOMMouseScroll mousewheel', this.onScroll.bind(this))
  }
  componentDidUpdate() {
    $('.schedules', this.refs.tour).off('DOMMouseScroll mousewheel', this.onScroll.bind(this))
    $('.schedules', this.refs.tour).on('DOMMouseScroll mousewheel', this.onScroll.bind(this))
  }*/


  render() {
    const {startDate, endDate, artistName, themeColor, textColor, title, subtitle,
      content, image, facebookShareLink, twitterShareLink, schedule:schedules, calendar, calendarMonth} = this.props

    return (
      <div className="TourLayout">

        <div className="Tour" ref="tour">

          <div className="main">
            <TourCalendar calendar={calendar} themeColor={themeColor} textColor={textColor} calendarMonth={calendarMonth} />

            { image &&
            <div className="images">
              <Image className="main-image" src={image}/>
              <span className="film"/>
              <h6 className="artist" style={{color:themeColor}}>{artistName}</h6>
              <h6 className="title" style={{color:textColor}}>{title}</h6>
              <span className="subtitle" style={{color:textColor}}>{subtitle}</span>
              <span className="date" style={{color:textColor}}>
              { moment(startDate).format('DDMMM(ddd)') }&nbsp;-&nbsp;
                        { moment(endDate).format('DDMMM(ddd)') }
            </span>
            </div>
            }

            <div className="header">
              <h1 className="title">{title}</h1>
              <span className="subtitle">{subtitle}</span>
              <span className="date">
              { moment(startDate).format('DDMMM(ddd)') }&nbsp;-&nbsp;
                { moment(endDate).format('DDMMM(ddd)') }
            </span>
              <div className="socialLinks">
                <AnchorLink href={facebookShareLink} target="_blank">
                  <span className="icon-facebook" />
                </AnchorLink>
                <AnchorLink href={twitterShareLink} target="_blank">
                  <span className="icon-twitter" />
                </AnchorLink>
              </div>
            </div>

          </div>



          <ScrollArea className="schedules" speed={0.8} horizontal={false} smoothScrolling={true} contentClassName="content" >

            {schedules && schedules.map( (schedule, i) => (
              <div className="schedule-con">
                <TourSchedule key={`tour-detail-popup-${i}`} {...schedule} textColor={textColor} themeColor={themeColor} />
              </div>
            ))}

          </ScrollArea>



          <div className="content">
            <h2 className="title">Description</h2>
            <p>
              {content}
            </p>
          </div>



        </div>



      </div>
    )
  }

}




export default Tour

