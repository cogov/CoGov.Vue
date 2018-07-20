<template>
  <nav class="ink-navigation nav-bar">
    <ul class="menu horizontal black">
      <li><router-link :to="{ name: 'proposal', params: { } }">New Proposal</router-link></li>
      <li><router-link :to="{ name: 'proposals', params: {} }">Proposals</router-link></li>
      <li>
        <router-link :to="{ name: 'collective', params: {} }">
          <span v-if="currentCollective">Collective: {{ currentCollective.name }}</span>
          <span v-else>Set/Create Collective</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'user', params: {} }">
          <span v-if="currentUser">User: {{ currentUser.name }}</span>
          <span v-else>Register/Sign In</span>
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
    ...mapGetters(['currentCollective', 'currentUser']),
  }
}
</script>
