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

  blogs: {
    loaded: false,
    isFetching: false,
    data: {
      posts: [],
      postsCount: 0,
      hotPosts: [],
      hotPostsCount: 0,
      mostViewedPosts: [],
      mostViewedPostsCount: 0
    },
    postsLoaded: 0,
    hotPostsLoaded: 0,
    mostViewedPostsLoaded: 0
  },



  
  mainMenu: {
    disabled: false, // disabled in transition
    opened: false
  },



  events: {
    loaded: false,
    isFetching: false,
    list: [
    ]
  },

  page: {
    loaded: false

  },


  signup: {
    isLoading: false
  }




}

export default initialState