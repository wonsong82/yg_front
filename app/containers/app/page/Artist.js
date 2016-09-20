require('./Artist.scss')
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArtistComponent from '../../../components/app/page/Artist'



class Artist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      key: 0
    }
  }

  render() {
    return <ArtistSwiper key={this.state.key} {...this.props} />
  }
}

// This interates and generate all artistcompoents and wrap them into the swiper
class ArtistSwiper extends Component {

  constructor(props) {
    super(props)
    this.swiper =false
    this._timer = false
    this._interval = false
    this._prevIndex = false
  }

  componentDidMount() {
    const artistName = this.props.params.name
    const { initPage, artists, loadTours, loadProducts, loadAlbums, loadHotTracks, loadEvents, loadSNS } = this.props

    initPage(artistName)
    artists.forEach( (artist,i) => {
      loadTours(i)
      loadAlbums(i)
      loadProducts(i, 1)
      loadHotTracks(i)
      loadEvents(i, 1)
      loadSNS(i)
    })
  }

  componentWillReceiveProps(nextProps) {

  }


  componentDidUpdate(prevProps) {
    const { slides, redirect, activeIndex } = this.props
    let _this = this

    if(!this.swiper && !prevProps.slides && slides){

      this.swiper = new Swiper($(this.refs.pages), {
        nextButton: $(this.refs.nextBtn),
        prevButton: $(this.refs.prevBtn),
        spaceBetween: 0,
        slidesPerView: 'auto',
        nested: true,
        initialSlide: activeIndex,
        autoHeight: true,
        preventClicks:false,
        preventClicksPropagation: false,
        onSlideChangeEnd: (e) => {
          if(_this.prevIndex === false){
            if(e.activeIndex != activeIndex){
              redirect(`/artist/${slides[e.activeIndex].urlFriendlyName}`)
              _this.prevIndex = e.activeIndex
            }
          }
          else {
            if(e.activeIndex != _this.prevIndex){
              redirect(`/artist/${slides[e.activeIndex].urlFriendlyName}`)
              _this.prevIndex = e.activeIndex
            }
          }
        }
      })
    }

    else if(this.swiper && prevProps.location.pathname != this.props.location.pathname){
      let index = slides.filter( e => e.urlFriendlyName == this.props.params.name )
      if(index.length){
        this.swiper.slideTo(index[0].index)
      }
    }
  }


  componentWillUnmount() {
    //this.swiper.destroy()
  }


  onToursViewMoreClick(index){
    this.props.onToursViewMoreClick(index)
    this.fixContentHeight()
  }
  onProductsViewMoreClick(index){
    this.props.onProductsViewMoreClick(index)
    this.fixContentHeight()
  }
  onAlbumsViewMoreClick(index){
    this.props.onAlbumsViewMoreClick(index)
    this.fixContentHeight()
  }
  onHotTracksViewMoreClick(index){
    this.props.onHotTracksViewMoreClick(index)
    this.fixContentHeight()
  }
  onEventsViewMoreClick(index){
    this.props.onEventsViewMoreClick(index)
    this.fixContentHeight()
  }
  onSNSViewMoreClick(index){
    this.props.onSNSViewMoreClick(index)
    this.fixContentHeight()
  }
  onAddToCartClick(productId){
    const {addToCart} = this.props
    addToCart(productId, 0, 1);
  }

  fixContentHeight(){
    let _this = this
    clearInterval(_this._interval)
    clearTimeout(_this._timer)
    let interval = setInterval(()=> _this.swiper.update(), 200)
    setTimeout(()=> clearInterval(interval) ,1000)
  }


  render() {
    const { slides, themeColor } = this.props

    return (
      <div className="ArtistLayoutSwiper">

        <div className="swiper-container" ref="pages">
          <div className="swiper-wrapper">


            {slides && slides.length ? slides.map( artist => (

            <div className="swiper-slide" key={`artist-slide-${artist.id}`} >

              <ArtistComponent
                { ...artist }
                onToursViewMoreClick={this.onToursViewMoreClick.bind(this, artist.index)}
                onProductsViewMoreClick={this.onProductsViewMoreClick.bind(this, artist.index)}
                onAlbumsViewMoreClick={this.onAlbumsViewMoreClick.bind(this, artist.index)}
                onHotTracksViewMoreClick={this.onHotTracksViewMoreClick.bind(this, artist.index)}
                onEventsViewMoreClick={this.onEventsViewMoreClick.bind(this, artist.index)}
                onSNSViewMoreClick={this.onSNSViewMoreClick.bind(this, artist.index)}
                onAddToCartClick={this.onAddToCartClick.bind(this)}
              />

            </div>

            )):null}

          </div>
        </div>

        <div className="btn-next" ref="nextBtn" style={{color:themeColor}} >
          〉
        </div>

        <div className="btn-prev" ref="prevBtn" style={{color:themeColor}} >
          〈
        </div>

      </div>
    )
  }
}


import { redirect, initArtistPage, loadAlbumsByArtist, loadToursByArtist, loadProductsByArtist, loadHotTracksByArtist, loadEventsByArtist, loadSNSByArtist, addProductsToCart } from '../../../actions/'


const mapStateToProps = (state) => {
  return {
    themeColor: state.app.themeColor,
    artists: state.mainMenu.artistList,
    slides: state.page.artists,
    activeIndex: state.page.activeIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPage: artistName => { dispatch(initArtistPage(artistName)) },
    loadTours: index => { dispatch(loadToursByArtist(index)) },
    onToursViewMoreClick: index => {dispatch(loadToursByArtist(index))},
    loadProducts: ( index, layoutStyle ) => { dispatch(loadProductsByArtist(index, layoutStyle)) },
    onProductsViewMoreClick: index => { dispatch(loadProductsByArtist(index)) },
    loadAlbums: index => { dispatch(loadAlbumsByArtist(index)) },
    onAlbumsViewMoreClick: index => { dispatch(loadAlbumsByArtist(index)) },
    loadHotTracks: index => { dispatch(loadHotTracksByArtist(index)) },
    onHotTracksViewMoreClick: index => { dispatch(loadHotTracksByArtist(index)) },
    loadEvents: ( index, layoutStyle ) => { dispatch(loadEventsByArtist(index, layoutStyle)) },
    onEventsViewMoreClick: index => { dispatch(loadEventsByArtist(index)) },
    loadSNS: index => { dispatch(loadSNSByArtist(index)) },
    onSNSViewMoreClick: index => { dispatch(loadSNSByArtist(index)) },
    redirect: to => { dispatch(redirect(to)) },
    addToCart: (productId, variationId, qty) => {dispatch(addProductsToCart(productId, variationId, qty))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Artist)