

/***
 * 맞는 띰칼라 찾기
 * @param page :layout 종류
 * @param popup :popup 종류
 * @param artists :artist 리스트 (각 artist 마다 theme color 있음)
 * @param params :아티스트 이름이나, 각종 아이템 이름
 */
export const computeThemeColor = ( page, popup, artistsList, params ) => {

  let themeColor, textColor
  if (typeof popup === 'undefined') { // 팝업이 없을경우
    switch (page.type.name) {
      case 'ArtistLayout': // 페이지가 아티스트일경우
        if (artistsList.length) {
          let filtered = artistsList.filter(artist => {
            return params.name === artist.urlFriendlyName
          })
          if (filtered.length) {
            themeColor = filtered[0].themeColor
            textColor = filtered[0].textColor
          }
          else {
            themeColor = '#f0f0f0'
            textColor = '#000000'
          }
        }
        else {
          themeColor = '#f0f0f0'
          textColor = '#000000'
        }
        break
      default: // 페이지가 아티스트가 아닐 경우
        themeColor = '#f0f0f0'
        textColor = '#000000'
    }
  }
  else { // 팝업일 경우
    // 팝업일때 팝업되는 아티스트에 따라서 색 변환
  }


  return {
    themeColor,
    textColor
  }
}