<template>
  <nav class="sticky top-bar">
    <ul class="menu horizontal black">
      <li>
        <router-link :to="{ name: 'collective', params: {} }">
          <span v-if="currentCollective">Collective: {{ currentCollective.name }}</span>
          <span v-else>Set/Create Collective</span>
        </router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'privilege-set', params: {} }">Privilege Sets</router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'member', params: {} }">
          Members ({{ collectiveMembers.length }})
        </router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'council', params: {} }">
          <span v-if="currentCouncil">Council: {{ currentCouncil.name }}</span>
          <span v-else>Set/Create Council</span>
        </router-link>
      </li>
      <li v-if="currentCouncil">
        <router-link :to="{ name: 'proposal', params: { } }">
          <span v-if="currentProposal">Proposal: {{ currentProposal.name }}</span>
          <span v-else>New Proposal</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
</style>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(['currentCollective', 'currentCouncil', 'currentProposal', 'collectiveMembers']),
  }
}
</script>
