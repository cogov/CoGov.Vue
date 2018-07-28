export default {
  namespaced: true,
  state: {
    collectives: [], // {id, name, description, details}
    councils: [], // {id, CollectiveID, parentCouncilID, name}
    members: [], // {CollectiveID, name}
    privilegeSets: [], // {id, CollectiveID, name, privileges}
    memberPrivileges: [], // {CollectiveID, memberID, psetID}
    councilPrivileges: [], // {CollectiveID, councilID, psetID}
    proposals: [], // {id, collectiveID, councilID, name, actions, revisions},
    systemLedger: {}, // {id: [actions]}
    lastMemberID: 0,
    lastCollectiveID: 0,
    lastCouncilID: 0,
    lastPSetID: 0,
    lastProposalID: 0,
    actionTypes: {
      createCollective: { // Questionable if this needs to be represented in the system, it is the basis for all
        name: "string",
        details: "string",
        description: "string"
      },
      createCouncil: {
        collectiveID: "collectiveID",
        parentCouncilID: "councilID",
        name: "string"
      },
      createMember: {
        collectiveID: "collectiveID",
        name: "string"
      },
      createPrivilegeGroup: {
        collectiveID: "collectiveID",
        name: "string",
        privileges: "[]privilege" // Privilege: "string" for now
      },

      assignMemberPrivileges: {
        collectiveID: "collectiveID", //Irrelevant?
        memberID: "memberID",
        privilegeGroupID: "privilegeGroupID"
      },
      assignCouncilPrivileges: {
        collectiveID: "collectiveID", //Irrelevant?
        councilID: "councilID",
        privilegeGroupID: "privilegeGroupID"
      },

      createProposal: {
        collectiveID: "collectiveID", //Irrelevant
        councilID: "councilID",
        name: "string",
        actions: "[]action"
      },
      iterateProposal: {
        proposalID: "proposalID",
        name: "string",
        actions: "[]action"
      },

      updateCollective: {
        collectiveID: "collectiveID",
        description: "string",
        details: "string",
        name: "string"
      },
      updateCouncil: {
        councilID: "councilID",
        name: "string"
      }
    },
  },
  getters: {},
  actions: {},
  mutations: {
    createCollective(state, params) {
      let newCollective = {
        id: ++state.lastCollectiveID,
        name: params.name,
        details: params.details,
        description: params.description
      }
      state.collectives.push(newCollective)
      this.commit('system/createCouncil', {
        collectiveID: newCollective.id,
        name: "Collective Council",
        parentCouncilID: null
      })
    },
    createCouncil(state, params) {
      let newCouncil = {
        id: ++state.lastCouncilID,
        collectiveID: params.collectiveID,
        parentCouncilID: params.parentCouncilID,
        name: params.name
      }
      state.councils.push(newCouncil)
    },
    createMember(state, params) {
      let newMember = {
        id: ++state.lastMemberID,
        collectiveID: params.collectiveID,
        name: params.name
      }
      state.collectiveMembers.push(newMember)
    },
    createPrivilegeGroup(state, params) {
      let newPrivilegeSet = {
        id: ++state.lastPSetID,
        collectiveID: params.collectiveID,
        name: params.name,
        privileges: params.privileges
      }
      state.privilegeSets.push(newPrivilegeGroup)
    },

    assignMemberPrivileges(state, params) {
      let newMemberPrivileges = {
        collectiveID: params.collectiveID,
        memberID: params.memberID,
        psetID: params.psetID
      }
      state.memberPrivileges.push(newMemberPrivileges)
    },
    assignCouncilPrivileges(state, params) {
      let newCouncilPrivileges = {
        collectiveID: params.collectiveID,
        councilID: params.councilID,
        psetID: params.psetID
      }
      state.councilPrivileges.push(newCouncilPrivileges)
    },

    createProposal(state, params) {
      let newProposal = {
        id: ++state.lastProposalID,
        collectiveID: params.collectiveID,
        councilID: params.councilID,
        name: params.name,
        actions: params.actions,
        revisions: [],
        date: new Date()
      }
      state.proposals.push(newProposal)
    },
    iterateProposal(state, params) {
      let proposal = state.proposals.find(p => p.id === params.proposalID)
      let thisRevision = {
        name: proposal.name,
        date: proposal.date
      }
      proposal.revisions.push(thisRevision)
      proposal.date = new Date()
      proposal.name = params.name
      proposal.actions = params.actions
    },

    updateCollective(state, params) {
      let collective = state.collectives.find(c => c.id === params.collectiveID)
      if (params.description) {
        collective.description = params.description
      }
      if (params.details) {
        collective.details = params.details
      }
      if (params.name) {
        collective.name = params.name
      }
    },
    updateCouncil(state, params) {
      let council = state.councils.find(c => c.id === params.councilID)
      if (params.name) {
        council.name = params.name
      }
    }
  }
}
