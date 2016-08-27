require('./Tour.scss')
import React, { Component, PropTypes } from 'react'
import ViewMore from '../../../components/lib/link/ViewMore'
import TourThumb from '../../../components/app/item/tour/TourThumb'
import TourSchedule from '../../../components/app/item/tour/TourSchedule'
import ScrollArea from 'react-scrollbar/dist/no-css'



class Tour extends Component {

  constructor(props) {
    super(props)
  }

  preventOtherScrolls(e){
    e.preventDefault()
  }
  componentDidMount() {
    $('.schedules', this.refs.list).off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
    $('.schedules', this.refs.list).on('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }
  componentWillUnmount() {
    $('.schedules', this.refs.list).off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }
  componentDidUpdate() {
    $('.schedules', this.refs.list).off('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
    $('.schedules', this.refs.list).on('DOMMouseScroll mousewheel', this.preventOtherScrolls.bind(this))
  }


  render() {
    const {tours, toursAllLoaded, onViewMoreClick} = this.props

    return (
      <div className="TourLayout">
        <h3>Tour</h3>
        <ul className="tours-list" ref="list">

          {tours && tours.length ? tours.map( tour => (
            <li key={tour.id}>
              <div className="thumb-con">
                <TourThumb {...tour} />
              </div>

              <ScrollArea className="schedules" speed={0.8} horizontal={false} smoothScrolling={true} contentClassName="content" >


                {
                  tour.schedule && tour.schedule.length ?
                  tour.schedule.map( (schedule, i) => (
                  <div className="schedule-con">
                    <TourSchedule key={`${tour.id}-${i}`} {...schedule} textColor={tour.textColor} themeColor={tour.themeColor} />
                  </div>
                )):null}

              </ScrollArea>

            </li>
          )):null}
        </ul>

        {
          !toursAllLoaded &&
          <ViewMore className="view-more" onClick={onViewMoreClick} />
        }
      </div>
    )
  }

}




Tour.defaultProps = {
  pageType: 'Tour'
}


export default Tour

