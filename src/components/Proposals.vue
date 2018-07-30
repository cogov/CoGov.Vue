<style scoped>
</style>

<template>

<div class="proposals">
  <button v-if="showAll" @click="showAll=false">Show Only Council</button>
  <button v-else @click="showAll=true">Show All</button>
    <table class="ink-table alternating hover bordered">
        <thead>
            <tr>
                <th>Proposal</th>
                <th>Council</th>
                <th>Name</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody v-for="(proposal, index) in proposals" :key="index">
            <tr>
                <td>
                  {{ proposal.id }} <button @click="editProposal(proposal)">Edit</button>
                  <button v-if="showActions" @click="showActions=false">Actions -</button>
                  <button v-if="!showActions" @click="showActions=true">Actions +</button>
                </td>
                <td>{{ councilById(proposal.councilID).name }}</td>
                <td>{{ proposal.name }}</td>
                <td>{{ proposal.date }}</td>
            </tr>
            <tr v-show="showActions" v-for="action in proposal.actionGroup" :key="action.id">
              <td>{{ action.id || "=>" }}</td>
              <td>{{ action.selectedType }}</td>
              <td>{{ action.paramsInput }}</td>
              <td></td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Proposals',
    props: ['council'],
    data() {
      return {
        showActions: true,
        showAll: false
      }
    },
    methods: {
      editProposal(proposal) {
        this.setProposal(proposal.id)
        this.$router.push({ name: 'proposal', params: {} } )
      },
      ...mapMutations(['setProposal'])
    },
    computed: {
      ...mapGetters(['councilProposals', 'collectiveProposals', 'councilById']),
      proposals() { return this.showAll ? this.collectiveProposals : this.councilProposals }
    }
}

</script>
