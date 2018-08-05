<template>
  <div class="collective">
    <h2>{{ currentCollective.name }}</h2>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'collective',
  data() {
    return {
      collective: this.currentCollective
    }
  },
  computed: mapGetters(['currentCollective'])
}
</script>
