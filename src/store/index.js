import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentArticle: ''
  },
  mutations: {
    setArticle(state, index) {
      state.currentArticle = 'articlePost' + index
    }
  },
  actions: {
  },
  modules: {
  }
})
