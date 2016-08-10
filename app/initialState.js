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

  page: {

  },

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
        mostViewedPostsCount: 0
      }
    },

    tours: {
      loaded: false,
      isFetching: false,
      list: [
      ],
    },

    albums: {
      loaded: false,
      isFetching: false,
      list: [
      ],
    },

    events: {
      loaded: false,
      isFetching: false,
      contents: {
        events: [],
        eventsCount: 0,
      }
    },

    musics: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    },

    products: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    },

    promotions: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    },

    hottracks: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    },

    hotblogs: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    },

    product_categories: {
      loaded: false,
      isFetching: false,
      list: [
      ]
    }
  },
}

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
  events: [],
  eventsAllLoaded: false
}



export default initialState