const initialState = {

  theme: {
    textColor: '#000000',
    themeColor: '#f0f0f0',
    responsiveMode: 0,
  },

  artists: {
    loaded: false,
    isFetching: false,
    list: [
      /**
       * {
       *    id,
       *    name,
       *    urlFriendlyName,
       *    bg,
       *    textColor,
       *    themeColor
       * }
       */
    ],
    prev: 0,
    current: 0,
    next: 0
  },
  
  mainMenu: {
    disabled: false, // disabled in transition
    opened: false
  },

  page: {

  },

  signup: {
    isLoading: false
  },


  data: {
    loaded: false,

    blogs: {
      loaded: false,
      isFetching: false,
      contents: {
        posts: [],
        postsCount: 0,
        hotPosts: [],
        hotPostsCount: 0,
        mostViewedPosts: [],
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
      list: [
      ]
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

export default initialState