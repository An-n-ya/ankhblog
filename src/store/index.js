import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentArticle: '',
    pagi: {
      page: 1,
      numPerPage: 5,
      length: 6,
    }
  },
  mutations: {
    setArticle(state, index) {
      state.currentArticle = 'articlePost' + index
    },
    setPagiPage(state, page) {
      state.pagi.page = page
    },
    setPagiLength(state, length) {
      state.pagi.length = Math.ceil(length / state.pagi.numPerPage)
    }
  },
  actions: {
  },
  modules: {
  }
})
