export const state = () => ({
  open: false
})

export const mutations = {
  SET_SIDEBAR (state) {
    state.open = !state.open
  },
  CLOSE_SIDEBAR (state) {
    state.open = false
  }
}

export const actions = {
  setSidebar ({ commit }) {
    commit('SET_SIDEBAR')
  },
  closeSidebar ({ commit }) {
    commit('CLOSE_SIDEBAR')
  }
}
