export default {
  getMomentum (array, maxWidth) {
    let sumMomentum = 0
    array.forEach((element) => {
      if (element.isLeftItem)
        sumMomentum +=
          (element.weight * (Math.floor(maxWidth / 2) - element.left)) / 100
      else
        sumMomentum +=
          (element.weight * (element.left - Math.floor(maxWidth / 2))) / 100
    })
    return sumMomentum
  },
  
  newShape (bottom, isLeftItem, maxWidth) {
    const arrClass = new Array('circle', 'triangle', 'rectangle')
    const type = Math.floor(Math.random() * 3)
    const weight = Math.floor(Math.random() * 10) + 1
    const width = weight * 10
    let startPoint = isLeftItem ? 0 : Math.floor(maxWidth / 2)
    let endPoint = isLeftItem ? Math.floor(maxWidth / 2) : maxWidth
    let left = Math.floor(
      Math.floor(Math.random() * (endPoint - startPoint)) + startPoint
    )
    let height = width
    if (isLeftItem && left + width > Math.floor(maxWidth / 2)) {
      left = Math.floor(maxWidth / 2 - width)
    }
    if (!isLeftItem && left + width > maxWidth) {
      left = Math.floor(maxWidth - width)
    }
  
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
    return {
      id: uuidv4(),
      class: arrClass[type],
      type,
      width,
      weight,
      bottom: bottom,
      left,
      height,
      isLeftItem,
      isNewItem: isLeftItem,
    }
  }
}