

<template>
<div class="collective">
  <div v-if="currentCollective">
    <h1>
      {{ currentCollective.name }}
    </h1>
    <p>Description: {{ currentCollective.description }}</p>
    <p>Details: {{ currentCollective.details }}</p>
    <button @click="unsetCollective">Unset Collective</button>
    <hr>
  </div>
  <div v-else>
    <h2 v-if="collectives.length">Set Collective</h2>
    <ul>
      <li v-for="collective in collectives" :key="collective.id">
        <button @click="setCollective(collective.id)">{{ collective.name }}</button>
      </li>
    </ul>
  </div>

  <h2>
    <span v-if="currentCollective">Edit</span>
    <span v-else>New</span>
    Collective
    <button v-if="showForm" @click="showForm=false">-</button>
    <button v-else @click="showForm=true">+</button>
  </h2>

  <form v-show="showForm" class="ink-form" @submit.prevent="onSubmit">
    <div class="ink-grid">
      <div class="control-group column-group gutters">
        <label for="collective-name" class="all-20">Name</label>
        <div class="control all-60">
          <input type="text" v-model="collectiveName">
        </div>
      </div>
      <div class="control-group column-group gutters">
        <label for="collective-name" class="all-20">Description</label>
        <div class="control all-60">
          <input type="text" v-model="collectiveDescription">
        </div>
      </div>
      <div class="control-group column-group gutters">
        <label for="collective-name" class="all-20">Details</label>
        <div class="control all-60">
          <input type="text" v-model="collectiveDetails">
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

export default {
  name: 'collective',
  components: {},
  data() {
    return {
      collectiveID: null,
      collectiveName: "",
      collectiveDescription: "",
      collectiveDetails: "",
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['setCollective', 'unsetCollective', 'submitCollective']),
    onSubmit() {
      this.submitCollective({
        collectiveID: this.collectiveID,
        collectiveName: this.collectiveName,
        collectiveDescription: this.collectiveDescription,
        collectiveDetails: this.collectiveDetails
      })
      this.showForm = false
      this.updateParams()
    },
    updateParams() {
      if (this.currentCollective) {
        this.collectiveID = this.currentCollective.id
        this.collectiveName = this.currentCollective.name
        this.collectiveDescription = this.currentCollective.description
        this.collectiveDetails = this.currentCollective.details
      } else {
        this.collectiveID = null
        this.collectiveName = ""
        this.collectiveDescription = ""
        this.collectiveDetails = ""
      }
    }
  },
  computed: {
    ...mapState({
      collectives: state => state.system.collectives
    }),
    ...mapGetters(['currentCollective'])
  },
  watch: {
    'currentCollective': function() { this.updateParams() }
  },
  created: function() { this.updateParams() }
}
</script>
