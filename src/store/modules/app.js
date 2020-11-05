import calcUtils from '@/utils/calc'

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
    const addShape = calcUtils.newShape(0, false, state.maxWidth)
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
    let activeShape = calcUtils.newShape(80, true, state.maxWidth)
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
    return calcUtils.getMomentum(state.leftShapes, state.maxWidth)
  },
  rightSum(state) {
    return calcUtils.getMomentum(state.rightShapes, state.maxWidth)
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
