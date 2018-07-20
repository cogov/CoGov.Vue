

<template>
<div class="create-collective">
  <h2 v-if="Object.keys(collectives).length">Set Collective</h2>
  <ul>
    <li v-for="(collective, id) in collectives" :key="id">
      <button @click="setCollective(id)">{{ collective.name }}</button>
    </li>
  </ul>

  <p v-if="errors.length">
   <b>Please correct the following error(s):</b>
   <ul>
     <li v-for="error in errors">{{ error }}</li>
   </ul>
  </p>

  <h2>New Collective</h2>
  <form class="ink-form" @submit.prevent="onSubmit">
    <div class="ink-grid">
      <div class="control-group column-group gutters">
        <label for="collective-name" class="all-20">Name</label>
        <div class="control all-60">
          <input type="text" v-model="collectiveName">
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
  mapState
}
from 'vuex'

export default {
  name: 'create-collective',
  components: {},
  data() {
    return {
      collectiveName: "",
      errors: []
    }
  },
  methods: {
    ...mapMutations(['createCollective', 'setCollective']),
    onSubmit() {
      this.errors = []
      if (!this.currentUserId) {
        this.errors.push("Must be logged in")
        return false
      }
      this.createCollective({
        collectiveName: this.collectiveName,
        creatorId: this.currentUserId
      })
      this.collectiveName = ""
    }
  },
  computed: mapState(['collectives', 'currentUserId'])
}
</script>
