<template>
  <div class="collectives">
    <h2 v-if="currentCollective">Currently Selected: {{ currentCollective.name }}</h2>
    <h2 v-else>No Collective Selected</h2>
    <div class="grid-x">
      <div class="callout cell medium-6">
        You are a part of these collectives:
        <ul>
          <li v-for="col in usersCollectives">
            {{ col.name }}
            <span v-if="col.id === currentCollectiveID">(Selected)</span>
            <a v-else @click="switchToCollective(col.id)">(Enter)</a>
          </li>
        </ul>
      </div>
      <div class="callout cell medium-6">
        Join or Create Other Collectives
        <ul>
          <li v-for="col in otherCollectives">
            {{ col.name }}
            <button class="button" @click="joinCollective(col.id)">Join</button>
          </li>
        </ul>
        <button class="button" @click="createCollective">Create Collective</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'collective',
  data() {
    return {
      collective: this.currentCollective
    }
  },
  methods: {
    ...mapActions(['joinCollective', 'switchToCollective']),
    createCollective() {
      this.$router.push('create-collective')
    }
  },
  computed: {
    ...mapGetters(['currentCollective', 'usersCollectives', 'otherCollectives']),
    ...mapState(['currentCollectiveID'])
  }
}
</script>
