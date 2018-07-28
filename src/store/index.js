import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import system from './modules/system'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    system
  },
  state: {
    currentCollectiveID: null,
    currentCouncilID: null,
    currentProposalID: null,
    currentActionGroup: []
  },
  getters: {
    currentCollective: state => {
      return state.system.collectives.find(c => c.id === state.currentCollectiveID)
    },
    currentCouncil: state => {
      return state.system.councils.find(c => c.id === state.currentCouncilID)
    },
    currentProposal: state => {
      return state.system.proposals.find(p => p.id === state.currentProposalID)
    },
    collectiveCouncils: state => {
      return state.system.councils.filter(c => c.collectiveID === state.currentCollectiveID)
    },
    councilProposals: state => {
      return state.system.proposals.filter(p => p.councilID === state.currentCouncilID)
    }
  },
  mutations: {
    submitCollective (state, payload) {
      if (!payload.collectiveID) {
        this.commit('system/createCollective', {
          name: payload.collectiveName,
          description: payload.collectiveDescription,
          details: payload.collectiveDetails
        })
      } else {
        this.commit('system/updateCollective', {
          collectiveID: payload.collectiveID,
          name: payload.collectiveName,
          details: payload.collectiveDetails,
          description: payload.collectiveDescription
        })
      }
      this.commit('unsetCollective')
      this.commit('setCollective', payload.collectiveID || state.system.lastCollectiveID)
    },
    submitCouncil(state, payload) {
      console.log(payload)
      console.log(state.system.lastCouncilID)
      if (!payload.councilID) {
        this.commit('system/createCouncil', {
          name: payload.councilName,
          collectiveID: payload.collectiveID
        })
      } else {
        this.commit('system/updateCouncil', {
          councilID: payload.councilID,
          name: payload.councilName
        })
      }
      this.commit('unsetCouncil')
      this.commit('setCouncil', payload.councilID || state.system.lastCouncilID)
    },
    submitProposal(state, payload) {
      if (!payload.proposalID) {
        console.log(payload)
        this.commit('system/createProposal', {
          name: payload.proposalName,
          councilID: payload.councilID,
          collectiveID: payload.collectiveID
        })
      } else {
        this.commit('system/iterateProposal', {
          proposalID: payload.proposalID,
          name: payload.proposalName
        })
      }
      this.commit('unsetProposal')
      this.commit('setProposal', payload.proposalID || state.system.lastProposalID)
    },
    unsetCollective (state) {
      state.currentCollectiveID = null
      state.currentCouncilID = null
      state.currentProposalID = null
    },
    setCollective(state, id) {
      state.currentCollectiveID = id
    },
    unsetCouncil (state) {
      state.currentCouncilID = null
      state.currentProposalID = null
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
  actions: {},
  plugins: [vuexLocalStorage.plugin]
})
