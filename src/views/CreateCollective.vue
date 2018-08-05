

<template>
<div class="create-collective">
  <h2>Create a CoGoverning Collective</h2>
  <form class="callout" @submit.prevent="onSubmit">
    <div class="">
      <label>Collective Name
        <input type="text" v-model="collective.name"></input>
      </label>
      <fieldset>
        <legend>Privacy</legend>
        <label>
          <input type="radio" name="privacy" value="private" id="private"></input>Private
        </label>
        <label>
          <input type="radio" name="privacy" value="public" id="public"></input>Public Join
        </label>
      </fieldset>
      <label>Description
        <input type="text" v-model="collective.description"></input>
      </label>
      <label>Details
        <input type="text" v-model="collective.details"></input>
      </label>
    </div>
    <input type="submit" class="button" value="Submit">
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
  name: 'create-collective',
  components: {  },
  data() {
    return {
      collective: {
        name: "",
        public: false,
        description: "",
        details: ""
      }
    }
  },
  methods: {
    ...mapMutations(['setCollective']),
    onSubmit() {
      this.$store.dispatch('generic/initiateCollective', this.collective).then((newCollectiveID) => {
        this.$store.dispatch('switchToCollective', newCollectiveID)
      })
    }
  }
}
</script>
