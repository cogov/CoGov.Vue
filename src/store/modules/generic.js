import core from './core'
import router from '@/router'

// This is the system interface level. Includes action groupings and such
export default {
  namespaced: true,
  modules: {
    core
  },
  state: {
    higherActionTypes: {
      initiateCollective: {
        name: "string",
        description: "string",
        details: "string"
      }
    },
  },
  actions: {
    initiateCollective({ commit, dispatch, state }, params) {
      return new Promise((resolve, reject) => {

        let newCollectiveID = ++state.core.lastCollectiveID
        commit('core/createCollective', {
          id: newCollectiveID
        })
        commit('core/setCollectiveName', {
          collectiveID: newCollectiveID,
          name: params.name
        })
        commit('core/setCollectiveDescription', {
          collectiveID: newCollectiveID,
          description: params.description
        })
        commit('core/setCollectiveDetails', {
          collectiveID: newCollectiveID,
          details: params.details
        })

        let newCouncilID = ++state.core.lastCouncilID
        commit('core/createCouncil', {
          id: newCouncilID,
          collectiveID: newCollectiveID,
          collectiveCouncil: true,
          name: "Collective Council"
        })
        setTimeout(() => resolve(newCollectiveID), 1000)
      })

    }
  }
}
