import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    ledger: {}, //mapped by id
    users: {}, //mapped by id
    currentUserId: null,
    collectives: {}, //mapped by id
    currentCollectiveId: null,
    userIdCounter: 1,
    collectiveIdCounter: 1,
    actionIdCounter: 1,
    actionTypes: {
      addMember: {
        name: "string"
      },
      addUserToGroup: {
        name: "string",
        groupId: "number"
      },
      createCollective: {
        name: "string"
      },
      createCurrency: {
        name: "string",
        type: "string",
        amount: "number"
      },
      createLedger: {},
      createUserGroup: {},
      general: {},
      setCollectiveDescription: {
        description: "string"
      },
      setCollectiveDetails: {},
      setCollectiveName: {},
      setCurrencyFixedQuantity: {},
      setLedgerAccess: {},
      setMinimumToCloseOfActionType: {},
      setMinimumToCloseOfAction: {},
      setPrivelege: {},
      setVetoThresholdOfActionType: {},
      setVetoThresholdOfAction: {},
      setYeaThresholdOfActionType: {},
      setYeaThresholdOfAction: {},
      transferCurrency: {}
    },
    actions: [] // { actionType: string, actionId: number, params: Object }
  },
  getters: {
    currentUser: state => {
      return state.users[state.currentUserId]
    },
    currentCollective: state => {
      return state.collectives[state.currentCollectiveId]
    }
  },
  mutations: {
    addAction (state, payload) {
      let actionItem = {
        actionType: payload.actionType,
        actionParams: payload.actionParams,
        id: state.actionIdCounter++
      }
      state.ledger[actionItem.id] = actionItem
    },
    createCollective (state, payload) {
      let newUser = {
        id: state.userIdCounter++,
        name: payload.adminName
      }
      let newCollective = {
        id: state.collectiveIdCounter++,
        name: payload.collectiveName,
        adminId: newUser.id
      }
      state.users[newUser.id] = newUser
      state.collectives[newCollective.id] = newCollective
      state.currentCollectiveId = newCollective.id
      state.currentUserId = newUser.id
    },
    unsetCollective (state) {
      state.currentCollectiveId = null
    },
    signOutUser (state) {
      state.currentUserId = null
    },
    signInUser (state, id) {
      state.currentUserId = id
    }
  },
  actions: {
  },
  plugins: [vuexLocalStorage.plugin]
})
