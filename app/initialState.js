const initialState = {

  theme: {
    textColor: '#000000',
    themeColor: '#f0f0f0'
  },

  mainMenu: {
    disabled: false, // disabled in transition
    opened: false
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

  blog: {
    loaded: false,    
    isFetching: false,
    list: [


    ]
  },

  event: {
    loaded: false,
    isFetching: false,
    list: [
    ]
  },


  signup: {
    isLoading: false
  }




}

export default initialState