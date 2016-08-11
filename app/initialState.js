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
      contents: {
        tours: [],
        toursCount: 0,
      }
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
        shops: {},
        shopsCount: 0,
        categories: {},
        categoriesCount: 0
      }
    },

    promotions: {
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

export const tourInitState = {
  type: 'tour',
  tours: [],
  toursAllLoaded: false
}

export const musicInitState = {
  type: 'music',
  albums: [],
  hotTracks: [],
  albumsAllLoaded: false,
  hotTracksAllLoaded: false
}



export default initialState