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
      <li v-for="cMember in collectiveMembers" :key="cMember.id">
        <button @click="viewMember(cMember)">{{ cMember.name }}</button>
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
          <input type="text" v-model="member.name">
        </div>
      </div>
      Privilege Sets
      <button @click.prevent="addPSet">Add PSet</button>
      <div class="control-group column-group gutters" v-for="pset in member.psets">
        <label for="privilege-set" class="all-20">PSet {{ pset }}</label>
        <select class="all-60" name="privilege-set" v-model="pset.id" required>
            <option v-for="privilegeSet in privilegeSets" :value="privilegeSet.id">
                {{ privilegeSet.name }}
            </option>
        </select>
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
  name: 'member',
  components: {},
  props: ['initialMember'],
  data() {
    return {
      member: {
        name: "",
        id: null,
        psets: [{id: null}]
      },
      selectedMember: this.initialMember,
      showForm: false
    }
  },
  methods: {
    ...mapMutations(['submitMember']),
    onSubmit() {
      this.submitMember(this.member)
      this.viewMember(this.member)
      this.showForm = false
    },
    addPSet() {
      this.member.psets.push({id: null})
    },
    viewMember(member) {
      //this.selectedMember = member
    }
  },
  computed: {
    ...mapGetters(['collectiveMembers']),
    ...mapState({
      privilegeSets: state => state.system.privilegeSets
    })
  }
}
</script>
