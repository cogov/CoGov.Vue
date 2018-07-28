<template>
  <tbody>
      <tr>
          <td>
            {{ proposal.id }} <button @click="editProposal(proposal)">Edit</button>
            <button v-if="showActions" @click="showActions=false">Actions -</button>
            <button v-if="!showActions" @click="showActions=true">Actions +</button>
          </td>
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
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  props: ['proposal'],
  methods: {
    editProposal(proposal) {
      this.setProposal(proposal.id)
      this.$router.push({ name: 'proposal', params: {} } )
    },
    ...mapMutations(['setProposal'])
  },
  data() {
    return { showActions: false }
  },
}
</script>
