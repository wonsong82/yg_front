export const toArray = obj => Object.keys(obj).map(key => obj[key])
export const excerptStr = ( string, length=120 ) => string.length > length ? string.substr(0, length) + '...' : string


/***
 * 맞는 띰칼라 찾기
 */
export const computeThemeColor = ( props ) => {

  const artists = toArray(props.data.artists.contents.artists)
  const { item, name } = props.params
  const defaultTheme = { themeColor: '#f0f0f0', textColor: '#000000' }

  if(!artists.length)
    return defaultTheme

  if( !item ){ // 페이지
    if ( name ){ // 아티스트 페이지
      let found = artists.filter( artist => {
        return name === artist.urlFriendlyName
      })
      if(found.length){ // 아티스트 찾을경우
        return {
          themeColor: found[0].themeColor,
          textColor: found[0].textColor
        }
      }
      else { // 아티스트 없을경우
        return defaultTheme
      }
    }
    else { // 다른 페이지
      return defaultTheme
    }
  }

  else { // 팝업
    if(!props.routes[1]) // 잘못된 라우트
      return defaultTheme

    let type = props.routes[1].path.match(/(blog|shop|music|tour|event)\/:item$/i)[1]
    let data,
        artists = props.data.artists.contents.artists,
        themeColors

    switch(type){
      case 'blog':
        return defaultTheme

      case 'event':
        data = props.data.events.contents.events
        if(!data) return defaultTheme
        themeColors = getThemeColors(item, data, artists)
        return themeColors ? themeColors : defaultTheme

      case 'shop':
        data = props.data.shops.contents.products
        if(!data) return defaultTheme
        themeColors = getThemeColors(item, data, artists)
        return themeColors ? themeColors : defaultTheme

      case 'tour':
        data = props.data.tours.contents.tours
        if(!data) return defaultTheme
        themeColors = getThemeColors(item, data, artists)
        return themeColors ? themeColors : defaultTheme

      case 'music':
        data = props.data.musics.contents.albums
        if(!data) return defaultTheme
        themeColors = getThemeColors(item, data, artists)
        return themeColors ? themeColors : defaultTheme

      default:
        return defaultTheme
    }
  }
}

export const getThemeColors = ( item, data, artists ) => {
  let found = toArray(data).filter( e => item === e.url_friendly_name )
  if(!found.length) return false
  const { themeColor, textColor } = artists[found[0].artist_id]
  return { themeColor, textColor }
}








export const getData = ( apiURL, state, onStart, onComplete, dispatch, fetch ) => {

  let shouldFetch = !( state.loaded || (!state.loaded && state.isFetching) )
  if(shouldFetch){
    dispatch(onStart())
    return fetch(apiURL, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => dispatch(onComplete(json)))
  }
  else {
    return Promise.resolve()
  }
}



export const getFacebookShareLink = ( url ) => {
  return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
}

export const getTwitterShareLink = ( url ) => {
  return 'https://twitter.com/home?status=' + encodeURIComponent(url)
}


export const loadImages = ( images, callback ) => {
  images instanceof Array || (images = [images])
  const count = images.length
  var loaded = 0
  for( let i=0; i<count; i++ ){
    var img = document.createElement('img')
    img.onload = () => {
      loaded++
      loaded >= count && typeof callback === 'function' && callback()
    }
    img.src = images[i]
  }
}


export const LAYOUT_STYLE = {
  RANDOM: 'layout_style_random'
}
export const getLayoutStyle = ( style, numOfLayouts ) => {
  return style == LAYOUT_STYLE.RANDOM ?
    Math.floor(Math.random() * numOfLayouts) + 1 : style
}


/***
 * Shop 관련
 */
export const getDefaultOptions = ( {product_type:type, variation:variations} ) => {
  if(type!='variable') return false

  const found = variations.filter( ({ id_default }) => id_default )

  if(found.length){
    let defaultOptions = {}
    found[0].attribute.forEach( ({ key, value }) => {
      defaultOptions[key] = value
    })
    return defaultOptions
  }
  else
    return {}
}

export const getProductOptions = ( {product_type:type, attributes, variation:variations }, selectedOptions ) => {
  if(type!='variable') return false


  let options = []

  // 모든 아트리븃 순차적으로
  for(let name in attributes){
    if(attributes.hasOwnProperty(name)){

      // 각각의 select 들 시작
      let select = { name, values:[ {value:'select', enabled:true} ]}
      let values = attributes[name]
      values.forEach( value => {
        select.values.push({value, enabled:true})
      })

      options.push(select)
      // END Select
    }
  }


  let availableOptions = {}
  const selectedCount = toArray(selectedOptions).length

  // 1. 먼저 모든 필드가 선택되었을시, 선택할수 있는 바리에이션에서 1개뺴고 변경 가능한 것을 찾는다
  if(selectedCount == toArray(attributes).length) {

    variations.forEach(variation => {
      // 바리에이션을 돌면서 현재 선택된 옵션에서 몇개나 매치 되는지 찾는다
      let matches = variation.attribute.filter(attr => {
        return typeof selectedOptions[attr.key] && selectedOptions[attr.key] == attr.value
      })
      let matchCount = matches.length
      //console.log(matches)

      // 1개빼고 다 매치 되어있는경우, 현재에서 변경 가능한 옵션들이다.
      if (matchCount >= toArray(attributes).length - 1) {

        variation.attribute.forEach(attr => {
          if (availableOptions[attr.key]) {
            if (availableOptions[attr.key].indexOf(attr.value) == -1) {
              availableOptions[attr.key].push(attr.value)
            }
          }
          else {
            availableOptions[attr.key] = [attr.value]
          }
        })
      }
    })
  }
  
  // 2. 아닐 경우, 이미 선택된것들을 기준으로 찾는다
  else {

    let filteredVariations = [...variations]
    if(selectedCount!=0){

      filteredVariations = variations.filter( variation => {
        for (let key in selectedOptions) {
          if (selectedOptions.hasOwnProperty(key)) {
            let value = selectedOptions[key]
            let attrCount = variation.attribute.filter(attr => attr.key == key && attr.value == value).length
            if(!attrCount) return false
          }
        }

        return true
      })
    }

    filteredVariations.forEach(variation => {
      variation.attribute.forEach(attr => {
        if (availableOptions[attr.key]) {
          if (availableOptions[attr.key].indexOf(attr.value) == -1) {
            availableOptions[attr.key].push(attr.value)
          }
        }
        else {
          availableOptions[attr.key] = [attr.value]
        }
      })
    })
  }

  return options.map( select => {

   let availableValues = availableOptions[select.name] || []
   let values = select.values.map( value => {
     return {
       ...value,
       enabled: availableValues.filter( availableValue => availableValue == value.value || value.value == 'select' ).length ? true : false
      }
    })
    return { ...select, values }
  })
}


export const findProductVariation = ( variations, selectedOptions ) => {

  const foundVariation = variations.filter( ({ attribute }) => {

    let found = true
    attribute.forEach( attr => {
      if(selectedOptions[attr.key] != attr.value)
        found = false
    })

    return found
  })

  return foundVariation.length ? foundVariation[0] : false
}



export const getProductImages = ( product, variation=false ) => {
  switch( product.product_type ){
    case 'simple':
      return [ ...product.images ]

    case 'variable':
      return variation && variation.image ?
        [ variation.image, ...product.images ] :
        [ ...product.images ]

    default:
      return [ ...product.images ]
  }

}


export const getProductPrice = ( product, variation=false ) => {
  switch( product.product_type ) {
    case 'simple':
      return {
        price: product._sale_price ? product._sale_price : product._regular_price,
        originalPrice: product._sale_price ? product._regular_price : null
      }

    case 'variable':
      if(variation){
        return {
          price: variation.display_price || null,
          originalPrice: variation.display_regular_price || null
        }
      }
      else {
        return { price: null, originalPrice: null }
      }

    default :
      return { price:null, originalPrice: null }
  }
}



export const showStagger = items => {
  items.each((i, e) => {
    $(e)
      .velocity('stop', true)
      .velocity({
        opacity: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        translateX: 80,
        translateY: 100
      })
      .velocity('finish')
      .velocity('reverse', {
        duration: 370,
        delay: i * 100,
        queue: false,
        easing: 'easeInOutQuad'
      })
  })
}















