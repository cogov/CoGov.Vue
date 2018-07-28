<template>
<div class="proposal">
  <div v-if="currentProposal">
    <h1>{{ currentProposal.name }}</h1>
    <div class="revisions">
        <h1>Proposal Revisions</h1>
        <table class="ink-table alternating hover bordered">
            <thead>
                <tr>
                    <th>Show Actions</th>
                    <th>Date</th>
                    <th>Name</th>
                </tr>
            </thead>
            <RevisionRow v-for="(revision, index) in currentProposal.revisions" :revision="revision" :key="index" />
        </table>
    </div>
    <button @click="unsetProposal">Unset Proposal</button>
    <hr>
  </div>

  <h2>
    <span v-if="currentProposal">Edit</span>
    <span v-else>New</span>
    Proposal
    <button v-if="showForm" @click="showForm=false">-</button>
    <button v-else @click="showForm=true">+</button>
  </h2>

  <form v-show="showForm" class="ink-form" @submit.prevent="onSubmit">
    <div class="ink-grid">
      <div class="control-group column-group gutters">
        <label for="proposal-name" class="all-20">Name</label>
        <div class="control all-60">
          <input type="text" v-model="proposalName">
        </div>
      </div>
    </div>
    <input type="submit" value="submit">
  </form>
</div>
</template>

<script>
import {
  mapMutations,
  mapGetters,
  mapState
}
from 'vuex'
import RevisionRow from '@/components/RevisionRow.vue'

export default {
  name: 'proposal',
  components: { RevisionRow },
  data() {
    return {
      proposalID: null,
      proposalName: "",
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['setProposal', 'unsetProposal', 'submitProposal']),
    onSubmit() {
      this.submitProposal({
        collectiveID: this.currentCollectiveID,
        councilID: this.currentCouncilID,
        proposalID: this.proposalID,
        proposalName: this.proposalName
      })
    },
    updateParams() {
      if (this.currentProposal) {
        this.proposalID = this.currentProposal.id
        this.proposalName = this.currentProposal.name
      } else {
        this.proposalID = null
        this.proposalName = ""
      }
    }
  },
  computed: {
    ...mapState(['currentProposalID', 'currentCouncilID', 'currentCollectiveID']),
    ...mapGetters(['currentProposal', 'councilProposals'])
  },
  watch: {
    'currentProposal': function() { this.updateParams() }
  },
  created: function() { this.updateParams() }
}
</script>
