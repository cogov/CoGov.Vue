import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    poop: "POOOOP"
  },
  getters: {
    getPoop: state => state.poop
  },
  mutations: {

  },
  actions: {

  }
})
