<template>
  <nav class="top-bar">
    <ul class="top-bar-left menu">
      <li>
        <router-link :to="{ name: 'collectives', params: {} }">
          <span v-if="currentCollective">Collective: {{ currentCollective.name }}</span>
          <span v-else>Collectives</span>
        </router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'privilege-set', params: {} }">Privilege Sets</router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'members', params: {} }">
          Members ({{ collectiveMembers.length }})
        </router-link>
      </li>
      <li v-if="currentCollective">
        <router-link :to="{ name: 'council', params: {} }">
          <span v-if="currentCouncil">Council: {{ currentCouncil.name }}</span>
          <span v-else>Set/Create Council</span>
        </router-link>
      </li>
    </ul>
    <ul class="top-bar-right menu">
      <li>
        <router-link :to="{ name: 'person', params: {} }">
          <span v-if="currentPerson">Person: {{ currentPerson.name }}</span>
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
    ...mapGetters(['currentCollective', 'currentCouncil', 'currentPerson', 'collectiveMembers']),
  }
}
</script>
