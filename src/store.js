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
    proposals: {}, //mapped by id
    users: {}, //mapped by id
    currentUserId: null,
    collectives: {}, //mapped by id
    currentCollectiveId: null,
    currentProposalId: null,
    userIdCounter: 1,
    collectiveIdCounter: 1,
    actionIdCounter: 1,
    proposalIdCounter: 1,
    actionGroup: [],
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
    },
    currentProposal: state => {
      return state.proposals[state.currentProposalId]
    },
    userById: (state) => (id) => {
      return state.users[id]
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
    registerUser (state, name) {
      let newUser = {
        id: state.userIdCounter++,
        name: name
      }
      state.users[newUser.id] = newUser
      state.currentUserId = newUser.id
    },
    createCollective (state, payload) {
      let newCollective = {
        id: state.collectiveIdCounter++,
        name: payload.collectiveName,
        creatorId: payload.creatorId
      }
      state.collectives[newCollective.id] = newCollective
      state.currentCollectiveId = newCollective.id
    },
    unsetCollective (state) {
      state.currentCollectiveId = null
    },
    signOutUser (state) {
      state.currentUserId = null
    },
    signInUser (state, id) {
      state.currentUserId = id
    },
    setCollective(state, id) {
      state.currentCollectiveId = id
    },
    addGroupAction (state) {
      state.actionGroup.push({ paramsInput: {}, selectedType: null })
    },
    clearActions (state) {
      state.newActionGroup = []
    },
    submitProposal(state, proposal) {
      if (!proposal.id) {
        proposal.id = state.proposalIdCounter++
      }
      proposal.date = new Date()
      let revision = {
        actionGroup: JSON.parse(JSON.stringify(proposal.actionGroup)),
        name: proposal.name,
        date: proposal.date
      }
      proposal.revisions.push(revision)
      state.proposals[proposal.id] = proposal
    },
    selectProposal(state, proposalId) {
      state.currentProposalId = proposalId
    }
  },
  actions: {
  },
  plugins: [vuexLocalStorage.plugin]
})
