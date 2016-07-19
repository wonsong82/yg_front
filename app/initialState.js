const initialState = {

  theme: {
    textColor: '#000000',
    themeColor: '#f0f0f0'
  },

  artists: {
    loaded: false,
    isFetching: false,
    list: [
      /**
       * {
       *    id,
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

  blog: {
    loaded: false,
    isFetching: false,
    list: [
      

    ]
  }






}

export default initialState