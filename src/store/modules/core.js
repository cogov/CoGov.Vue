export default {
  namespaced: true,
  state: {
    people: [],
    collectives: [], // {id, name, description, details}
    councils: [], // {id, CollectiveID, collectiveCouncil, name}
    members: [], // {CollectiveID, PersonID}
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
    lastPersonID: 0,
    actionTypes: {
      registerPerson: {
        name: "string"
      },

      createCollective: { // Questionable if this needs to be represented in the system, it is the basis for all
        name: "string",
        details: "string",
        description: "string"
      },
      createCouncil: {
        collectiveID: "collectiveID",
        collectiveCouncil: "boolean",
        name: "string"
      },
      joinCollective: {
        collectiveID: "collectiveID",
        personID: "personID"
      },
      createPrivilegeSet: {
        collectiveID: "collectiveID",
        name: "string",
        privileges: "[]privilege" // Privilege: { actionType: "string" } for now
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

      setCollectiveName: {
        collectiveID: "collectiveID",
        name: "string"
      },
      setCollectiveDescription: {
        collectiveID: "collectiveID",
        description: "string"
      },
      setCollectiveDetails: {
        collectiveID: "collectiveID",
        details: "string"
      },
      setCouncilName: {
        councilID: "councilID",
        name: "string"
      },
      setMemberName: {
        memberID: "memberID",
        name: "string"
      }
    },
  },
  getters: {},
  actions: {
  },
  mutations: {
    registerPerson(state, params) {
      let newPerson = {
        id: ++state.lastPersonID,
        name: params.name
      }
      state.people.push(newPerson)
    },

    createCollective(state, params) {
      let newID = params.id || ++state.lastCollectiveID
      state.collectives.push({id: newID})
    },
    createCouncil(state, params) {
      let newID = params.id || ++state.lastCouncilID
      let newCouncil = {
        id: newID,
        collectiveID: params.collectiveID,
        collectiveCouncil: params.collectiveCouncil,
        name: params.name
      }
      state.councils.push(newCouncil)
    },

    addMember(state, params) {
      let newID = params.id || ++state.lastMemberID
      let newMember = {
        id: newID,
        collectiveID: params.collectiveID,
        personID: params.personID
      }
      state.members.push(newMember)
    },
    createPrivilegeSet(state, params) {
      let newPrivilegeSet = {
        id: ++state.lastPSetID,
        collectiveID: params.collectiveID,
        name: params.name,
        privileges: params.privileges
      }
      state.privilegeSets.push(newPrivilegeSet)
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

    setCollectiveDescription(state, params) {
      let collective = state.collectives.find(c => c.id === params.collectiveID)
      collective.description = params.description
    },
    setCollectiveDetails(state, params) {
      let collective = state.collectives.find(c => c.id === params.collectiveID)
      collective.details = params.details
    },
    setCollectiveName(state, params) {
      let collective = state.collectives.find(c => c.id === params.collectiveID)
      collective.name = params.name
    },

    updateCouncil(state, params) {
      let council = state.councils.find(c => c.id === params.councilID)
      if (params.name) {
        council.name = params.name
      }
    },
    updateMember(state, params) {
      let member = state.member.find(m => m.id === params.memberID)
      if (params.name) {
        member.name = params.name
      }
    }
  }
}
