import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import core from './modules/core'
import generic from './modules/generic'
import router from '@/router'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    core,
    generic
  },
  state: {
    currentCollectiveID: null,
    currentCouncilID: null,
    currentProposalID: null,
    currentActionGroup: []
  },
  getters: {
    currentCollective: state => {
      return state.core.collectives.find(c => c.id === state.currentCollectiveID)
    },
    currentCouncil: state => {
      return state.core.councils.find(c => c.id === state.currentCouncilID)
    },
    currentProposal: state => {
      return state.core.proposals.find(p => p.id === state.currentProposalID)
    },
    collectiveCouncils: state => {
      return state.core.councils.filter(function(c) {
        return c.collectiveID === state.currentCollectiveID && !c.collectiveCouncil
      })
    },
    collectiveMembers: state => {
      return state.core.members.filter(function(m) {
        return m.collectiveID === state.currentCollectiveID
      })
    },
    councilProposals: state => {
      return state.core.proposals.filter(p => p.councilID === state.currentCouncilID)
    },
    collectiveProposals: state => {
      return state.core.proposals.filter(p => p.collectiveID === state.currentCollectiveID)
    },
    councilById: (state) => (id) => {
      return state.core.councils.find(c => c.id === id)
    },
    findCollectiveCouncil: (state) => (id) => {
      return state.core.councils.find(c => c.collectiveID === id && c.collectiveCouncil)
    }
  },
  actions: {
    switchToCollective({ state, getters, commit}, collectiveID) {
      commit('setCollective', collectiveID)
      let collectiveCouncil = getters.findCollectiveCouncil(collectiveID)
      commit('setCouncil', collectiveCouncil.id)
      router.push({ name: 'collective' })
    }
  },
  mutations: {
    submitMember(state, payload) {
      this.commit('core/createMember', {
        name: payload.name,
        collectiveID: state.currentCollectiveID,
      })
      /*
      for (pset in payload.psets) {
        this.commit('core/assignPrivilegeSet', {
          privilegeSetId: pset.id,
          memberID: payload.id
        }
      }*/
    },
    submitPrivilegeSet(state, payload) {
      this.commit('core/createPrivilegeSet', {
        collectiveID: state.currentCollectiveID,
        name: payload.name,
        privileges: payload.privileges
      })
    },
    unsetCollective (state) {
      state.currentCollectiveID = null
      state.currentCouncilID = null
      state.currentProposalID = null
    },
    setCollective(state, id) {
      state.currentCollectiveID = id
    },
    setCouncil(state, id) {
      state.currentCouncilID = id
    },
    unsetProposal (state) {
      state.currentProposalID = null
    },
    setProposal (state, id) {
      state.currentProposalID = id
    },
    addGroupAction (state) {
      state.currentActionGroup.push({ paramsInput: {}, selectedType: null })
    },
    clearActions (state) {
      state.currentActionGroup = []
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
