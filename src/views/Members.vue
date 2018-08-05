<template>
<div class="members">
  <div v-if="selectedMember">
    <h1>
      {{ selectedMember.name }}
    </h1>
    <button @click="viewMember(null)">Back to List</button>
  </div>
  <div v-else>
    <h2 v-if="collectiveMembers.length">Member List</h2>
    <ul>
      <li v-for="cMember in collectiveMembers" :key="cMember.id">
        <button @click="viewMember(cMember)">Person: {{ getPerson(cMember.personID).name }}</button>
      </li>
    </ul>
  </div>
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
  name: 'member',
  components: {},
  props: ['initialMember'],
  data() {
    return {
      selectedMember: this.initialMember
    }
  },
  methods: {
    viewMember(member) {
      this.selectedMember = member
    }
  },
  computed: {
    ...mapGetters(['collectiveMembers', 'getPerson'])
  }
}
</script>
