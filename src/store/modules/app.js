function getMomentum(array, maxWidth) {
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
}

function newShape(bottom, isLeftItem, maxWidth) {
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

const state = {
  bottom: 80,
  isPaused: true,
  leftShapes: [],
  rightShapes: [],
  activeShapes: [],
  pain: 0,
  maxWidth: 1000,
}

const mutations = {
  RESET_ALL(state) {
    state.bottom = 80
    state.isPaused = true
    state.leftShapes = []
    state.rightShapes = []
    state.activeShapes = []
    state.pain = 0
  },
  TOGGLE_PAUSE(state) {
    state.isPaused = !state.isPaused
  },
  ADD_SHAPE_TO_RIGHT(state) {
    const addShape = newShape(0, false, state.maxWidth)
    state.rightShapes.push(addShape)
  },
  ACTIVE_SHAPE_MOVE_TO_LEFT(state) {
    if (state.activeShapes.length > 0) {
      let addLeftShape = state.activeShapes.pop()
      addLeftShape.isNewItem = false
      state.leftShapes.push(addLeftShape)
    }
  },
  ADD_SHAPE_TO_ACTIVE(state) {
    state.activeShapes = []
    let activeShape = newShape(80, true, state.maxWidth)
    state.activeShapes.push(activeShape)
  }
}

const actions = {
  startNewGame({ commit }) {
    commit('RESET_ALL')
    commit('ADD_SHAPE_TO_RIGHT')
    commit('ADD_SHAPE_TO_ACTIVE')
  },
  ADD_SHAPE_TO_RIGHT({ commit }) {
    commit('ADD_SHAPE_TO_RIGHT')
  },
  ACTIVE_SHAPE_MOVE_TO_LEFT({ commit }) {
    commit('ACTIVE_SHAPE_MOVE_TO_LEFT')
  },
  ADD_SHAPE_TO_ACTIVE({ commit }) {
    commit('ADD_SHAPE_TO_ACTIVE')
  },
}

const getters = {
  getBottom(state) {
    return state.bottom
  },
  leftSum(state) {
    return getMomentum(state.leftShapes, state.maxWidth)
  },
  rightSum(state) {
    return getMomentum(state.rightShapes, state.maxWidth)
  },
  pain(state, getters) {
    const { leftSum, rightSum } = getters
    state.pain = ((leftSum - rightSum) * -180) / 100
    if (Math.abs(state.pain) > 30)
      state.pain = 30 * (Math.abs(state.pain) / state.pain)
    return state.pain
  },
  gameOverStatus(state) {
    return (
      state.leftShapes.length == state.rightShapes.length &&
      Math.abs(state.pain) == 30
    )
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
