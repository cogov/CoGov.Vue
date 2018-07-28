<template>
<div class="council">
  <h3>
    {{ councilNameTree(currentCouncil) }}
  </h3>
  <button v-if="currentCouncil.parentCouncilID" @click="setCouncil(currentCouncil.parentCouncilID)">Shift Up</button>
  <hr>
  <Proposals />
  <h2 v-if="currentSubCouncils.length">Sub-Councils</h2>
  <ul>
    <li v-for="council in currentSubCouncils" :key="council.id">
      <button @click="setCouncil(council.id)">{{ council.name }}</button>
    </li>
  </ul>
  <hr>

  <h2>
    New Sub-Council
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
      councilName: "",
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['setCouncil', 'shiftToParentCouncil', 'submitCouncil']),
    onSubmit() {
      this.submitCouncil({
        collectiveID: this.currentCollectiveID,
        parentCouncilID: this.currentCouncilID,
        councilName: this.councilName
      })
      this.councilName = ""
      this.showForm = false
    },
    debug() {
      console.log(this.currentCouncil)
    }
  },
  computed: {
    ...mapState(['currentCouncilID', 'currentCollectiveID']),
    ...mapGetters(['currentCouncil', 'currentSubCouncils', 'councilNameTree'])
  }
}
</script>
