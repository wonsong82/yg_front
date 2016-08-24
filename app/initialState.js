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

  page: {},

  popup: {},

  signup: {
    isLoading: false
  },


  cart: {
    loaded: false,
    isFetching: false,
    products: {
      product: [],
      music: []
    },
    productsCount: 0
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
        mostViewedPostsCount: 0
      }
    },

    tours: {
      loaded: false,
      isFetching: false,
      contents: {
        tours: {},
        toursCount: 0,
      }
    },

    events: {
      loaded: false,
      isFetching: false,
      contents: {
        events: {},
        eventsCount: 0,
      }
    },

    musics: {
      loaded: false,
      isFetching: false,
      contents: {
        albums: {},
        albumsCount: 0,
        musics: {},
        musicsCount: 0,
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
        categories: {},
        categoriesCount: 0
      }
    },

    promotions: {
      loaded: false,
      isFetching: false,
      list: {}
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