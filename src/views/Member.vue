<template>
<div class="member">
  <div v-if="selectedMember">
    <h1>
      {{ selectedMember.name }}
    </h1>
    <button @click="viewMember(null)">Back to List</button>
  </div>
  <div v-else>
    <h2 v-if="collectiveMembers.length">Member List</h2>
    <ul>
      <li v-for="member in collectiveMembers" :key="member.id">
        <button @click="viewMember(member)">{{ member.name }}</button>
      </li>
    </ul>
  </div>

  <h2>
    <span v-if="selectedMember">Edit</span>
    <span v-else>New</span>
    Member
    <button v-if="showForm" @click="showForm=false">-</button>
    <button v-else @click="showForm=true">+</button>
  </h2>

  <form v-show="showForm" class="ink-form" @submit.prevent="onSubmit">
    <div class="ink-grid">
      <div class="control-group column-group gutters">
        <label for="member-name" class="all-20">Name</label>
        <div class="control all-60">
          <input type="text" v-model="memberName">
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
  mapGetters
}
from 'vuex'

export default {
  name: 'member',
  components: {},
  props: ['initialMember'],
  data() {
    return {
      memberName: "",
      memberID: null,
      selectedMember: this.initialMember,
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['submitMember']),
    onSubmit() {
      this.submitMember({
        memberName: this.memberName,
        memberID: this.memberID
      })
      this.memberName = ""
      this.showForm = false
    },
    viewMember(member) {
      this.selectedMember = member
      if (member) {
        this.memberName = member.name
        this.memberID = member.id
      } else {
        this.memberName = ""
        this.memberID = null
      }
    }
  },
  computed: {
    ...mapGetters(['collectiveMembers'])
  }
}
</script>
