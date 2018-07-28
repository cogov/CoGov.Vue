<template>
<div class="council">
  <div v-if="currentCouncil">
    <h1>
      {{ currentCouncil.name }}
    </h1>
    <button @click="unsetCouncil">Unset</button>
    <hr>
    <Proposals />
  </div>
  <div v-else>
    <h2 v-if="collectiveCouncils.length">Set Council</h2>
    <ul>
      <li v-for="council in collectiveCouncils" :key="council.id">
        <button @click="setCouncil(council.id)">{{ council.name }}</button>
      </li>
    </ul>
  </div>
  <hr>

  <h2>
    <span v-if="currentCouncil">Edit</span>
    <span v-else>New</span>
    Council
    <button v-if="showForm" @click="showForm=false">-</button>
    <button v-else @click="showForm=true">+</button>
  </h2>

  <form v-show="showForm" class="ink-form" @submit.prevent="onSubmit">
    <div class="ink-grid">
      <div class="control-group column-group gutters">
        <label for="collective-name" class="all-20">Name</label>
        <div class="control all-60">
          <input type="text" v-model="councilName">
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

import Proposals from '@/components/Proposals.vue'

export default {
  name: 'council',
  components: { Proposals },
  data() {
    return {
      councilID: null,
      councilName: "",
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['setCouncil', 'unsetCouncil', 'submitCouncil']),
    onSubmit() {
      this.submitCouncil({
        collectiveID: this.currentCollectiveID,
        councilID: this.councilID,
        councilName: this.councilName
      })
      this.showForm = false
    },
    updateParams() {
      if (this.currentCouncil) {
        this.councilID = this.currentCouncil.id
        this.councilName = this.currentCouncil.name
      } else {
        this.councilID = null
        this.councilName = ""
      }
    }
  },
  computed: {
    ...mapState(['currentCouncilID', 'currentCollectiveID']),
    ...mapGetters(['currentCouncil', 'collectiveCouncils'])
  },
  watch: {
    'currentCouncil': function() { this.updateParams() }
  },
  created: function() { this.updateParams() }
}
</script>
