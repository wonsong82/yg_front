const initialState = {

  app: {
    textColor: '#000000',
    themeColor: '#f0f0f0',
    responsiveMode: 0,
    startApp: false,
    clickPosition: {x:undefined, y:undefined}
  },
  
  mainMenu: {
    disabled: false, // disabled in transition
    opened: false,
    artistList: []
  },

  cart: {
    loaded: false,
    isFetching: false,
    products: {
      product: [],
      music: []
    },
    opened: false,
    productsCount: 0,
    total: 0
  },

  page: {},

  popup: {},

  signup: {
    isLoading: false
  },


  data: {
    loaded: false,

    artists: {
      loaded: false,
      isFetching: false,
      contents: {
        artists: {}
      }
    },

    blogs: {
      loaded: false,
      isFetching: false,
      contents: {  
        posts: {},
        postsCount: 0,
        hotPosts: {},
        hotPostsCount: 0,
        mostViewedPosts: {},
        mostViewedPostsCount: 0,
        postsOrder: {}
      }
    },

    tours: {
      loaded: false,
      isFetching: false,
      contents: {
        tours: {},
        toursCount: 0,
        toursOrder: {}
      }
    },

    events: {
      loaded: false,
      isFetching: false,
      contents: {
        events: {},
        eventsCount: 0,
        eventsOrder: {}
      }
    },

    musics: {
      loaded: false,
      isFetching: false,
      contents: {
        albums: {},
        albumsCount: 0,
        albumsOrder: {},
        musics: {},
        musicsCount: 0,
        musicsOrder: {},
        hotTracks: {},
        hotTracksCount: 0,
      }
    },

    shops: {
      loaded: false,
      isFetching: false,
      contents: {
        products: {},
        productsCount: 0,
        productsOrder: {},
        categories: {},
        categoriesCount: 0
      }
    },

    promotions: {
      loaded: false,
      isFetching: false,
      contents: {
        product: {},
        album: {},
        tour: {},
        event: {}
      }
    },

    socialFeeds: {
      loaded: false,
      isFetching: false,
      contents: {
        feeds: {}
      }
    }
  },
}


// 페이지에 들어갈
export const blogInitState = {
  type: 'blog',
  posts: [
    /*{ id, title, url, text, date, image, thumb_2x1, facebookShareLink, twitterShareLink } */
  ],
  hotPosts: [
    /*{ id, title, url, text, date }*/
  ],
  postsAllLoaded: false,
  hotPostsAllLoaded: false
}

export const eventInitState = {
  type: 'event',
  events: [
    /* [{ id, title, subtitle, url, text, date, image, themeColor}] */
  ],
  eventsAllLoaded: false
}

export const tourInitState = {
  type: 'tour',
  tours: [],
  toursAllLoaded: false
}

export const musicInitState = {
  type: 'music',
  albums: [
    /* [ {} ] */
  ],
  hotTracks: [],
  albumsAllLoaded: false,
  hotTracksAllLoaded: false
}

export const shopInitState = {
  type: 'shop',
  categories: [],
  products: [
    /* [{ id, title, url, artistName, thumb1x1, thumb2x1, thumb1x2 }] */
  ],
  productsAllLoaded: false,
  selectedCategory: null
}

export const promotionInitState = {
  type: 'promotion',
  tours: [],
  albums: [],
  products: [],
  events: []
}

export const artistPageInitState = {
  type: 'artist',
  activeIndex: 0,
  artists: {}
}
export const artistInitState = {
  tours: [],
  toursAllLoaded: false,
  products: [],
  productsAllLoaded: false,
  albums: [],
  albumsAllLoaded: false,
  hotTracks: [],
  hotTracksAllLoaded: false,
  events: [],
  eventsAllLoaded: false,
  sns: []
}



// 팝업
export const blogPopupInitState = {
  type: 'blog',
  title: '',
  date: '',
  facebookShareLink: '',
  twitterShareLink: '',
  image: false,
  content: '',
  related: []
}

export const eventPopupInitState = {
  type: 'event',
  title: '',
  date: '',
  facebookShareLink: '',
  twitterShareLink: '',
  image: false,
  content:'',
  related: []
}

export const tourPopupInitState = {
  type: 'tour',
  startDate: '',
  endDate: '',
  name: '',
  themeColor: '',
  title: '',
  subtitle: '',
  content: '',
  image: false,
  facebookShareLink: '',
  twitterShareLink: '',
  tourSchedule: [],
  tourCalendar: []
}

export const musicPopupInitState = {
  type: 'music',
  image: false,
  title: '',
  albumPrice: '',
  salePrice: '',
  albumProductId: '',
  name: '',
  content: '',
  facebookShareLink: '',
  twitterShareLink: '',
  music: [],
  related: []
}

export const shopPopupInitState = {
  type: 'shop',
  id: '',
  title: '',
  originalPrice: '',
  price: '',
  images: [],
  curVariationId: '',
  artistName: '',
  content: '',
  facebookShareLink: '',
  twitterShareLink: '',
  productType: '',
  options: [
    /*{name:''  ,  values:[ {value, enabled} ] }*/
  ],
  selectedOptions: {
    /* key : value */
  },
  cartLink: '',
  related: []
}


export default initialState